import { createClient } from "@supabase/supabase-js";

// Ensure these environment variables are set in your local .env.local and Vercel project
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://placeholder.supabase.co";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "placeholder";

if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
  console.warn("⚠️ Supabase credentials missing. Using placeholders for build stability. Ensure variables are set in Vercel.");
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
