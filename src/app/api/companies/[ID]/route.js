import { supabase } from '../../../../../utils/supabase';

export async function GET(req, { params }) {
  console.log('Params:', params); // Debug log to ensure params.ID is being passed

  if (!params.ID) {
    return new Response(JSON.stringify({ error: 'Company ID is required' }), { status: 400 });
  }

  const { data, error } = await supabase
    .from('companies')
    .select('*')
    .eq('companynumber', params.ID) // Use params.ID to match your folder naming
    .single();

  if (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
  return new Response(JSON.stringify({ data }), { status: 200 });
}

export async function PUT(req, { params }) {
  const body = await req.json();
  if (!params.ID) {
    return new Response(JSON.stringify({ error: 'Company ID is required' }), { status: 400 });
  }

  const { data, error } = await supabase
    .from('companies')
    .update(body)
    .eq('companynumber', params.ID); // Use params.ID here as well

  if (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
  return new Response(JSON.stringify({ data }), { status: 200 });
}

export async function DELETE(req, { params }) {
  if (!params.ID) {
    return new Response(JSON.stringify({ error: 'Company ID is required' }), { status: 400 });
  }

  const { data, error } = await supabase
    .from('companies')
    .delete()
    .eq('companynumber', params.ID); // Use params.ID here as well

  if (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
  return new Response(JSON.stringify({ message: 'Company deleted successfully' }), { status: 200 });
}