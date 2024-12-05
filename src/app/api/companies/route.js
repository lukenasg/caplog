import { supabase } from '../../../../utils/supabase';

// Handle GET and POST requests
export async function GET(req) {
  const { data, error } = await supabase.from('companies').select('*');

  if (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }

  return new Response(JSON.stringify({ data }), { status: 200 });
}

export async function POST(req) {
  // Parse the incoming request body
  const body = await req.json();

  const { data, error } = await supabase.from('companies').insert([
    {
      companynumber: body.companynumber,
      companyname: body.companyname,
      city: body.city,
      state: body.state,
      country: body.country,
      postalcode: body.postalcode,
      phone: body.phone,
      is_active: body.is_active,
      status: body.status,
    },
  ]);

  if (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }

  return new Response(JSON.stringify({ data }), { status: 201 });
}