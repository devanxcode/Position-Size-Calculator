import type { CalculationInput, CalculationResult, AccountCurrency } from '../types/trading';
import { USD_EXCHANGE_RATES } from '../constants/instruments';

function convertToAccountCurrency(amount: number, fromCurrency: string, toCurrency: AccountCurrency): number {
  if (fromCurrency === toCurrency) return amount;
  const fromRate = USD_EXCHANGE_RATES[fromCurrency as AccountCurrency] || 1;
  const toRate = USD_EXCHANGE_RATES[toCurrency] || 1;
  return (amount / fromRate) * toRate;
}

export function calculatePositionSize(input: CalculationInput): CalculationResult {
  const { accountCurrency, accountBalance, riskPercentage, stopLossPips, pair } = input;

  const balance = Math.max(0, accountBalance || 0);
  const riskPct = Math.max(0, riskPercentage || 0);
  const slPips = Math.max(0, stopLossPips || 0);

  // 1. Amount at Risk
  const amountAtRisk = (balance * riskPct) / 100;

  if (slPips <= 0 || amountAtRisk <= 0) {
    return {
      amountAtRisk,
      positionSizeUnits: 0,
      standardLots: 0,
      miniLots: 0,
      microLots: 0,
      pipValue: 0,
    };
  }

  // 2. Pip value per 1 standard lot
  let pipValuePerStandardLot = 0;
  const rawPipValueInQuote = pair.pipSize * pair.contractSize;

  if (pair.quoteCurrency === accountCurrency) {
    pipValuePerStandardLot = rawPipValueInQuote;
  } else if (pair.baseCurrency === accountCurrency) {
    pipValuePerStandardLot = rawPipValueInQuote / pair.currentPrice;
  } else {
    pipValuePerStandardLot = convertToAccountCurrency(rawPipValueInQuote, pair.quoteCurrency, accountCurrency);
  }

  // 3. Position Size & Lots
  const standardLots = amountAtRisk / (slPips * pipValuePerStandardLot);
  const safeStandardLots = isFinite(standardLots) && !isNaN(standardLots) ? standardLots : 0;
  const positionSizeUnits = safeStandardLots * pair.contractSize;
  const miniLots = safeStandardLots * 10;
  const microLots = safeStandardLots * 100;
  const pipValue = safeStandardLots * pipValuePerStandardLot;

  return {
    amountAtRisk,
    positionSizeUnits: Math.round(positionSizeUnits),
    standardLots: safeStandardLots,
    miniLots,
    microLots,
    pipValue,
  };
}
