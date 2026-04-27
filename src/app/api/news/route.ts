import { NextResponse } from 'next/server';
import { supabase } from '@/utils/supabase';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const source = searchParams.get('source');

  try {
    let query = supabase
      .from('news_articles')
      .select('*')
      .order('published_at', { ascending: false });

    if (source) {
      query = query.eq('source', source);
    }

    const { data, error } = await query.limit(100);

    if (error) throw error;

    return NextResponse.json(data);
  } catch (error) {
    console.error('API news error:', error);
    return NextResponse.json({ error: 'Failed to fetch news' }, { status: 500 });
  }
}
