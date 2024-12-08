import { supabase } from '../../../../utils/supabase';

// Fetch all log entries with optional filters
export async function GET(req) {
  const { followuprequired, sort } = req.query || {};

  const { data, error } = await supabase
    .from('logentries')
    .select('*')
    .eq('followuprequired', followuprequired || null) // Optional filter
    .order('logtime', { ascending: sort !== 'desc' }); // Sort by logtime

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

// Update a specific log entry
export async function PATCH(req, { params }) {
  const body = await req.json();
  const { data, error } = await supabase
    .from('logentries')
    .update(body)
    .eq('logtime', params.ID);

  if (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
  return new Response(JSON.stringify({ data }), { status: 200 });
}