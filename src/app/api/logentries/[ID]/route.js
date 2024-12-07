import { supabase } from '../../../../../utils/supabase';

// Fetch a specific log entry by logtime
export async function GET(req, { params }) {
  if (!params.ID) {
    return new Response(JSON.stringify({ error: 'Log time is required' }), { status: 400 });
  }

  const { data, error } = await supabase
    .from('logentries')
    .select('*')
    .eq('logtime', params.ID) // Use logtime as the key
    .single();

  if (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }

  return new Response(JSON.stringify({ data }), { status: 200 });
}

// Update a specific log entry by logtime
export async function PUT(req, { params }) {
  const body = await req.json();
  if (!params.ID) {
    return new Response(JSON.stringify({ error: 'Log time is required' }), { status: 400 });
  }

  const { data, error } = await supabase
    .from('logentries')
    .update(body)
    .eq('logtime', params.ID); // Use logtime as the key

  if (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }

  return new Response(JSON.stringify({ data }), { status: 200 });
}

// Delete a specific log entry by logtime
export async function DELETE(req, { params }) {
  if (!params.ID) {
    return new Response(JSON.stringify({ error: 'Log time is required' }), { status: 400 });
  }

  const { data, error } = await supabase
    .from('logentries')
    .delete()
    .eq('logtime', params.ID); // Use logtime as the key

  if (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }

  return new Response(JSON.stringify({ message: 'Log entry deleted successfully' }), { status: 200 });
}