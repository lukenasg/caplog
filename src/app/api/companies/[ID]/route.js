import { supabase } from '../../../../../utils/supabase';

// Fetch a specific company
export async function GET(req, { params }) {
  const { data, error } = await supabase.from('companies').select('*').eq('id', params.id).single();
  if (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
  return new Response(JSON.stringify({ data }), { status: 200 });
}

// Update a specific company
export async function PUT(req, { params }) {
  const body = await req.json();
  const { data, error } = await supabase.from('companies').update(body).eq('id', params.id);
  if (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
  return new Response(JSON.stringify({ data }), { status: 200 });
}

// Delete a specific company
export async function DELETE(req, { params }) {
  const { data, error } = await supabase.from('companies').delete().eq('id', params.id);
  if (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
  return new Response(JSON.stringify({ message: 'Company deleted successfully' }), { status: 200 });
}