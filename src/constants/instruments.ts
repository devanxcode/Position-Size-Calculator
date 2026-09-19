import type { CurrencyPair, AccountCurrency } from '../types/trading';

export const CURRENCY_PAIRS: CurrencyPair[] = [
  { id: 'EURUSD', symbol: 'EUR/USD', name: 'Euro / US Dollar', baseCurrency: 'EUR', quoteCurrency: 'USD', pipDecimals: 4, pipSize: 0.0001, contractSize: 100000, currentPrice: 1.0850 },
  { id: 'GBPUSD', symbol: 'GBP/USD', name: 'British Pound / US Dollar', baseCurrency: 'GBP', quoteCurrency: 'USD', pipDecimals: 4, pipSize: 0.0001, contractSize: 100000, currentPrice: 1.2980 },
  { id: 'USDJPY', symbol: 'USD/JPY', name: 'US Dollar / Japanese Yen', baseCurrency: 'USD', quoteCurrency: 'JPY', pipDecimals: 2, pipSize: 0.01, contractSize: 100000, currentPrice: 154.50 },
  { id: 'USDCHF', symbol: 'USD/CHF', name: 'US Dollar / Swiss Franc', baseCurrency: 'USD', quoteCurrency: 'CHF', pipDecimals: 4, pipSize: 0.0001, contractSize: 100000, currentPrice: 0.8840 },
  { id: 'USDCAD', symbol: 'USD/CAD', name: 'US Dollar / Canadian Dollar', baseCurrency: 'USD', quoteCurrency: 'CAD', pipDecimals: 4, pipSize: 0.0001, contractSize: 100000, currentPrice: 1.3860 },
  { id: 'AUDUSD', symbol: 'AUD/USD', name: 'Australian Dollar / US Dollar', baseCurrency: 'AUD', quoteCurrency: 'USD', pipDecimals: 4, pipSize: 0.0001, contractSize: 100000, currentPrice: 0.6550 },
  { id: 'NZDUSD', symbol: 'NZD/USD', name: 'New Zealand Dollar / US Dollar', baseCurrency: 'NZD', quoteCurrency: 'USD', pipDecimals: 4, pipSize: 0.0001, contractSize: 100000, currentPrice: 0.5930 },
  { id: 'EURGBP', symbol: 'EUR/GBP', name: 'Euro / British Pound', baseCurrency: 'EUR', quoteCurrency: 'GBP', pipDecimals: 4, pipSize: 0.0001, contractSize: 100000, currentPrice: 0.8360 },
  { id: 'EURJPY', symbol: 'EUR/JPY', name: 'Euro / Japanese Yen', baseCurrency: 'EUR', quoteCurrency: 'JPY', pipDecimals: 2, pipSize: 0.01, contractSize: 100000, currentPrice: 167.60 },
  { id: 'GBPJPY', symbol: 'GBP/JPY', name: 'British Pound / Japanese Yen', baseCurrency: 'GBP', quoteCurrency: 'JPY', pipDecimals: 2, pipSize: 0.01, contractSize: 100000, currentPrice: 200.50 },
  { id: 'EURAUD', symbol: 'EUR/AUD', name: 'Euro / Australian Dollar', baseCurrency: 'EUR', quoteCurrency: 'AUD', pipDecimals: 4, pipSize: 0.0001, contractSize: 100000, currentPrice: 1.6560 },
  { id: 'EURCAD', symbol: 'EUR/CAD', name: 'Euro / Canadian Dollar', baseCurrency: 'EUR', quoteCurrency: 'CAD', pipDecimals: 4, pipSize: 0.0001, contractSize: 100000, currentPrice: 1.5040 },
  { id: 'EURCHF', symbol: 'EUR/CHF', name: 'Euro / Swiss Franc', baseCurrency: 'EUR', quoteCurrency: 'CHF', pipDecimals: 4, pipSize: 0.0001, contractSize: 100000, currentPrice: 0.9590 },
  { id: 'GBPAUD', symbol: 'GBP/AUD', name: 'British Pound / Australian Dollar', baseCurrency: 'GBP', quoteCurrency: 'AUD', pipDecimals: 4, pipSize: 0.0001, contractSize: 100000, currentPrice: 1.9810 },
  { id: 'AUDJPY', symbol: 'AUD/JPY', name: 'Australian Dollar / Japanese Yen', baseCurrency: 'AUD', quoteCurrency: 'JPY', pipDecimals: 2, pipSize: 0.01, contractSize: 100000, currentPrice: 101.20 },
  { id: 'CADJPY', symbol: 'CAD/JPY', name: 'Canadian Dollar / Japanese Yen', baseCurrency: 'CAD', quoteCurrency: 'JPY', pipDecimals: 2, pipSize: 0.01, contractSize: 100000, currentPrice: 111.40 },
  { id: 'CHFJPY', symbol: 'CHF/JPY', name: 'Swiss Franc / Japanese Yen', baseCurrency: 'CHF', quoteCurrency: 'JPY', pipDecimals: 2, pipSize: 0.01, contractSize: 100000, currentPrice: 174.70 },
  { id: 'XAUUSD', symbol: 'XAU/USD', name: 'Gold / US Dollar', baseCurrency: 'XAU', quoteCurrency: 'USD', pipDecimals: 2, pipSize: 0.10, contractSize: 100, currentPrice: 2655.00 },
];

export const ACCOUNT_CURRENCIES: { code: AccountCurrency; symbol: string }[] = [
  { code: 'USD', symbol: '$' },
  { code: 'EUR', symbol: '€' },
  { code: 'GBP', symbol: '£' },
  { code: 'JPY', symbol: '¥' },
  { code: 'AUD', symbol: 'A$' },
  { code: 'CAD', symbol: 'C$' },
  { code: 'CHF', symbol: 'Fr' },
  { code: 'INR', symbol: '₹' },
];

export const USD_EXCHANGE_RATES: Record<AccountCurrency, number> = {
  USD: 1.0,
  EUR: 0.921,
  GBP: 0.770,
  JPY: 154.50,
  AUD: 1.526,
  CAD: 1.386,
  CHF: 0.884,
  INR: 84.05,
};
