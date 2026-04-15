"use client";

import { Badge } from "lucide-react";

interface TickerLinkProps {
  ticker: string;
}

export default function TickerLink({ ticker }: TickerLinkProps) {
  // Determine if it's likely an Indian ticker (NSE/BSE) or Global
  // For this app, we'll assume Google Finance handles both well
  const financeUrl = `https://www.google.com/finance/quote/${ticker}`;

  return (
    <a
      href={financeUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-zinc-800 border border-zinc-700 hover:border-accent text-[10px] font-black text-zinc-300 hover:text-accent transition-all uppercase tracking-tighter"
      onClick={(e) => e.stopPropagation()} // Prevent card click
    >
      <span className="text-accent/50">$</span>
      {ticker}
    </a>
  );
}
