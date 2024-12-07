import { supabase } from '../../../../utils/supabase';

// Fetch all log entries
export async function GET(req) {
  const { data, error } = await supabase.from('logentries').select('*');
  if (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
  return new Response(JSON.stringify({ data }), { status: 200 });
}

// Create a new log entry
export async function POST(req) {
  const body = await req.json();
  const { data, error } = await supabase.from('logentries').insert([body]);
  if (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
  return new Response(JSON.stringify({ data }), { status: 201 });
}