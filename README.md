# Position Desk — Precision Trading Lot Size Calculator

> **Crafted Minimalism for Financial Discipline.**  
> A high-precision position sizing & risk calculator for Forex, Metals, Indices, and Crypto. Inspired by the design language of [devanandworks.in](https://www.devanandworks.in/) (Apple, Linear, Vercel) and the mathematical accuracy of BabyPips.

---

## 🎯 The Philosophy: *"Discipline Over Impulse"*

In trading evaluated capital (e.g. Funded Hive, FTMO), risk management is the difference between longevity and account breach. **Position Desk** eliminates guesswork before entering any order by calculating the exact lot size down to the hundredth of a lot according to strict risk parameters.

---

## ✨ Features

- **Multi-Asset Coverage**:
  - **Forex Majors & Crosses**: EUR/USD, GBP/USD, USD/JPY, GBP/JPY, AUD/USD, USD/CAD, USD/CHF, NZD/USD, EUR/GBP, etc. (with automatic 4-decimal vs 2-decimal JPY pip handling).
  - **Precious Metals & Oil**: Gold (XAU/USD - 100 oz contracts), Silver (XAG/USD), Crude Oil WTI (USOIL).
  - **Global Indices**: US30 (Dow Jones), NAS100 (Nasdaq), SPX500 (S&P 500), GER40 (DAX).
  - **Crypto**: BTC/USD, ETH/USD, SOL/USD.
- **Precision Lot Breakdown**:
  - Hero lot size with **1-click Copy for MT4 / MT5 / cTrader / TradingView**.
  - Detailed unit distribution across Standard (1.0), Mini (0.1), and Micro (0.01) lots.
- **BabyPips-Grade Calculation Engine**:
  - Stop Loss in **Pips** or **Exact Price Levels** (Entry & SL price).
  - Dynamic quote-to-account currency conversion (USD, EUR, GBP, JPY, AUD, CAD, CHF, INR) with optional manual rate override.
  - Risk calculated by **Percentage (%)** or **Fixed Capital Amount ($)**.
- **Capital Discipline Meter**:
  - Real-time gauge assessing risk exposure: Safe Tier ($\le 1.0\%$), Moderate ($1.0\% - 2.0\%$), Caution ($2.0\% - 3.0\%$), and Danger ($> 3.0\%$).
- **Take Profit & Risk-to-Reward (R:R)**:
  - Instant reward projections with quick $1:1.5$, $1:2$, and $1:3$ R:R pills.
- **Export Trade Ticket**:
  - 1-click Markdown export formatted for Discord, Notion, Telegram, or Obsidian trade journals.
- **History Scratchpad**:
  - Persists recent setups locally in the browser with one-click restore.
- **Visual Identity**:
  - Floating island navigation dock with live IST clock.
  - Dark mode (`#0A0A0A` jet black) & Light mode (`#FAFAFA` paper canvas) with tactile hairline borders (`0.08` opacity) and Inter typography.

---

## 📐 Mathematical Formulation

$$\text{Risk Capital} = \text{Account Balance} \times \left(\frac{\text{Risk \%}}{100}\right)$$

$$\text{Pip Value per Standard Lot} = \frac{\text{Pip Size}}{\text{Exchange Rate}} \times \text{Contract Size} \times \text{Quote Conversion Rate}$$

$$\text{Position Size (Lots)} = \frac{\text{Risk Capital}}{\text{Stop Loss (Pips)} \times \text{Pip Value per Lot}}$$

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+)
- npm or pnpm

### Development
```bash
# Install dependencies
npm install

# Start local dev server
npm run dev
```

### Production Build
```bash
# Type check and build optimized bundle
npm run build

# Preview build
npm run preview
```

---

## 🛠️ Tech Stack

- **Framework**: React 19 + TypeScript + Vite
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Theme**: Crafted Minimalism inspired by Apple, Linear, and [devanandworks.in](https://www.devanandworks.in/)
