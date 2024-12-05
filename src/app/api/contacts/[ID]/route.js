import { supabase } from '../../../../../utils/supabase';

// Fetch a specific contact
export async function GET(req, { params }) {
  const { data, error } = await supabase.from('contacts').select('*').eq('id', params.id).single();
  if (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
  return new Response(JSON.stringify({ data }), { status: 200 });
}

// Update a specific contact
export async function PUT(req, { params }) {
  const body = await req.json();
  const { data, error } = await supabase.from('contacts').update(body).eq('id', params.id);
  if (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
  return new Response(JSON.stringify({ data }), { status: 200 });
}

// Delete a specific contact
export async function DELETE(req, { params }) {
  const { data, error } = await supabase.from('contacts').delete().eq('id', params.id);
  if (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
  return new Response(JSON.stringify({ message: 'Contact deleted successfully' }), { status: 200 });
}