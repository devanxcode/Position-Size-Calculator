import { useState, useEffect, useRef } from 'react';
import type { AccountCurrency, CurrencyPair, CalculationResult } from './types/trading';
import { CURRENCY_PAIRS, ACCOUNT_CURRENCIES } from './constants/instruments';
import { calculatePositionSize } from './utils/calculator';
import { formatCurrency, formatLots, formatUnits } from './utils/formatters';
import { Sun, Moon, Copy, Check, ArrowUpRight, ArrowDownCircle } from 'lucide-react';

export function App() {
  // Theme state
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    const saved = localStorage.getItem('theme_dark');
    return saved !== null ? saved === 'true' : true;
  });

  // IST Time (devanandworks.in signature)
  const [istTime, setIstTime] = useState('');

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme_dark', 'true');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme_dark', 'false');
    }
  }, [darkMode]);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        timeZone: 'Asia/Kolkata',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
      };
      setIstTime(new Intl.DateTimeFormat('en-US', options).format(now));
    };
    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  // Form State (Exact BabyPips options)
  const [accountCurrency, setAccountCurrency] = useState<AccountCurrency>('USD');
  const [accountBalance, setAccountBalance] = useState<string>('10000');
  const [riskPercentage, setRiskPercentage] = useState<string>('1');
  const [stopLossPips, setStopLossPips] = useState<string>('20');
  const [selectedPairId, setSelectedPairId] = useState<string>('EURUSD');
  const [customPrice, setCustomPrice] = useState<string>('');

  // Selected Pair
  const selectedPair: CurrencyPair =
    CURRENCY_PAIRS.find((p) => p.id === selectedPairId) || CURRENCY_PAIRS[0];

  // Whether ask price is needed (conditional for non-USD quote pairs, e.g. USD/CAD, USD/JPY, etc.)
  const needsAskPrice = selectedPair.quoteCurrency !== accountCurrency;

  // Auto-fill reference price when switching to a pair that requires price conversion
  useEffect(() => {
    if (needsAskPrice) {
      setCustomPrice(selectedPair.currentPrice.toFixed(selectedPair.pipDecimals));
    } else {
      setCustomPrice('');
    }
  }, [selectedPairId, accountCurrency]);

  // Results State
  const [result, setResult] = useState<CalculationResult>(() => {
    const defaultPair = CURRENCY_PAIRS[0];
    return calculatePositionSize({
      accountCurrency: 'USD',
      accountBalance: 10000,
      riskPercentage: 1,
      stopLossPips: 20,
      pair: defaultPair,
    });
  });

  const [copied, setCopied] = useState(false);
  const [isCalculatedAnim, setIsCalculatedAnim] = useState(false);
  const resultsRef = useRef<HTMLDivElement>(null);

  // Compute logic
  const handleCalculate = (scrollOnMobile = false) => {
    const balanceNum = parseFloat(accountBalance) || 0;
    const riskNum = parseFloat(riskPercentage) || 0;
    const slNum = parseFloat(stopLossPips) || 0;
    const priceNum = parseFloat(customPrice) || undefined;

    const res = calculatePositionSize({
      accountCurrency,
      accountBalance: balanceNum,
      riskPercentage: riskNum,
      stopLossPips: slNum,
      pair: selectedPair,
      customPrice: priceNum,
    });
    setResult(res);

    // Trigger subtle number pop animation
    setIsCalculatedAnim(false);
    requestAnimationFrame(() => {
      setIsCalculatedAnim(true);
    });

    // Smooth scroll down on mobile when "Calculate" is pressed
    if (scrollOnMobile && window.innerWidth < 768 && resultsRef.current) {
      setTimeout(() => {
        resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 50);
    }
  };

  // Real-time calculation on input changes
  useEffect(() => {
    handleCalculate(false);
  }, [accountCurrency, accountBalance, riskPercentage, stopLossPips, selectedPairId, customPrice]);

  const handleCopy = () => {
    if (result.standardLots > 0) {
      navigator.clipboard.writeText(formatLots(result.standardLots));
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="relative min-h-screen bg-canvas-light dark:bg-canvas-dark text-ink-primary-light dark:text-ink-primary-dark font-sans transition-colors duration-500 flex flex-col justify-between overflow-x-hidden selection:bg-accent/25 selection:text-accent">
      
      {/* Floating Apple Ambient Fluid Light Orbs */}
      <div className="pointer-events-none fixed top-[-8%] left-1/2 -translate-x-1/2 w-[340px] sm:w-[650px] h-[340px] sm:h-[650px] bg-gradient-to-tr from-blue-600/20 via-indigo-500/15 to-emerald-500/15 blur-[90px] sm:blur-[140px] rounded-full animate-float-slow -z-10" />
      <div className="pointer-events-none fixed bottom-[-10%] right-[-10%] w-[300px] sm:w-[580px] h-[300px] sm:h-[580px] bg-gradient-to-br from-teal-500/15 via-blue-500/15 to-purple-500/10 blur-[80px] sm:blur-[130px] rounded-full animate-float-reverse -z-10" />

      {/* Floating Island Navigation Dock */}
      <header className="sticky top-4 sm:top-6 z-40 w-full flex justify-center px-4 mb-2 sm:mb-4">
        <div className="apple-glass flex items-center justify-between w-full max-w-2xl px-4 sm:px-5 py-2.5 sm:py-3 rounded-full transition-all duration-300">
          <div className="flex items-center gap-2.5">
            <a
              href="https://www.devanandworks.in"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 group"
            >
              <div className="w-7 h-7 rounded-full bg-accent/15 border border-accent/30 flex items-center justify-center text-accent font-mono font-bold text-xs group-hover:scale-105 transition-transform shadow-[inset_0_1px_1px_rgba(255,255,255,0.4)]">
                D
              </div>
              <div className="flex items-center gap-1">
                <span className="text-xs sm:text-sm font-semibold tracking-tight text-ink-primary-light dark:text-ink-primary-dark">
                  devanandworks.in
                </span>
                <ArrowUpRight className="w-3 h-3 text-ink-muted-light dark:text-ink-muted-dark group-hover:text-accent transition-colors" />
              </div>
            </a>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-[11px] font-mono text-ink-muted-light dark:text-ink-muted-dark hidden sm:inline">
              IST {istTime || '--:--:--'}
            </span>

            <div className="h-3 w-px bg-black/10 dark:bg-white/10 hidden sm:block" />

            <button
              onClick={() => setDarkMode((prev) => !prev)}
              className="p-2 rounded-full text-ink-secondary-light dark:text-ink-secondary-dark hover:text-ink-primary-light dark:hover:text-ink-primary-dark hover:bg-black/5 dark:hover:bg-white/10 transition-all cursor-pointer"
              aria-label="Toggle Theme"
              title={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            >
              {darkMode ? (
                <Sun className="w-4 h-4 text-amber-300 hover:rotate-45 transition-transform" />
              ) : (
                <Moon className="w-4 h-4 text-slate-700 hover:-rotate-12 transition-transform" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Main Container with generous padding */}
      <main className="w-full max-w-2xl mx-auto px-4 sm:px-6 my-auto z-10 py-4 sm:py-6">
        
        {/* Header Title Area with Generous Padding */}
        <div className="py-6 sm:py-8 px-2 sm:px-4 mb-2 sm:mb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-3">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-ink-primary-light dark:text-ink-primary-dark">
              Position Calculator
            </h1>
          </div>
          <span className="text-xs font-mono text-ink-muted-light dark:text-ink-muted-dark">
            Zero Ads • Sub-ms Compute
          </span>
        </div>

        {/* Pure & Simple Liquid Glass Card */}
        <div className="apple-glass rounded-[28px] sm:rounded-[36px] p-6 sm:p-9 md:p-11 transition-all duration-300">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-11 lg:gap-14 items-start">
            
            {/* Left Column: BabyPips Inputs */}
            <div className="space-y-4 sm:space-y-4.5">
              
              {/* 1. Account Currency */}
              <div>
                <label className="block text-xs font-medium text-ink-secondary-light dark:text-ink-secondary-dark mb-1.5">
                  Account Currency
                </label>
                <div className="relative">
                  <select
                    value={accountCurrency}
                    onChange={(e) => setAccountCurrency(e.target.value as AccountCurrency)}
                    className="apple-glass-input w-full h-12 sm:h-11 px-4 rounded-2xl text-sm font-semibold text-ink-primary-light dark:text-ink-primary-dark focus:outline-none appearance-none cursor-pointer"
                  >
                    {ACCOUNT_CURRENCIES.map((curr) => (
                      <option key={curr.code} value={curr.code} className="bg-surface-light dark:bg-surface-dark">
                        {curr.code}
                      </option>
                    ))}
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-ink-muted-light dark:text-ink-muted-dark">
                    <svg className="w-4 h-4 opacity-70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* 2. Account Balance */}
              <div>
                <label className="block text-xs font-medium text-ink-secondary-light dark:text-ink-secondary-dark mb-1.5">
                  Account Balance
                </label>
                <input
                  type="number"
                  inputMode="decimal"
                  min="0"
                  step="any"
                  value={accountBalance}
                  onChange={(e) => setAccountBalance(e.target.value)}
                  placeholder="0"
                  className="apple-glass-input w-full h-12 sm:h-11 px-4 rounded-2xl text-sm font-mono text-ink-primary-light dark:text-ink-primary-dark focus:outline-none"
                />
              </div>

              {/* 3. Risk Percentage */}
              <div>
                <label className="block text-xs font-medium text-ink-secondary-light dark:text-ink-secondary-dark mb-1.5">
                  Risk Percentage
                </label>
                <div className="relative">
                  <input
                    type="number"
                    inputMode="decimal"
                    min="0"
                    max="100"
                    step="any"
                    value={riskPercentage}
                    onChange={(e) => setRiskPercentage(e.target.value)}
                    placeholder="0"
                    className="apple-glass-input w-full h-12 sm:h-11 px-4 pr-10 rounded-2xl text-sm font-mono text-ink-primary-light dark:text-ink-primary-dark focus:outline-none"
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-mono text-ink-muted-light dark:text-ink-muted-dark font-medium">
                    %
                  </span>
                </div>
              </div>

              {/* 4. Stop Loss (pips) */}
              <div>
                <label className="block text-xs font-medium text-ink-secondary-light dark:text-ink-secondary-dark mb-1.5">
                  Stop Loss (pips)
                </label>
                <input
                  type="number"
                  inputMode="decimal"
                  min="0"
                  step="any"
                  value={stopLossPips}
                  onChange={(e) => setStopLossPips(e.target.value)}
                  placeholder="0"
                  className="apple-glass-input w-full h-12 sm:h-11 px-4 rounded-2xl text-sm font-mono text-ink-primary-light dark:text-ink-primary-dark focus:outline-none"
                />
              </div>

              {/* 5. Currency Pair */}
              <div>
                <label className="block text-xs font-medium text-ink-secondary-light dark:text-ink-secondary-dark mb-1.5">
                  Currency Pair
                </label>
                <div className="relative">
                  <select
                    value={selectedPairId}
                    onChange={(e) => setSelectedPairId(e.target.value)}
                    className="apple-glass-input w-full h-12 sm:h-11 px-4 rounded-2xl text-sm font-semibold text-ink-primary-light dark:text-ink-primary-dark focus:outline-none appearance-none cursor-pointer"
                  >
                    {CURRENCY_PAIRS.map((pair) => (
                      <option key={pair.id} value={pair.id} className="bg-surface-light dark:bg-surface-dark">
                        {pair.symbol}
                      </option>
                    ))}
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-ink-muted-light dark:text-ink-muted-dark">
                    <svg className="w-4 h-4 opacity-70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* 6. Current [PAIR] Ask Price (Conditionally shown for non-USD quote pairs, e.g. USD/CAD, USD/JPY, etc.) */}
              {needsAskPrice && (
                <div className="animate-in fade-in slide-in-from-top-2 duration-200">
                  <label className="block text-xs font-medium text-ink-secondary-light dark:text-ink-secondary-dark mb-1.5">
                    Current <span className="bg-amber-400/20 text-amber-500 dark:text-amber-400 px-1.5 py-0.5 rounded font-semibold">{selectedPair.symbol}</span> Ask Price
                  </label>
                  <input
                    type="number"
                    inputMode="decimal"
                    step="any"
                    value={customPrice}
                    onChange={(e) => setCustomPrice(e.target.value)}
                    placeholder="0"
                    className="apple-glass-input w-full h-12 sm:h-11 px-4 rounded-2xl text-sm font-mono text-ink-primary-light dark:text-ink-primary-dark focus:outline-none"
                  />
                </div>
              )}

              {/* Big Calculate Button */}
              <div className="pt-3 sm:pt-4">
                <button
                  type="button"
                  onClick={() => handleCalculate(true)}
                  className="apple-glass-btn w-full h-14 sm:h-15 px-8 rounded-2xl text-white font-bold text-base sm:text-lg tracking-wide shadow-lg hover:shadow-xl transition-all duration-200 active:scale-[0.98] cursor-pointer flex items-center justify-center gap-2.5"
                >
                  <span>Calculate</span>
                </button>
              </div>

            </div>

            {/* Right Column: Clean & Simple BabyPips Results */}
            <div ref={resultsRef} className="space-y-5 pt-4 md:pt-0 border-t md:border-t-0 border-black/[0.06] dark:border-white/[0.08]">
              
              {/* Header */}
              <div className="flex items-center gap-2 pb-2.5 border-b border-black/[0.06] dark:border-white/[0.08]">
                <h2 className="text-2xl font-bold tracking-tight text-ink-primary-light dark:text-ink-primary-dark">
                  Results
                </h2>
                <ArrowDownCircle className="w-5 h-5 text-accent" />
              </div>

              {/* 1. Amount at Risk */}
              <div className="border-b border-black/[0.06] dark:border-white/[0.08] pb-3.5">
                <span className="text-xs font-medium text-ink-secondary-light dark:text-ink-secondary-dark block mb-0.5">
                  Amount at Risk
                </span>
                <span className={`text-2xl sm:text-3xl font-bold font-mono text-ink-primary-light dark:text-ink-primary-dark block ${isCalculatedAnim ? 'animate-number-pop' : ''}`}>
                  {formatCurrency(result.amountAtRisk, accountCurrency)}
                </span>
              </div>

              {/* 2. Position Size (units) */}
              <div className="border-b border-black/[0.06] dark:border-white/[0.08] pb-3.5">
                <span className="text-xs font-medium text-ink-secondary-light dark:text-ink-secondary-dark block mb-0.5">
                  Position Size (units)
                </span>
                <span className={`text-2xl sm:text-3xl font-bold font-mono text-ink-primary-light dark:text-ink-primary-dark block ${isCalculatedAnim ? 'animate-number-pop' : ''}`}>
                  {formatUnits(result.positionSizeUnits)}
                </span>
              </div>

              {/* 3. Standard Lots */}
              <div className="border-b border-black/[0.06] dark:border-white/[0.08] pb-3.5 flex items-center justify-between">
                <div>
                  <span className="text-xs font-medium text-ink-secondary-light dark:text-ink-secondary-dark block mb-0.5">
                    Standard Lots
                  </span>
                  <span className={`text-3xl sm:text-4xl font-extrabold font-mono text-accent block ${isCalculatedAnim ? 'animate-number-pop' : ''}`}>
                    {formatLots(result.standardLots)}
                  </span>
                </div>
                
                {result.standardLots > 0 && (
                  <button
                    onClick={handleCopy}
                    className="p-2.5 rounded-xl apple-glass-input text-ink-secondary-light dark:text-ink-secondary-dark hover:text-accent transition-all cursor-pointer active:scale-90 flex items-center gap-1.5 text-xs font-medium"
                    title="Copy standard lots"
                    aria-label="Copy standard lot size"
                  >
                    {copied ? (
                      <>
                        <Check className="w-4 h-4 text-emerald-500 animate-number-pop" />
                        <span className="text-emerald-500 font-semibold text-xs">Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4" />
                        <span className="text-xs hidden xs:inline">Copy</span>
                      </>
                    )}
                  </button>
                )}
              </div>

              {/* 4. Mini Lots */}
              <div className="border-b border-black/[0.06] dark:border-white/[0.08] pb-3.5">
                <span className="text-xs font-medium text-ink-secondary-light dark:text-ink-secondary-dark block mb-0.5">
                  Mini Lots
                </span>
                <span className="text-2xl sm:text-3xl font-bold font-mono text-ink-primary-light dark:text-ink-primary-dark block">
                  {result.miniLots > 0 ? result.miniLots.toFixed(2) : '0'}
                </span>
              </div>

              {/* 5. Micro Lots */}
              <div className="pb-1">
                <span className="text-xs font-medium text-ink-secondary-light dark:text-ink-secondary-dark block mb-0.5">
                  Micro Lots
                </span>
                <span className="text-2xl sm:text-3xl font-bold font-mono text-ink-primary-light dark:text-ink-primary-dark block">
                  {result.microLots > 0 ? result.microLots.toFixed(2) : '0'}
                </span>
              </div>

            </div>

          </div>

        </div>
      </main>

      {/* Clean devanandworks.in Minimal Footer */}
      <footer className="w-full max-w-2xl mx-auto px-4 py-6 sm:py-8 text-center text-xs text-ink-muted-light dark:text-ink-muted-dark z-10">
        <a
          href="https://www.devanandworks.in"
          target="_blank"
          rel="noopener noreferrer"
          className="text-ink-secondary-light dark:text-ink-secondary-dark hover:text-accent transition-colors font-medium text-xs inline-flex items-center gap-1"
        >
          Devanand • devanandworks.in
        </a>
      </footer>

    </div>
  );
}

export default App;
