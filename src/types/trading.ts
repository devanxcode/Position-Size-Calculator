export type AccountCurrency = 'USD' | 'EUR' | 'GBP' | 'JPY' | 'AUD' | 'CAD' | 'CHF' | 'INR';

export interface CurrencyPair {
  id: string;
  symbol: string;
  name: string;
  baseCurrency: string;
  quoteCurrency: string;
  pipDecimals: number;
  pipSize: number;
  contractSize: number;
  currentPrice: number;
}

export interface CalculationInput {
  accountCurrency: AccountCurrency;
  accountBalance: number;
  riskPercentage: number;
  stopLossPips: number;
  pair: CurrencyPair;
}

export interface CalculationResult {
  amountAtRisk: number;
  positionSizeUnits: number;
  standardLots: number;
  miniLots: number;
  microLots: number;
  pipValue: number; // Value per pip tick for the trade (unfair advantage over BabyPips)
}
