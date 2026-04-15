"use client";

import { useMemo } from "react";
import { NewsArticle } from "@/types";

interface SourceStatsProps {
  articles: NewsArticle[];
}

export default function SourceStats({ articles }: SourceStatsProps) {
  const stats = useMemo(() => {
    const counts: Record<string, number> = {};
    articles.forEach((a) => {
      counts[a.source] = (counts[a.source] || 0) + 1;
    });

    return Object.entries(counts)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 5); // Top 5 sources
  }, [articles]);

  if (articles.length === 0) return null;

  return (
    <div className="bg-card border border-border rounded-3xl p-6">
      <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-muted mb-6">
        Source Intelligence
      </h4>
      <div className="space-y-4">
        {stats.map(([source, count]) => {
          const percentage = (count / articles.length) * 100;
          return (
            <div key={source} className="group cursor-default">
              <div className="flex items-center justify-between text-xs font-bold mb-2">
                <span className="text-foreground/80 group-hover:text-accent transition-colors">
                  {source}
                </span>
                <span className="text-muted">{count} pts</span>
              </div>
              <div className="h-1 w-full bg-zinc-900 rounded-full overflow-hidden">
                <div
                  className="h-full bg-accent rounded-full transition-all duration-1000"
                  style={{ width: `${percentage}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
      <div className="mt-6 pt-6 border-t border-border/50">
        <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-widest text-muted/60">
          <span>Total Intelligence</span>
          <span className="text-accent">{articles.length} Units</span>
        </div>
      </div>
    </div>
  );
}
