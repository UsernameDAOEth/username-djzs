import React, { useState } from 'react';

/**
 * FoundersFund Component
 * DJZS Protocol Landing Page - Top of Page
 * 
 * Payment Options:
 * - PayPal: paypal.me/DecentralizedDaemon
 * - Cash App: $DJZS
 * - ETH/Base: 0x3E79E0374383ea64bC16C9B0568C6B13eF084aFB
 */

const PAYMENT_OPTIONS = [
  {
    id: 'paypal',
    name: 'PayPal',
    handle: 'DecentralizedDaemon',
    url: 'https://paypal.me/DecentralizedDaemon',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M7.076 21.337H2.47a.641.641 0 0 1-.633-.74L4.944 3.72a.77.77 0 0 1 .757-.64h6.407c2.589 0 4.528.89 5.108 3.08.3 1.13.19 2.28-.33 3.43-.81 1.8-2.54 2.87-4.97 2.87h-2.1a.77.77 0 0 0-.76.65l-.9 5.71a.64.64 0 0 1-.63.52h-2.45zm12.24-13.79c-.06.18-.12.36-.19.54-.93 2.28-2.95 3.35-6.02 3.35h-1.63a.77.77 0 0 0-.76.65l-1.03 6.5a.64.64 0 0 1-.63.52H6.57l-.06.38a.64.64 0 0 0 .63.74h3.12a.77.77 0 0 0 .76-.65l.03-.16.61-3.86.04-.21a.77.77 0 0 1 .76-.65h.48c3.08 0 5.49-1.25 6.19-4.87.29-1.51.14-2.77-.69-3.66-.24-.26-.54-.48-.88-.66z"/>
      </svg>
    ),
    color: '#0070BA',
    bgHover: 'hover:bg-[#0070BA]/10',
  },
  {
    id: 'cashapp',
    name: 'Cash App',
    handle: '$DJZS',
    url: 'https://cash.app/$DJZS',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M23.59 3.47A5.1 5.1 0 0 0 20.54.42C19.07.02 18.09 0 12 0S4.93.02 3.46.42A5.1 5.1 0 0 0 .41 3.47C.01 4.94 0 5.92 0 12s.01 7.06.41 8.53a5.1 5.1 0 0 0 3.05 3.05c1.47.4 2.45.42 8.54.42s7.07-.02 8.54-.42a5.1 5.1 0 0 0 3.05-3.05c.4-1.47.41-2.45.41-8.53s-.01-7.06-.41-8.53zM17.42 16.5c-.28.8-.95 1.37-1.78 1.57-.83.2-2.22.2-3.64.2s-2.81 0-3.64-.2c-.83-.2-1.5-.77-1.78-1.57-.28-.8-.28-2.48-.28-4.5s0-3.7.28-4.5c.28-.8.95-1.37 1.78-1.57.83-.2 2.22-.2 3.64-.2s2.81 0 3.64.2c.83.2 1.5.77 1.78 1.57.28.8.28 2.48.28 4.5s0 3.7-.28 4.5zm-2.29-5.91l-1.68-.42c-.53-.13-.75-.35-.75-.72 0-.44.4-.76 1.01-.76.77 0 1.16.38 1.29.93l1.39-.52c-.29-.94-1.08-1.64-2.44-1.72V6.5h-1.23v.88c-1.31.13-2.24.88-2.24 2.05 0 1.09.75 1.78 1.94 2.08l1.59.4c.63.16.88.41.88.79 0 .5-.47.85-1.17.85-.87 0-1.34-.46-1.47-1.06l-1.44.51c.28 1.04 1.17 1.81 2.67 1.9v.9h1.23v-.88c1.41-.13 2.41-.96 2.41-2.2-.01-1.07-.67-1.82-1.99-2.13z"/>
      </svg>
    ),
    color: '#00D632',
    bgHover: 'hover:bg-[#00D632]/10',
  },
  {
    id: 'eth',
    name: 'ETH / Base',
    handle: 'username.dj-z-s.eth',
    address: '0x3E79E0374383ea64bC16C9B0568C6B13eF084aFB',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M11.944 17.97L4.58 13.62 11.943 24l7.37-10.38-7.372 4.35h.003zM12.056 0L4.69 12.223l7.365 4.354 7.365-4.35L12.056 0z"/>
      </svg>
    ),
    color: '#627EEA',
    bgHover: 'hover:bg-[#627EEA]/10',
  },
];

