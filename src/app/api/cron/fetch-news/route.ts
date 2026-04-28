import { NextResponse } from 'next/server';
import { supabase } from '@/utils/supabase';
import { fetchAndProcessFeeds } from '@/lib/rss';

export const maxDuration = 60; // Allow Vercel Edge/Serverless function up to 60s
export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const urlSecret = searchParams.get('secret');
  const authHeader = request.headers.get('authorization');

  const isAuthorized = 
    (process.env.CRON_SECRET && authHeader === `Bearer ${process.env.CRON_SECRET}`) ||
    (process.env.CRON_SECRET && urlSecret === process.env.CRON_SECRET);

  if (!isAuthorized) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    console.log("Starting cron job: Fetching News...");

    const newArticles = await fetchAndProcessFeeds();
    
    if (newArticles.length === 0) {
      return NextResponse.json({ success: true, message: "No articles fetched." });
    }

    // 1. Retention Policy: Cleanup news older than 7 days
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    
    const { error: deleteError } = await supabase
      .from('news_articles')
      .delete()
      .lt('published_at', sevenDaysAgo.toISOString());

    if (deleteError) {
      console.warn("Cleanup error (non-fatal):", deleteError);
    }

    // 2. Fetch/Upsert Logic: Upsert into Supabase
    const { data, error } = await supabase
      .from('news_articles')
      .upsert(newArticles, { onConflict: 'url', ignoreDuplicates: true });

    if (error) {
      console.error("Supabase bulk insert error:", error);
      return NextResponse.json({ error: 'Database Error', details: error }, { status: 500 });
    }
    // 3. Automated Time-Specific Push Notifications (Max 4/day)
    const now = new Date();
    const istOffset = 5.5 * 60 * 60 * 1000;
    const istTime = new Date(now.getTime() + istOffset);
    const hour = istTime.getUTCHours();
    const minutes = istTime.getUTCMinutes();
    
    if (minutes >= 0 && minutes < 15) {
      let notificationTitle = "";
      
      if (hour === 8) {
        notificationTitle = "☕ Morning Briefing";
      } else if (hour === 12) {
        notificationTitle = "📈 Midday Pulse";
      } else if (hour === 16) {
        notificationTitle = "📊 Evening Wrap";
      } else if (hour === 20) {
        notificationTitle = "🌙 Night Headlines";
      }
      
      if (notificationTitle && process.env.ONESIGNAL_REST_API_KEY) {
        const { data: latestArticle } = await supabase
          .from('news_articles')
          .select('title')
          .order('published_at', { ascending: false })
          .limit(1)
          .single();
          
        const notificationMessage = latestArticle ? latestArticle.title : "Tap to review critical market updates.";

        try {
          await fetch('https://onesignal.com/api/v1/notifications', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json; charset=utf-8',
              'Authorization': `Basic ${process.env.ONESIGNAL_REST_API_KEY}`
            },
            body: JSON.stringify({
              app_id: "7be09da1-280a-4252-88f8-41181b32c387",
              included_segments: ["All"],
              headings: { "en": notificationTitle },
              contents: { "en": notificationMessage },
              url: "https://finkarnews.vercel.app/briefs"
            })
          });
          console.log(`Push notification triggered: ${notificationTitle}`);
        } catch (pushError) {
          console.error("Push notification delivery failed:", pushError);
        }
      }
    }
    return NextResponse.json({
      success: true,
      message: `News fetch executed successfully. Cleanup complete. Processed batch of ${newArticles.length} items.`
    });
  } catch (error) {
    console.error("Cron Job Error:", error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

