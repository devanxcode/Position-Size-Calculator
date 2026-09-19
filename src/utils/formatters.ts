import type { AccountCurrency } from '../types/trading';

const CURRENCY_SYMBOLS: Record<AccountCurrency, string> = {
  USD: '$',
  EUR: '€',
  GBP: '£',
  JPY: '¥',
  AUD: 'A$',
  CAD: 'C$',
  CHF: 'Fr',
  INR: '₹',
};

export function formatCurrency(
  amount: number,
  currency: AccountCurrency = 'USD',
  minimumFractionDigits = 2
): string {
  const symbol = CURRENCY_SYMBOLS[currency] || '$';
  if (isNaN(amount) || !isFinite(amount)) return `${symbol}0.00`;

  const formattedNum = amount.toLocaleString('en-US', {
    minimumFractionDigits,
    maximumFractionDigits: currency === 'JPY' ? 0 : 2,
  });

  return `${symbol}${formattedNum}`;
}

export function formatLots(lots: number): string {
  if (isNaN(lots) || !isFinite(lots) || lots <= 0) return '0.00';
  if (lots < 0.01) {
    return lots.toFixed(3);
  }
  return lots.toFixed(2);
}

export function formatUnits(units: number): string {
  if (isNaN(units) || !isFinite(units) || units <= 0) return '0';
  return Math.round(units).toLocaleString('en-US');
}

export function formatPrice(price: number, decimals = 4): string {
  if (isNaN(price) || !isFinite(price)) return '0.00';
  return price.toFixed(decimals);
}

export function formatPips(pips: number): string {
  if (isNaN(pips) || !isFinite(pips)) return '0.0';
  return pips.toFixed(1);
}
