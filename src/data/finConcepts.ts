export type FinanceConcept = {
  title: string;
  hook: string;
  explanation: string;
  flow: [string, string, string];
};

export const FINANCE_CONCEPTS: FinanceConcept[] = [
  // --- CORPORATE FINANCE & VALUATION ---
  {
    title: "EBITDA Margin",
    hook: "Operating profitability without the noise.",
    explanation: "Earnings Before Interest, Taxes, Depreciation, and Amortization divided by Total Revenue. It measures a company's operating profit as a percentage of its revenue, ignoring non-operating effects and accounting policies.",
    flow: ["Revenue", "minus COGS/Opex", "equals EBITDA"]
  },
  {
    title: "Free Cash Flow (FCF)",
    hook: "The true cash a business generates.",
    explanation: "Operating Cash Flow minus Capital Expenditures (CapEx). Unlike net income, which includes non-cash items, FCF shows exactly how much cash is left over to pay dividends, buy back stock, or pay down debt.",
    flow: ["Op. Cash Flow", "minus CapEx", "equals FCF"]
  },
  {
    title: "WACC",
    hook: "The hurdle rate for new investments.",
    explanation: "Weighted Average Cost of Capital. It's the blended rate a company pays to finance its assets across equity and debt. A company only creates value if its Return on Invested Capital (ROIC) exceeds its WACC.",
    flow: ["Cost of Equity", "plus Cost of Debt", "equals WACC"]
  },
  {
    title: "ROIC",
    hook: "The ultimate metric for value creation.",
    explanation: "Return on Invested Capital. It measures how efficiently a company allocates the capital under its control to generate profitable returns. High ROIC combined with high growth creates massive shareholder value.",
    flow: ["Net Profit", "divided by", "Invested Capital"]
  },
  {
    title: "Enterprise Value (EV)",
    hook: "The true takeover price of a company.",
    explanation: "Market Capitalization plus Total Debt minus Cash. It represents the total theoretical price a buyer would pay to acquire the entire business, assuming they take on its debt but keep its cash.",
    flow: ["Market Cap", "plus Net Debt", "equals EV"]
  },
  {
    title: "DuPont Analysis",
    hook: "Breaking down Return on Equity.",
    explanation: "A framework that decomposes ROE into three parts: Profit Margin, Asset Turnover, and Financial Leverage. It helps analysts pinpoint exactly why a company's ROE is increasing or decreasing.",
    flow: ["Profit Margin", "× Asset Turn", "× Leverage = ROE"]
  },
  {
    title: "Goodwill",
    hook: "The premium paid for an acquisition.",
    explanation: "An intangible asset that arises when a buyer acquires an existing business for more than the fair market value of its net assets. It represents brand value, solid customer base, and good employee relations.",
    flow: ["Purchase Price", "minus Book Value", "equals Goodwill"]
  },
  {
    title: "Working Capital",
    hook: "The liquidity needed for daily operations.",
    explanation: "Current Assets minus Current Liabilities. Positive working capital means a company can pay off its short-term liabilities. Negative working capital can indicate efficiency (like Amazon) or severe distress.",
    flow: ["Current Assets", "minus Liabilities", "equals Work. Cap"]
  },

  // --- PRIVATE EQUITY & VENTURE CAPITAL ---
  {
    title: "Venture Debt",
    hook: "Non-dilutive capital for fast-growing startups.",
    explanation: "A type of loan offered by banks to early-stage, high-growth companies that already have VC backing. Founders use it to extend their runway without giving up more equity.",
    flow: ["VC Raised", "Get Loan", "Extend Runway"]
  },
  {
    title: "Dry Powder",
    hook: "Cash waiting on the sidelines.",
    explanation: "Uncommitted capital that private equity or venture capital firms have on hand to invest. High levels of dry powder mean massive amounts of money are aggressively looking for deals.",
    flow: ["Raise Fund", "Wait for Deals", "Deploy Cash"]
  },
  {
    title: "The J-Curve",
    hook: "Things get worse before they get better.",
    explanation: "In Private Equity, it's the tendency of funds to deliver negative returns in early years (due to management fees and early failures) before seeing massive gains as portfolio companies exit in later years.",
    flow: ["Early Losses", "Trough", "Massive Gains"]
  },
  {
    title: "Liquidation Preference",
    hook: "Who gets paid first when the startup sells?",
    explanation: "A clause in VC term sheets dictating the payout order in a corporate liquidation or sale. A '1x non-participating' pref means investors get their original money back before founders see a dime.",
    flow: ["Company Sells", "Investors Paid", "Founders get Remainder"]
  },
  {
    title: "LBO (Leveraged Buyout)",
    hook: "Buying a company using its own assets as collateral.",
    explanation: "The acquisition of another company using a significant amount of borrowed money to meet the cost of acquisition. The assets of the company being acquired are often used as collateral for the loans.",
    flow: ["Borrow Debt", "Buy Company", "Pay Debt w/ Cash Flow"]
  },
  {
    title: "IRR",
    hook: "The annualized rate of return.",
    explanation: "Internal Rate of Return is the discount rate that makes the net present value (NPV) of all cash flows from a particular project equal to zero. PE funds use it heavily to measure fund performance.",
    flow: ["Initial Outlay", "Cash Flows", "Calculate Yield"]
  },
  {
    title: "Down Round",
    hook: "Raising money at a lower valuation.",
    explanation: "When a private company raises capital at a pre-money valuation that is lower than the post-money valuation of the previous round. It severely dilutes founders and early investors.",
    flow: ["Previous Value", "Struggles", "Lower New Value"]
  },

  // --- TRADING & MARKETS ---
  {
    title: "Short Squeeze",
    hook: "When betting against a stock backfires.",
    explanation: "Occurs when a heavily shorted stock rapidly jumps higher, forcing short sellers to buy back shares to cut their losses, which drives the stock price even higher in a massive feedback loop.",
    flow: ["Stock Spikes", "Shorts Panic Buy", "Price Rockets"]
  },
  {
    title: "Dead Cat Bounce",
    hook: "A brief recovery in a declining trend.",
    explanation: "A temporary, short-lived recovery of asset prices from a prolonged decline or a bear market that is followed by the continuation of the downward trend. 'Even a dead cat will bounce if it falls from a great height.'",
    flow: ["Sharp Drop", "Brief Rally", "Further Drop"]
  },
  {
    title: "Dark Pools",
    hook: "Where institutions trade in secret.",
    explanation: "Private financial exchanges that allow institutional investors to trade large blocks of stock without exposing their orders to the public market, preventing massive price impact before the trade executes.",
    flow: ["Institution wants to Buy", "Routes to Dark Pool", "No Market Impact"]
  },
  {
    title: "Contango",
    hook: "When the future is more expensive than today.",
    explanation: "A situation where the futures price of a commodity is higher than the spot price. It implies the market expects the price to rise over time, often due to storage costs or future demand.",
    flow: ["Spot Price", "is lower than", "Future Price"]
  },
  {
    title: "Backwardation",
    hook: "When the spot price exceeds the future price.",
    explanation: "The opposite of Contango. It happens when there is an immediate, massive supply shortage of a commodity, making it more expensive to buy it today than for future delivery.",
    flow: ["Spot Price", "is higher than", "Future Price"]
  },
  {
    title: "Sharpe Ratio",
    hook: "Measuring risk-adjusted return.",
    explanation: "A measure used by investors to understand the return of an investment compared to its risk. A higher Sharpe ratio indicates better historical risk-adjusted performance.",
    flow: ["Excess Return", "Divided by Risk", "Equals Sharpe"]
  },
  {
    title: "Gamma Squeeze",
    hook: "Options market makers forced to buy.",
    explanation: "When retail traders buy massive amounts of call options, market makers who sell them must hedge their risk by buying the underlying stock. This buying pushes the stock higher, causing a squeeze.",
    flow: ["Retail Buys Calls", "MMs Buy Stock", "Price Rockets"]
  },
  {
    title: "Wash Trade",
    hook: "Fake trading volume.",
    explanation: "An illegal form of market manipulation in which an investor simultaneously sells and buys the same financial instruments to create misleading, artificial activity in the marketplace.",
    flow: ["Buy Asset", "Sell to Yourself", "Fake Volume"]
  },

  // --- MACROECONOMICS & MONETARY ---
  {
    title: "Quantitative Easing (QE)",
    hook: "Central banks printing money to buy bonds.",
    explanation: "A monetary policy where a central bank purchases predetermined amounts of government bonds or other financial assets in order to inject massive liquidity directly into the economy.",
    flow: ["Buy Bonds", "Inject Cash", "Lower Rates"]
  },
  {
    title: "Yield Curve Inversion",
    hook: "The classic recession predictor.",
    explanation: "Occurs when short-term interest rates exceed long-term rates (e.g., 2-year yield > 10-year yield). It indicates that investors expect interest rates to fall in the future due to an economic slowdown.",
    flow: ["Short Rates Up", "Long Rates Down", "Recession Warning"]
  },
  {
    title: "Stagflation",
    hook: "The central bank's worst nightmare.",
    explanation: "An economic cycle characterized by slow growth and high unemployment (stagnation) accompanied by high inflation. It renders traditional monetary policy tools ineffective.",
    flow: ["High Inflation", "Low Growth", "High Unemployment"]
  },
  {
    title: "M2 Money Supply",
    hook: "Measuring cash in the economy.",
    explanation: "A measure of the money supply that includes cash, checking deposits, and easily convertible near money (like savings deposits and money market funds). Rapid M2 growth often leads to inflation.",
    flow: ["Cash & Coins", "plus Savings", "equals M2"]
  },
  {
    title: "Hawkish vs Dovish",
    hook: "The language of central bankers.",
    explanation: "'Hawks' prioritize fighting inflation, usually favoring higher interest rates. 'Doves' prioritize economic growth and employment, usually favoring lower interest rates.",
    flow: ["Hawk = High Rates", "vs", "Dove = Low Rates"]
  },
  {
    title: "Capital Flight",
    hook: "Money fleeing a dying economy.",
    explanation: "A large-scale exodus of financial assets and capital from a nation due to events such as political or economic instability, currency devaluation, or the imposition of capital controls.",
    flow: ["Crisis Hits", "Sell Local Assets", "Move Money Abroad"]
  },

  // --- BEHAVIORAL FINANCE ---
  {
    title: "Loss Aversion",
    hook: "Why losing $100 hurts more than winning $100.",
    explanation: "A cognitive bias where the psychological pain of losing is psychologically twice as powerful as the pleasure of gaining. It causes investors to hold onto losing stocks way too long hoping they bounce back.",
    flow: ["Stock Drops", "Refuse to Sell", "Lose More"]
  },
  {
    title: "Anchoring Bias",
    hook: "Fixating on the all-time high.",
    explanation: "The human tendency to rely too heavily on the first piece of information offered (the 'anchor'). E.g., thinking a stock is 'cheap' just because it's down 50% from its peak, even if the fundamentals are ruined.",
    flow: ["See High Price", "Price Drops", "Assume it's Cheap"]
  },
  {
    title: "Confirmation Bias",
    hook: "Only reading articles that agree with you.",
    explanation: "The tendency to search for, interpret, favor, and recall information in a way that confirms one's preexisting beliefs or hypotheses while ignoring contradictory evidence.",
    flow: ["Buy Stock", "Ignore Bad News", "Read Bullish News"]
  },
  {
    title: "Sunk Cost Fallacy",
    hook: "Throwing good money after bad.",
    explanation: "Continuing a behavior or endeavor as a result of previously invested resources (time, money, or effort), regardless of whether the current costs outweigh the future benefits.",
    flow: ["Invest Heavily", "Project Fails", "Refuse to Quit"]
  },

  // --- ACCOUNTING & FUNDAMENTALS ---
  {
    title: "Accrual Accounting",
    hook: "Recording revenue before the cash hits the bank.",
    explanation: "An accounting method where revenue or expenses are recorded when a transaction occurs versus when payment is received or made. It provides a more accurate picture of financial health than cash accounting.",
    flow: ["Make Sale", "Record Revenue", "Collect Cash Later"]
  },
  {
    title: "Depreciation",
    hook: "The slow death of a physical asset.",
    explanation: "An accounting method of allocating the cost of a tangible or physical asset over its useful life. It's a non-cash expense that reduces net income but doesn't impact free cash flow.",
    flow: ["Buy Machinery", "Use it 10 Years", "Write off Value Annually"]
  },
  {
    title: "Amortization",
    hook: "Depreciation for invisible assets.",
    explanation: "The process of spreading the cost of an intangible asset (like a patent, trademark, or software) over its useful life. Similar to depreciation, it lowers taxable income.",
    flow: ["Buy Patent", "Use it 5 Years", "Write off Value Annually"]
  },
  {
    title: "Operating Leverage",
    hook: "When fixed costs lead to massive profits.",
    explanation: "A measure of how revenue growth translates into operating income growth. Companies with high fixed costs and low variable costs (like SaaS) have high operating leverage—once costs are covered, almost all new revenue is pure profit.",
    flow: ["Cover Fixed Costs", "Sell More", "Massive Profit Margins"]
  },

  // --- CRYPTO & ALTERNATIVES ---
  {
    title: "Proof of Work (PoW)",
    hook: "Mining digital gold with electricity.",
    explanation: "A consensus mechanism used by Bitcoin where miners compete to solve complex mathematical puzzles using computational power to validate transactions and secure the network.",
    flow: ["Burn Electricity", "Solve Puzzle", "Mine Block"]
  },
  {
    title: "DeFi (Decentralized Finance)",
    hook: "Banking without the banks.",
    explanation: "An umbrella term for peer-to-peer financial services on public blockchains. It allows users to lend, borrow, and trade assets using smart contracts without relying on traditional financial intermediaries.",
    flow: ["Lock Crypto", "Smart Contract", "Earn Yield"]
  },
  {
    title: "Arbitrage",
    hook: "Risk-free profit from price differences.",
    explanation: "The simultaneous purchase and sale of an asset to profit from an imbalance in the price. It is a trade that profits by exploiting the price differences of identical or similar financial instruments on different markets.",
    flow: ["Buy Low on Exchange A", "Sell High on Exchange B", "Instant Profit"]
  }
];
