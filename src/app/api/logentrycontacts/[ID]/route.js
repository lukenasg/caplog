import { supabase } from '../../../../../utils/supabase';

// Fetch a specific log entry-contact relationship by logtime and contactnumber
export async function GET(req, context) {
  const { params } = context;

  if (!params.ID) {
    return new Response(JSON.stringify({ error: 'Logtime and contactnumber are required' }), { status: 400 });
  }

  // Split the composite ID (format: logtime_contactnumber)
  const [logtime, contactnumber] = params.ID.split('_');

  if (!logtime || contactnumber === undefined) {
    return new Response(
      JSON.stringify({ error: 'Invalid ID format. Expected logtime_contactnumber.' }),
      { status: 400 }
    );
  }

  // Handle null contactnumber
  const contactnumberQuery = contactnumber === 'null' ? null : parseInt(contactnumber, 10);

  const { data, error, count } = await supabase
    .from('logentrycontacts')
    .select('*', { count: 'exact' })
    .eq('logtime', logtime)
    .eq('contactnumber', contactnumberQuery);

  if (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }

  if (count === 0) {
    return new Response(JSON.stringify({ error: 'No rows found for the given logtime and contactnumber' }), {
      status: 404,
    });
  }

  if (count > 1) {
    return new Response(
      JSON.stringify({ error: 'Multiple rows found for the given logtime and contactnumber' }),
      { status: 400 }
    );
  }

  return new Response(JSON.stringify({ data: data[0] }), { status: 200 });
}