export type MacroScenario = {
  text: string;
  type: 'bull' | 'bear';
  explanation: string;
};

export const MACRO_SCENARIOS: MacroScenario[] = [
  // --- MONETARY POLICY (RBI & BANKS) ---
  { text: "RBI cuts the repo rate by 50 basis points.", type: 'bull', explanation: "Lower interest rates make borrowing cheaper, stimulating corporate growth and increasing equity valuations." },
  { text: "RBI unexpectedly hikes the Cash Reserve Ratio (CRR) by 100 bps.", type: 'bear', explanation: "A higher CRR pulls liquidity out of the banking system, reducing lending capacity and hurting economic growth." },
  { text: "RBI increases the Statutory Liquidity Ratio (SLR).", type: 'bear', explanation: "Forces banks to park more money in safe government securities, leaving less capital for aggressive corporate lending." },
  { text: "NPA (Non-Performing Asset) levels in PSU Banks drop to a 10-year low.", type: 'bull', explanation: "Cleaner balance sheets mean banks require lower provisions, directly boosting profitability and lending capacity." },
  { text: "RBI announces a massive Open Market Operation (OMO) to buy government bonds.", type: 'bull', explanation: "Buying bonds injects massive liquidity into the financial system, driving bond yields down and equity prices up." },
  { text: "Credit growth in the banking sector hits a 5-year high of 16% YoY.", type: 'bull', explanation: "High credit growth signals strong corporate expansion and consumer confidence, a major positive for banking stocks." },
  { text: "RBI imposes strict capital buffer requirements on unsecured personal loans.", type: 'bear', explanation: "Forces banks to hold more capital against retail loans, reducing their margins and slowing down retail credit growth." },
  { text: "The yield curve sharply inverts (short-term rates higher than long-term).", type: 'bear', explanation: "An inverted yield curve is a classic leading indicator of an impending economic recession." },
  { text: "RBI maintains an 'Accommodative' stance despite rising global rates.", type: 'bull', explanation: "Signals that the central bank prioritizes domestic growth over tracking global tightening cycles." },
  { text: "Major private banks report a sharp contraction in Net Interest Margins (NIMs).", type: 'bear', explanation: "Shrinking NIMs mean banks are paying more for deposits than they are earning from loans, hitting their profitability." },

  // --- FISCAL POLICY & GOVERNMENT ---
  { text: "Government unexpectedly increases Long-Term Capital Gains (LTCG) tax.", type: 'bear', explanation: "Higher taxes on stock profits reduce net returns, leading to immediate market sell-offs by large investors." },
  { text: "Government announces a massive ₹5 Lakh Cr infrastructure spending package.", type: 'bull', explanation: "Govt Capex boosts construction, cement, steel, and creates jobs, spurring a multiplier effect in the economy." },
  { text: "Corporate tax rates slashed by 5% for new manufacturing firms.", type: 'bull', explanation: "Lower corporate taxes directly boost Net Income margins and EPS, immediately driving stock prices higher." },
  { text: "Fiscal Deficit breaches the target, hitting 6.5% of GDP.", type: 'bear', explanation: "A high fiscal deficit forces the government to borrow more, crowding out private investment and risking sovereign downgrades." },
  { text: "Government announces a massive PLI (Production Linked Incentive) scheme for electronics.", type: 'bull', explanation: "Direct subsidies boost domestic manufacturing, attract foreign capital, and dramatically benefit EMS (Electronic Manufacturing Services) stocks." },
  { text: "Securities Transaction Tax (STT) is doubled on F&O trading.", type: 'bear', explanation: "Dramatically increases trading costs, draining liquidity from the markets and hurting brokerages." },
  { text: "Government sharply cuts subsidies on fertilizers and fuel.", type: 'bear', explanation: "While good for the fiscal deficit, it immediately hurts rural disposable income, negatively impacting FMCG and tractor sales." },
  { text: "Disinvestment target of ₹1 Lakh Crore successfully met via PSU privatizations.", type: 'bull', explanation: "Brings efficiency to PSUs and gives the government massive non-tax revenue to spend on infrastructure without borrowing." },
  { text: "Government imposes windfall taxes on domestic crude oil producers.", type: 'bear', explanation: "Directly eats into the unexpected profits of energy giants like Reliance and ONGC, leading to a sector sell-off." },
  { text: "Defense capital procurement budget increased by 25% for domestic sourcing.", type: 'bull', explanation: "Massive tailwind for domestic defense contractors, aerospace companies, and shipbuilders." },

  // --- GLOBAL MACRO & US FED ---
  { text: "The US Federal Reserve hikes interest rates aggressively by 75 bps.", type: 'bear', explanation: "Higher US rates attract capital away from emerging markets like India back to 'safe' US assets." },
  { text: "US Federal Reserve signals multiple rate cuts for the upcoming year.", type: 'bull', explanation: "Lower US rates weaken the Dollar, pushing foreign capital into emerging markets like India seeking higher yields." },
  { text: "The US economy enters a confirmed technical recession.", type: 'bear', explanation: "A US recession crushes export demand for Indian IT services, pharmaceuticals, and textiles." },
  { text: "US Non-Farm Payrolls show unexpected, massive job losses.", type: 'bear', explanation: "Signals a rapid cooling of the world's largest economy, causing global market panic and risk-off sentiment." },
  { text: "The Bank of Japan surprisingly raises interest rates, ending negative rate policy.", type: 'bear', explanation: "Unwinds the 'Yen Carry Trade', causing massive global liquidity to be repatriated to Japan, crashing emerging markets." },
  { text: "China announces a massive $500 Billion stimulus package.", type: 'bull', explanation: "Chinese stimulus drives up global demand for commodities (metals), boosting Indian metal and mining stocks." },
  { text: "US Inflation (CPI) drops faster than expected to 2.1%.", type: 'bull', explanation: "Gives the US Fed room to cut interest rates, triggering a massive 'Risk-On' rally globally." },
  { text: "European Central Bank (ECB) slashes rates to zero.", type: 'bull', explanation: "Cheap European money searches for growth, often finding its way into high-growth Indian equities." },
  { text: "US 10-Year Treasury Yield spikes past 5%.", type: 'bear', explanation: "High 'risk-free' yields in the US make risky emerging market equities highly unattractive to global funds." },
  { text: "Global manufacturing PMI expands for the first time in 14 months.", type: 'bull', explanation: "Signals a recovery in global industrial demand, highly positive for Indian exporters and commodity producers." },

  // --- COMMODITIES & ENERGY ---
  { text: "Global crude oil prices spike to $110 per barrel.", type: 'bear', explanation: "India imports over 80% of its oil. High crude prices widen the current account deficit and stoke domestic inflation." },
  { text: "Brent Crude crashes below $60 per barrel.", type: 'bull', explanation: "Cheap oil drastically reduces India's import bill, cools inflation, and boosts margins for FMCG, Paints, and Airlines." },
  { text: "Gold prices hit an all-time high amidst global panic.", type: 'bear', explanation: "When Gold rockets, it usually signals severe 'Risk-Off' sentiment, meaning investors are fleeing equities in fear." },
  { text: "International Coal prices surge by 40% due to supply shortages.", type: 'bear', explanation: "Increases power generation costs in India, compressing margins for manufacturing and metal companies." },
  { text: "Global Steel prices jump 20% on strong Chinese demand.", type: 'bull', explanation: "Directly boosts the realizations and profitability of Indian steel giants like Tata Steel and JSW Steel." },
  { text: "Lithium and Copper prices crash to multi-year lows.", type: 'bull', explanation: "Lowers battery and wire manufacturing costs, heavily benefiting EV makers and consumer electrical companies." },
  { text: "OPEC+ announces a surprise massive cut in oil production.", type: 'bear', explanation: "Artificially chokes crude supply, spiking oil prices which directly hurts India's macro fundamentals." },
  { text: "Natural Gas prices in Europe plummet 50%.", type: 'bull', explanation: "Eases global energy costs and specifically benefits Indian ceramic and fertilizer companies that use gas as a key input." },
  { text: "Palm Oil prices crash globally.", type: 'bull', explanation: "Palm oil is a massive input cost for FMCG companies (soaps, snacks). A crash heavily expands their gross margins." },
  { text: "Silver prices surge on massive industrial demand for solar panels.", type: 'bull', explanation: "Indicates strong global transition to green energy, benefiting renewable energy EPCs and module manufacturers." },

  // --- CURRENCY & TRADE ---
  { text: "The Indian Rupee (INR) appreciates strongly to ₹78 against the USD.", type: 'bear', explanation: "A strong Rupee hurts export-heavy sectors like IT Services and Pharma, as their dollar earnings are worth less in INR." },
  { text: "The US Dollar Index (DXY) hits a 20-year high.", type: 'bear', explanation: "A soaring dollar drains liquidity from emerging markets and makes India's dollar-denominated debt harder to service." },
  { text: "India's Current Account Deficit (CAD) widens to 3.5% of GDP.", type: 'bear', explanation: "A high CAD means India is importing much more than it exports, putting severe depreciation pressure on the Rupee." },
  { text: "India's merchandise exports hit a record $450 Billion.", type: 'bull', explanation: "Strong exports bring in dollars, strengthen the Rupee, and indicate high global competitiveness of Indian manufacturing." },
  { text: "Foreign Exchange (Forex) reserves hit an all-time high of $700 Billion.", type: 'bull', explanation: "Massive reserves give the RBI immense firepower to stabilize the Rupee during global crises, increasing foreign investor confidence." },
  { text: "The Rupee depreciates past ₹84 per USD.", type: 'bear', explanation: "While good for IT/Pharma, severe depreciation makes imported crude oil and electronics highly expensive, importing inflation." },
  { text: "India signs a historic Free Trade Agreement (FTA) with the UK.", type: 'bull', explanation: "FTAs open up massive new markets with zero tariffs, heavily boosting textiles, leather, and IT sectors." },
  { text: "Global container freight rates drop by 60%.", type: 'bull', explanation: "Cheaper shipping drastically reduces logistics costs for exporters, improving their margins and competitiveness." },
  { text: "India's Services trade surplus covers the entire merchandise deficit.", type: 'bull', explanation: "Indicates that IT, Consulting, and SaaS exports are so strong they are keeping the overall national balance of payments positive." },
  { text: "US Treasury designates India as a 'Currency Manipulator'.", type: 'bear', explanation: "Invites severe global scrutiny, potential trade tariffs, and prevents the RBI from aggressively defending the Rupee." },

  // --- FII / DII & LIQUIDITY FLOWS ---
  { text: "FIIs (Foreign Institutional Investors) pump ₹10,000 Cr into Indian equities in a day.", type: 'bull', explanation: "Massive foreign inflows increase demand for large-cap stocks, driving indices broadly higher." },
  { text: "Domestic Mutual Funds record the highest ever monthly SIP inflows of ₹20,000 Cr.", type: 'bull', explanation: "Consistent retail participation provides a massive structural cushion of domestic liquidity, supporting market valuations." },
  { text: "FIIs pull out $5 Billion from Indian markets in a single week.", type: 'bear', explanation: "Heavy foreign selling creates immense downward pressure on blue-chip stocks and weakens the domestic currency." },
  { text: "EPFO (Employees' Provident Fund) increases equity allocation limit from 15% to 25%.", type: 'bull', explanation: "Channels billions of dollars of mandatory retirement savings directly into the stock market every month." },
  { text: "India gets included in the JP Morgan Global Emerging Market Bond Index.", type: 'bull', explanation: "Forces global passive funds to buy billions in Indian debt, lowering domestic borrowing costs across the board." },
  { text: "Retail investor demat account openings drop by 50% YoY.", type: 'bear', explanation: "Signals retail fatigue and a potential drying up of the domestic liquidity that supports mid and small-cap valuations." },
  { text: "Sovereign Wealth Funds allocate an extra $10B to Indian infra.", type: 'bull', explanation: "Patient, long-term foreign capital entering the country boosts the capital goods sector without market volatility." },
  { text: "Global Hedge Funds massively short the Nifty 50 futures.", type: 'bear', explanation: "Aggressive speculative shorting creates panic, triggering stop-losses and driving rapid market corrections." },
  { text: "DIIs (Domestic Institutional Investors) out-buy FII selling for 10 straight days.", type: 'bull', explanation: "Proves that domestic liquidity is strong enough to completely absorb foreign shocks, maintaining market stability." },
  { text: "SEBI tightens margin requirements for retail F&O traders.", type: 'bear', explanation: "Sucks speculative liquidity out of the derivatives market, which can lead to lower overall market volumes and volatility." },

  // --- INFLATION, MONSOON & CONSUMER DEMAND ---
  { text: "Monsoon brings a 20% rainfall deficit.", type: 'bear', explanation: "Poor monsoons hurt agricultural output, reduce rural disposable income, and negatively impact FMCG and tractor companies." },
  { text: "Retail inflation (CPI) unexpectedly jumps to 7.5%.", type: 'bear', explanation: "High inflation destroys consumer purchasing power and forces the RBI to keep interest rates high, suppressing growth." },
  { text: "The IMD forecasts an 'Above Normal' and evenly distributed monsoon.", type: 'bull', explanation: "Good rains boost rural incomes, driving heavy demand for FMCG, two-wheelers, and agricultural inputs." },
  { text: "Wholesale Price Index (WPI) enters deflation territory (-1.5%).", type: 'bull', explanation: "Falling wholesale prices mean raw material costs for manufacturing companies are dropping, expanding their profit margins." },
  { text: "FMCG volumes in rural India grow at double digits for the first time in 3 years.", type: 'bull', explanation: "Signals a massive recovery at the bottom of the pyramid, highly positive for companies like HUL, Dabur, and Marico." },
  { text: "Unemployment rate hits a 4-year high.", type: 'bear', explanation: "High unemployment crushes discretionary spending, hurting retail, multiplexes, and entry-level auto sales." },
  { text: "Minimum Support Price (MSP) for wheat hiked by 15% ahead of elections.", type: 'bull', explanation: "Puts more cash directly into the hands of farmers, immediately boosting rural consumption." },
  { text: "Urban passenger vehicle sales plummet 20% YoY.", type: 'bear', explanation: "Indicates urban consumer distress and high borrowing costs, a major red flag for the broader economy." },
  { text: "Food inflation specifically spikes due to erratic weather.", type: 'bear', explanation: "Food makes up a massive portion of the Indian CPI basket; high food prices crush discretionary spending among the middle class." },
  { text: "Domestic air traffic hits a record 5 lakh daily passengers.", type: 'bull', explanation: "A proxy for urban affluence and business activity; highly positive for aviation, hospitality, and luggage stocks." },

  // --- SECTOR SPECIFIC (IT, AUTO, REAL ESTATE, PHARMA) ---
  { text: "Global IT spending outlook revised downwards by Gartner.", type: 'bear', explanation: "Lower global IT budgets directly hit the order books and revenue pipelines of Indian IT majors like TCS and Infosys." },
  { text: "Real Estate property registrations in top 7 cities hit a 10-year high.", type: 'bull', explanation: "A booming housing market boosts ancillary sectors like cement, steel, paints, cables, and housing finance companies." },
  { text: "Auto sales show a surprise 15% decline during the Diwali festive season.", type: 'bear', explanation: "Poor festive sales indicate deep consumer distress, dragging down the auto sector and related auto-ancillary stocks." },
  { text: "US FDA issues a blanket 'Import Alert' on a major Indian pharma facility.", type: 'bear', explanation: "Bans the company from selling drugs in the US, instantly wiping out a massive chunk of their revenue and crashing the stock." },
  { text: "Top 3 Indian IT firms announce record-breaking Total Contract Value (TCV) wins.", type: 'bull', explanation: "Massive deal wins guarantee revenue visibility for the next 3-5 years, driving tech valuations higher." },
  { text: "Government mandates 20% ethanol blending in petrol.", type: 'bull', explanation: "A massive structural shift that guarantees demand for sugar companies, acting as a permanent revenue stream." },
  { text: "Telecom companies successfully hike tariff ARPU by 20% without losing subscribers.", type: 'bull', explanation: "Directly flows to the bottom line, massively boosting profitability for the telecom oligopoly (Jio, Airtel)." },
  { text: "Major semiconductor fab plant breaks ground in Gujarat.", type: 'bull', explanation: "Reduces import dependence, builds a high-tech ecosystem, and benefits domestic EMS and chemical companies." },
  { text: "Supreme Court cancels telecom spectrum licenses over a historic scam.", type: 'bear', explanation: "Creates immense regulatory uncertainty, crashing telecom stocks and exposing banks to massive bad loans." },
  { text: "EV (Electric Vehicle) penetration in 2-wheelers crosses 15%.", type: 'bull', explanation: "Validates the EV transition, boosting battery makers and legacy auto players who successfully pivoted." },

  // --- GEOPOLITICS & GLOBAL TRADE ---
  { text: "A major war breaks out in the Middle East.", type: 'bear', explanation: "Geopolitical instability usually causes a flight to safety (Gold/Bonds) and spikes oil prices, hurting Indian equities." },
  { text: "Global supply chains are disrupted due to Red Sea shipping attacks.", type: 'bear', explanation: "Shipping disruptions spike freight costs, delay exports, and cause supply-side inflation globally." },
  { text: "US imposes heavy tariffs on Chinese imports.", type: 'bull', explanation: "Accelerates the 'China Plus One' strategy, pushing global manufacturing supply chains to relocate to India." },
  { text: "A major cyberattack cripples global banking infrastructure for 48 hours.", type: 'bear', explanation: "Destroys trust in digital financial systems, causing extreme panic selling and liquidity freezes in the markets." },
  { text: "Taiwan faces a severe geopolitical blockade.", type: 'bear', explanation: "Taiwan produces 60% of the world's semiconductors. A blockade halts global manufacturing of cars, phones, and computers." },
  { text: "India successfully joins the UN Security Council as a permanent member.", type: 'bull', explanation: "A massive boost to India's geopolitical clout, increasing foreign investor confidence and sovereign rating outlooks." },
  { text: "Border tensions escalate significantly with a neighboring nation.", type: 'bear', explanation: "Forces the government to divert capital from infrastructure to defense, and creates massive uncertainty for foreign investors." },
  { text: "OPEC+ fails to reach an agreement, triggering an oil price war.", type: 'bull', explanation: "An oil price war floods the market with cheap crude, drastically benefiting oil-importing nations like India." },
  { text: "Europe imposes a strict 'Carbon Border Tax' on imports.", type: 'bear', explanation: "Makes Indian exports of steel, cement, and aluminum significantly more expensive and uncompetitive in the European market." },
  { text: "A historic peace treaty is signed ending a major European conflict.", type: 'bull', explanation: "Removes global uncertainty, normalizes supply chains, brings down commodity prices, and triggers a massive relief rally." },

  // --- NICHE & MARKET MICROSTRUCTURE ---
  { text: "India VIX (Volatility Index) spikes above 25.", type: 'bear', explanation: "The 'Fear Gauge' spiking indicates high market panic and uncertainty, usually correlating with sharp market sell-offs." },
  { text: "SEBI tightens disclosure norms for FPIs originating from tax havens.", type: 'bear', explanation: "Triggers fears of tax notices, causing opaque foreign funds to hurriedly liquidate their Indian holdings." },
  { text: "A famous short-seller publishes a scathing report on a top Indian conglomerate.", type: 'bear', explanation: "Destroys investor trust, causing a massive crash in the targeted group's stocks which drags down the broader index." },
  { text: "The Nifty 50 index undergoes a major rebalancing, adding high-growth tech stocks.", type: 'bull', explanation: "Forces passive index funds to buy billions of dollars of the newly added stocks, pushing up overall index valuations." },
  { text: "Algorithmic trading glitch causes a 5% 'Flash Crash' in 10 minutes.", type: 'bear', explanation: "Destroys retail confidence and forces SEBI to halt trading, though markets often recover shortly after." }
];
