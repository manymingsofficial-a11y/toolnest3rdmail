import { createClient, SupabaseClient } from '@supabase/supabase-js';

let supabaseServerInstance: SupabaseClient | null = null;
let initError: Error | null = null;

function createRealClient(): SupabaseClient {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error(
      'Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY environment variables. ' +
      'Please configure them in your environment to use Supabase.'
    );
  }

  return createClient(supabaseUrl, supabaseAnonKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}

function getSupabaseServerClient(): SupabaseClient {
  if (initError) {
    throw initError;
  }

  if (supabaseServerInstance) {
    return supabaseServerInstance;
  }

  try {
    supabaseServerInstance = createRealClient();
  } catch (error) {
    initError = error as Error;
    throw initError;
  }

  return supabaseServerInstance;
}

/**
 * Lazy-initialized Supabase server client.
 * The real client is created only when first accessed via any method/property.
 * Missing environment variables produce a clear configuration error at first use.
 */
export const supabaseServer = new Proxy({} as SupabaseClient, {
  get(_target, prop, receiver) {
    const client = getSupabaseServerClient();
    const value = Reflect.get(client, prop, receiver);
    if (typeof value === 'function') {
      return value.bind(client);
    }
    return value;
  },
});