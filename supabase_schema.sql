-- Run this in your Supabase SQL Editor to create the table structure

CREATE TABLE IF NOT EXISTS public.news_articles (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    source TEXT NOT NULL,
    url TEXT NOT NULL UNIQUE, -- IMPORTANT: Unique constraint prevents duplicate URLs
    summary TEXT,
    sentiment TEXT CHECK (sentiment IN ('Positive', 'Negative', 'Neutral')),
    category TEXT CHECK (category IN ('Markets', 'Economy', 'AI Updates', 'Global')),
    image_url TEXT,
    tickers TEXT[],
    published_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

-- Index the published_at column for faster sorting/fetching of recent news
CREATE INDEX IF NOT EXISTS news_articles_published_at_idx ON public.news_articles (published_at DESC);

-- Index the category column for faster filtering
CREATE INDEX IF NOT EXISTS news_articles_category_idx ON public.news_articles (category);
