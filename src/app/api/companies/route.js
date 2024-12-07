import { supabase } from '../../../../utils/supabase';

// Fetch all companies
export async function GET(req) {
  const { data, error } = await supabase
    .from('companies')
    .select('*'); // Fetch all columns

  if (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }

  return new Response(JSON.stringify({ data }), { status: 200 });
}

// Add a new company
export async function POST(req) {
  const body = await req.json();

  const { data, error } = await supabase
    .from('companies')
    .insert([
      {
        companynumber: body.companynumber, // Ensure you send this in the request body
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