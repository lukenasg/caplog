import { supabase } from '../../../../utils/supabase';

// Fetch all log entries with optional filters and related data
export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const keywords = searchParams.get('keywords');
  const startDate = searchParams.get('startDate');
  const endDate = searchParams.get('endDate');
  const includeContacts = searchParams.get('includeContacts') === 'true';

  // Build the query
  let query = supabase.from('logentries').select('*');

  if (keywords) {
    query = query.or(
      `description.ilike.%${keywords}%,tags.cs.{${keywords}}`
    );
  }
  if (startDate && endDate) {
    query = query.gte('logtime', startDate).lte('logtime', endDate);
  } else if (startDate) {
    query = query.gte('logtime', startDate);
  } else if (endDate) {
    query = query.lte('logtime', endDate);
  }

  // Add related data for contacts
  if (includeContacts) {
    query = supabase
      .from('logentries')
      .select(`
        *,
        contacts:logentries_contactnumber_fkey (
          fname,
          lname,
          email
        )
      `);
  }

  const { data, error } = await query;
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