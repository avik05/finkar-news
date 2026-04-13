import { fetchAndProcessFeeds } from '../lib/rss';
import { supabase } from '../utils/supabase';

async function seed() {
  console.log("Fetching RSS feeds...");
  try {
    const newArticles = await fetchAndProcessFeeds();
    console.log(`Fetched ${newArticles.length} articles`);
    
    if (newArticles.length > 0) {
      // Cleanup older than 7 days
      const sevenDaysAgo = new Date();
      sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
      await supabase.from('news_articles').delete().lt('published_at', sevenDaysAgo.toISOString());

      const { data, error } = await supabase
        .from('news_articles')
        .upsert(newArticles, { onConflict: 'url', ignoreDuplicates: true });
      if (error) {
        console.log("Supabase insert error:", error);
      } else {
        console.log("Database cleaned and synced with latest news!");
      }
    } else {
      console.log("No articles found");
    }
  } catch (err) {
    console.error("Error during seed:", err);
  }
}

seed();
