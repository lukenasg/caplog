import { supabase } from '../../../../utils/supabase';

// Fetch all contacts or by partial name
export async function GET(req) {
  const { query } = req.query || {}; // Query for partial name matches

  const { data, error } = await supabase
    .from('contacts')
    .select('*')
    .ilike('fname', `%${query}%`); // Partial match on first name

  if (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
  return new Response(JSON.stringify({ data }), { status: 200 });
}

// Create a new contact
export async function POST(req) {
  const body = await req.json();
  const { data, error } = await supabase.from('contacts').insert([body]);

  if (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
  return new Response(JSON.stringify({ data }), { status: 201 });
}