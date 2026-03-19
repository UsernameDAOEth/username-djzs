import { useState, useEffect, useRef, useCallback } from 'react';

export interface XmtpMessage {
  id: string;
  content: string;
  senderInboxId: string;
  isSelf: boolean;
  timestamp: number;
}

type XmtpState = 'disconnected' | 'connecting' | 'ready' | 'error';

const DJZS_ADDRESS = '0x3e79e0374383ea64bc16c9b0568c6b13ef084afb';

function cleanupResources(streamCloserRef: React.MutableRefObject<any>, clientRef: React.MutableRefObject<any>) {
  try { streamCloserRef.current?.return?.(); } catch {}
  try { streamCloserRef.current?.end?.(); } catch {}
  try { clientRef.current?.close?.(); } catch {}
  streamCloserRef.current = null;
  clientRef.current = null;
}

export function useXmtp(walletAddress: string | null) {
  const [state, setState] = useState<XmtpState>('disconnected');
  const [error, setError] = useState<string | null>(null);
  const [messages, setMessages] = useState<XmtpMessage[]>([]);
  const clientRef = useRef<any>(null);
  const conversationRef = useRef<any>(null);
  const streamCloserRef = useRef<any>(null);
  const pendingSendsRef = useRef<Set<string>>(new Set());

  const connect = useCallback(async () => {
    if (!walletAddress) {
      setError('No wallet connected');
      setState('error');
      return;
    }

    cleanupResources(streamCloserRef, clientRef);
    conversationRef.current = null;

    setState('connecting');
    setError(null);
    setMessages([]);

    try {
      const ethereum = (window as any).ethereum;
      if (!ethereum) throw new Error('No wallet provider found');

      const { Client: XmtpClient } = await import('@xmtp/browser-sdk');

      const signer = {
        type: 'EOA' as const,
        getIdentifier: () => ({
          identifier: walletAddress.toLowerCase(),
          identifierKind: 'Ethereum' as const,
        }),
        signMessage: async (message: string) => {
          const hexMsg = '0x' + Array.from(new TextEncoder().encode(message))
            .map((b: number) => b.toString(16).padStart(2, '0'))
            .join('');
          const signature: string = await ethereum.request({
            method: 'personal_sign',
            params: [hexMsg, walletAddress],
          });
          return hexToBytes(signature.slice(2));
        },
      };

      const client = await XmtpClient.create(signer, {
        env: 'production' as any,
        dbPath: `xmtp-${walletAddress.toLowerCase()}`,
      });

      clientRef.current = client;

      const dm = await client.conversations.newDmWithIdentifier({
        identifier: DJZS_ADDRESS,
        identifierKind: 'Ethereum' as const,
      });

      conversationRef.current = dm;

      try {
        await dm.sync();
        const existingMessages = await dm.messages();
        const mapped = existingMessages
          .filter((m: any) => m.content && typeof m.content === 'string')
          .map((m: any) => ({
            id: m.id || String(m.sentAtNs),
            content: m.content,
            senderInboxId: m.senderInboxId,
            isSelf: m.senderInboxId === client.inboxId,
            timestamp: Number(m.sentAtNs) / 1_000_000,
          }));
        setMessages(mapped);
      } catch {
      }

      setState('ready');

      startStream(dm, client.inboxId ?? '');

    } catch (err: any) {
      console.error('XMTP connection error:', err);
      setError(err.message || 'Failed to connect to XMTP');
      setState('error');
    }
  }, [walletAddress]);

  const startStream = useCallback(async (dm: any, selfInboxId: string) => {
    try {
      const stream = await dm.stream();
      streamCloserRef.current = stream;
      for await (const msg of stream) {
        if (msg?.content && typeof msg.content === 'string') {
          const msgId = msg.id || String(msg.sentAtNs);
          const contentKey = `${msg.content}`;
          const newMsg: XmtpMessage = {
            id: msgId,
            content: msg.content,
            senderInboxId: msg.senderInboxId,
            isSelf: msg.senderInboxId === selfInboxId,
            timestamp: Number(msg.sentAtNs) / 1_000_000,
          };
          setMessages(prev => {
            if (prev.some(m => m.id === msgId)) return prev;
            if (newMsg.isSelf && pendingSendsRef.current.has(contentKey)) {
              pendingSendsRef.current.delete(contentKey);
              const withoutOptimistic = prev.filter(m => !(m.id.startsWith('local-') && m.content === contentKey));
              return [...withoutOptimistic, newMsg];
            }
            return [...prev, newMsg];
          });
        }
      }
    } catch (err: any) {
      if (err.name !== 'AbortError') {
        console.error('XMTP stream error:', err);
      }
    }
  }, []);

  const sendMessage = useCallback(async (text: string): Promise<boolean> => {
    if (!conversationRef.current || !clientRef.current) return false;
    try {
      pendingSendsRef.current.add(text);
      const optimistic: XmtpMessage = {
        id: `local-${Date.now()}`,
        content: text,
        senderInboxId: clientRef.current.inboxId ?? '',
        isSelf: true,
        timestamp: Date.now(),
      };
      setMessages(prev => [...prev, optimistic]);
      await conversationRef.current.sendText(text);
      return true;
    } catch (err: any) {
      console.error('XMTP send error:', err);
      pendingSendsRef.current.delete(text);
      setMessages(prev => prev.filter(m => !(m.id.startsWith('local-') && m.content === text)));
      setError('Failed to send message');
      return false;
    }
  }, []);

  const disconnect = useCallback(() => {
    cleanupResources(streamCloserRef, clientRef);
    conversationRef.current = null;
    pendingSendsRef.current.clear();
    setMessages([]);
    setState('disconnected');
    setError(null);
  }, []);

  useEffect(() => {
    return () => {
      cleanupResources(streamCloserRef, clientRef);
    };
  }, []);

  return { state, error, messages, connect, sendMessage, disconnect };
}

function hexToBytes(hex: string): Uint8Array {
  const bytes = new Uint8Array(hex.length / 2);
  for (let i = 0; i < hex.length; i += 2) {
    bytes[i / 2] = parseInt(hex.substring(i, i + 2), 16);
  }
  return bytes;
}
