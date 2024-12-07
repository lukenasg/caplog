import { supabase } from '../../../../../utils/supabase';

// Fetch a specific contact by contactnumber
export async function GET(req, { params }) {
  if (!params.ID) {
    return new Response(JSON.stringify({ error: 'Contact number is required' }), { status: 400 });
  }

  const { data, error } = await supabase
    .from('contacts')
    .select('*')
    .eq('contactnumber', params.ID) // Use contactnumber instead of id
    .single();

  if (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }

  return new Response(JSON.stringify({ data }), { status: 200 });
}

// Update a specific contact by contactnumber
export async function PUT(req, { params }) {
  const body = await req.json();
  if (!params.ID) {
    return new Response(JSON.stringify({ error: 'Contact number is required' }), { status: 400 });
  }

  const { data, error } = await supabase
    .from('contacts')
    .update(body)
    .eq('contactnumber', params.ID); // Use contactnumber instead of id

  if (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }

  return new Response(JSON.stringify({ data }), { status: 200 });
}

// Delete a specific contact by contactnumber
export async function DELETE(req, { params }) {
  if (!params.ID) {
    return new Response(JSON.stringify({ error: 'Contact number is required' }), { status: 400 });
  }

  const { data, error } = await supabase
    .from('contacts')
    .delete()
    .eq('contactnumber', params.ID); // Use contactnumber instead of id

  if (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }

  return new Response(JSON.stringify({ message: 'Contact deleted successfully' }), { status: 200 });
}