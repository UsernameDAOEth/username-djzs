export interface UserProfile {
  id: string;
  username: string;
  displayName?: string;
  bio?: string;
  avatar?: {
    type?: string;
    url?: string;
  };
  ens?: string;
  ethAddress?: string;
  links?: {
    label: string;
    url: string;
  }[];
  zones?: {
    zoneId: string;
    title: string;
    entryCount?: number;
    publicCount?: number;
    lastUpdatedAt?: string;
  }[];
  journals?: {
    id: string;
    title: string;
    summary?: string;
    zoneId?: string;
    isPublic?: boolean;
    irys?: {
      hash?: string;
      url?: string;
      publishedAt?: string;
    };
    mint?: {
      minted?: boolean;
      tokenId?: string | number;
      contract?: string;
      chain?: string;
    };
    createdAt: string;
    updatedAt?: string;
  }[];
  agent?: {
    name?: string;
    ens?: string;
    xp?: number;
    level?: number;
    mood?: string;
    lastTrainedAt?: string;
    modelRef?: string;
  };
  achievements?: {
    id: string;
    title: string;
    description?: string;
    awardedAt?: string;
  }[];
  nfts?: {
    tokenId: string | number;
    contract: string;
    chain?: string;
    metadataUrl?: string;
    mintedAt?: string;
  }[];
  irysReceipts?: {
    hash: string;
    url: string;
    type?: string;
    publishedAt?: string;
  }[];
  publicProfile?: boolean;
  createdAt: string;
  updatedAt?: string;
  version?: string;
}
