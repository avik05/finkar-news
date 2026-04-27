import { NextResponse } from 'next/server';
import { supabase } from '@/utils/supabase';

export async function GET() {
  try {
    const { data, error } = await supabase
      .from('news_articles')
      .select('*')
      .order('published_at', { ascending: false })
      .limit(100);

    if (error) throw error;

    return NextResponse.json(data);
  } catch (error) {
    console.error('API news error:', error);
    return NextResponse.json({ error: 'Failed to fetch news' }, { status: 500 });
  }
}
