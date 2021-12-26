export interface ITicker {
  id: number;
  baseVolume: string;
  high24hr: string;
  highestBid: string;
  isFrozen: string;
  last: string;
  low24hr: string;
  lowestAsk: string;
  marginTradingEnabled: string;
  percentChange: string;
  postOnly: string;
  quoteVolume: string;
}

export type ITikers = { [key: string]: ITicker };
