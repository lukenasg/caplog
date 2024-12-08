import { supabase } from '../../../../utils/supabase';

// Fetch all follow-up logs
export async function GET(req) {
  const { data, error } = await supabase
    .from('logentries')
    .select('*')
    .eq('followuprequired', true)
    .order('followupdatetime', { ascending: true });

  if (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
  return new Response(JSON.stringify({ data }), { status: 200 });
}