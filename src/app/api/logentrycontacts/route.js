import { supabase } from '../../../../../utils/supabase';

// Fetch a specific logentry-contact relationship
export async function GET(req, context) {
  const { params } = context;
  if (!params.ID) {
    return new Response(JSON.stringify({ error: 'Invalid request: Missing logtime or contactnumber' }), { status: 400 });
  }

  const [logtime, contactnumber] = params.ID.split('_');
  if (!logtime || contactnumber === undefined) {
    return new Response(
      JSON.stringify({ error: 'Invalid ID format. Expected logtime_contactnumber.' }),
      { status: 400 }
    );
  }

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

  return new Response(JSON.stringify({ data: data[0] }), { status: 200 });
}