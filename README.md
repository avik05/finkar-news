# 🗞️ Finkar News

Finkar News is a production-ready, fully automated financial news aggregator. It fetchs, processes, and categorizes financial intelligence from the leading Indian and Global news sources in real-time.

## 🚀 Features

- **Autonomous Pipeline**: Hourly automated fetching from 6+ major RSS streams (Mint, ET, CNBC, etc.).
- **Intelligent Processing**: Automatic sentiment analysis and category classification (Markets, Economy, Companies, Global).
- **Premium UI**: Ultra-clean, mobile-first dark theme built with Tailwind CSS v4 and Framer Motion.
- **Smart Deduplication**: Multi-layer deduplication using URL uniqueness and title normalization.
- **Supabase Integration**: Robust PostgreSQL storage with optimized indexes for high-speed news retrieval.

## 🛠️ Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Database**: Supabase (PostgreSQL)
- **Styling**: Tailwind CSS v4
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **RSS Parsing**: rss-parser

## 📦 Deployment Guide

### 1. Supabase Setup
1. Create a project at [supabase.com](https://supabase.com).
2. Run the SQL schema in the `supabase_schema.sql` file in your Supabase SQL Editor.
3. Obtain your `Project URL` and `Anon Key`.

### 2. Deployment to Vercel
1. Push this code to a GitHub repository.
2. Connect the repository to [Vercel](https://vercel.com).
3. Add the following Environment Variables in the Vercel Dashboard:
   - `NEXT_PUBLIC_SUPABASE_URL`: Your Supabase Project URL.
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Your Supabase Anon Key.
   - `CRON_SECRET`: A secure random string used to protect your cron endpoint.

### 3. Automation (Vercel Cron)
The project includes a `vercel.json` and an API route at `/api/cron/fetch-news`. Once deployed, Vercel will automatically trigger this route every hour to sync the latest financial news.

## 💻 Local Development

```bash
# Install dependencies
npm install

# Run the dev server
npm run dev

# Manually trigger a news fetch (Local)
# Create a .env.local with your credentials first
npx tsx src/scripts/seed.ts
```

## 🎯 Project Goals

- **Clean Architecture**: Decoupled parsing logic from UI.
- **Scalability**: Designed to handle thousands of articles with ease.
- **Premium Feel**: Designed to behave like a top-tier financial cockpit.
