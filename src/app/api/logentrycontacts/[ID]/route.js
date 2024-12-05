import { supabase } from '../../../../../utils/supabase';

// Fetch a specific log entry-contact relationship
export async function GET(req, { params }) {
  const { data, error } = await supabase.from('logentrycontacts').select('*').eq('id', params.id).single();
  if (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
  return new Response(JSON.stringify({ data }), { status: 200 });
}

// Update a specific log entry-contact relationship
export async function PUT(req, { params }) {
  const body = await req.json();
  const { data, error } = await supabase.from('logentrycontacts').update(body).eq('id', params.id);
  if (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
  return new Response(JSON.stringify({ data }), { status: 200 });
}

// Delete a specific log entry-contact relationship
export async function DELETE(req, { params }) {
  const { data, error } = await supabase.from('logentrycontacts').delete().eq('id', params.id);
  if (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
  return new Response(JSON.stringify({ message: 'Log entry-contact relationship deleted successfully' }), { status: 200 });
}