const FoundersFund: React.FC = () => {
  const [copiedAddress, setCopiedAddress] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const handleCopyAddress = async () => {
    const eth = PAYMENT_OPTIONS.find(p => p.id === 'eth');
    if (eth?.address) {
      await navigator.clipboard.writeText(eth.address);
      setCopiedAddress(true);
      setTimeout(() => setCopiedAddress(false), 2000);
    }
  };

  return (
    <section 
      id="founders-fund"
      className="relative w-full border-b border-gray-900 pt-14"
      style={{ background: 'linear-gradient(180deg, #0a0a0f 0%, #000000 100%)' }}
    >
      {/* Subtle animated gradient bar */}
      <div 
        className="absolute top-0 left-0 right-0 h-[2px]"
        style={{
          background: 'linear-gradient(90deg, transparent, #627EEA, #00D632, #0070BA, transparent)',
          opacity: 0.6,
        }}
      />

      <div className="max-w-6xl mx-auto px-4 py-4">
        
        {/* Collapsed View (Default) */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div 
                className="w-2 h-2 rounded-full animate-pulse"
                style={{ background: '#00D632' }}
              />
              <span 
                className="text-xs tracking-[0.2em] text-gray-500 uppercase"
                style={{ fontFamily: 'monospace' }}
              >
                FOUNDERS_FUND
              </span>
            </div>
            <span className="text-sm text-gray-400 hidden sm:inline">
              Support the DJZS Protocol
            </span>
          </div>

          <div className="flex items-center gap-3">
            {/* Quick action buttons - always visible */}
            <div className="hidden md:flex items-center gap-2">
              {PAYMENT_OPTIONS.map((option) => (
                option.url ? (
                  <a
                    key={option.id}
                    href={option.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`
                      flex items-center gap-2 px-3 py-1.5 rounded-sm
                      border border-gray-800 transition-all duration-200
                      ${option.bgHover} hover:border-gray-600
                    `}
                    style={{ fontFamily: 'monospace' }}
                  >
                    <span style={{ color: option.color }}>{option.icon}</span>
                    <span className="text-xs text-gray-400">{option.name}</span>
                  </a>
                ) : (
                  <button
                    key={option.id}
                    onClick={handleCopyAddress}
                    className={`
                      flex items-center gap-2 px-3 py-1.5 rounded-sm
                      border border-gray-800 transition-all duration-200
                      ${option.bgHover} hover:border-gray-600
                    `}
                    style={{ fontFamily: 'monospace' }}
                  >
                    <span style={{ color: option.color }}>{option.icon}</span>
                    <span className="text-xs text-gray-400">
                      {copiedAddress ? '✓ Copied' : option.name}
                    </span>
                  </button>
                )
              ))}
            </div>

            {/* Expand button for mobile + details */}
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="flex items-center gap-2 px-4 py-2 rounded-sm border border-green-400 bg-green-400/10 text-green-400 hover:bg-green-400/20 transition-all duration-300 animate-pulse hover:animate-none"
              style={{ fontFamily: 'monospace', boxShadow: '0 0 12px rgba(34,197,94,0.4), 0 0 24px rgba(34,197,94,0.15)' }}
            >
              <span className="text-xs font-bold tracking-wider">
                {isExpanded ? 'CLOSE' : 'FUND'}
              </span>
              <svg 
                className={`w-3 h-3 text-green-400 transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`}
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </div>
        </div>

        {/* Expanded View */}
        <div 
          className={`
            overflow-hidden transition-all duration-300 ease-in-out
            ${isExpanded ? 'max-h-96 opacity-100 mt-6' : 'max-h-0 opacity-0'}
          `}
        >
          <div className="border border-gray-800 rounded-sm p-6" style={{ background: 'rgba(255,255,255,0.01)' }}>
            
            {/* Header */}
            <div className="text-center mb-6">
              <h3 
                className="text-2xl font-light text-white mb-2"
                style={{ fontFamily: 'Georgia, serif' }}
              >
                Back the Tollbooth
              </h3>
              <p className="text-sm text-gray-500 max-w-md mx-auto">
                Fund adversarial verification infrastructure for the A2A economy. 
                Every contribution accelerates the protocol.
              </p>
            </div>

            {/* Payment Grid */}
            <div className="grid md:grid-cols-3 gap-4">
              {PAYMENT_OPTIONS.map((option) => (
                <div
                  key={option.id}
                  className="p-4 border border-gray-800 rounded-sm hover:border-gray-700 transition-colors"
                  style={{ background: 'rgba(0,0,0,0.3)' }}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div 
                      className="w-10 h-10 rounded-sm flex items-center justify-center"
                      style={{ background: `${option.color}15`, color: option.color }}
                    >
                      {option.icon}
                    </div>
                    <div>
                      <div className="text-sm text-white font-medium">{option.name}</div>
                      <div className="text-xs text-gray-500" style={{ fontFamily: 'monospace' }}>
                        {option.handle}
                      </div>
                    </div>
                  </div>

                  {option.url ? (
                    <a
                      href={option.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block w-full text-center py-2 text-xs tracking-wider uppercase border border-gray-700 text-gray-300 hover:bg-white hover:text-black hover:border-white transition-all duration-200 rounded-sm"
                      style={{ fontFamily: 'monospace' }}
                    >
                      OPEN {option.name.toUpperCase()}
                    </a>
                  ) : (
                    <div className="space-y-2">
                      <div 
                        className="text-xs text-gray-600 break-all p-2 rounded-sm"
                        style={{ background: 'rgba(255,255,255,0.03)', fontFamily: 'monospace' }}
                      >
                        {option.address}
                      </div>
                      <button
                        onClick={handleCopyAddress}
                        className={`
                          block w-full text-center py-2 text-xs tracking-wider uppercase 
                          border rounded-sm transition-all duration-200
                          ${copiedAddress 
                            ? 'border-green-500/50 text-green-400 bg-green-500/10' 
                            : 'border-gray-700 text-gray-300 hover:bg-white hover:text-black hover:border-white'
                          }
                        `}
                        style={{ fontFamily: 'monospace' }}
                      >
                        {copiedAddress ? '✓ ADDRESS COPIED' : 'COPY ADDRESS'}
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Footer note */}
            <div className="mt-6 text-center">
              <p 
                className="text-xs text-gray-700"
                style={{ fontFamily: 'monospace' }}
              >
                // ALL_FUNDS → PROTOCOL_DEVELOPMENT + INFRASTRUCTURE
              </p>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};

export default FoundersFund;
