import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

// FORCER LE MODE OFFLINE - Toujours utiliser le mock
const isDevelopment = true;

// Créer un mock qui supporte le chaînage de méthodes
const createMockQuery = () => {
  const mockQuery = {
    data: [],
    error: null,
    eq: () => mockQuery,
    order: () => mockQuery,
    limit: () => mockQuery,
    range: () => mockQuery,
    textSearch: () => mockQuery,
    or: () => mockQuery,
    and: () => mockQuery,
    not: () => mockQuery,
    is: () => mockQuery,
    in: () => mockQuery,
    contains: () => mockQuery,
    containedBy: () => mockQuery,
    rangeGt: () => mockQuery,
    rangeGte: () => mockQuery,
    rangeLt: () => mockQuery,
    rangeLte: () => mockQuery,
    rangeAdjacent: () => mockQuery,
    overlaps: () => mockQuery,
    like: () => mockQuery,
    ilike: () => mockQuery,
    rpc: () => mockQuery,
    then: (resolve: any) => resolve({ data: [], error: null }),
  };
  return mockQuery;
};

const mockSupabaseServerClient = {
  auth: {
    getUser: async () => ({ data: { user: null }, error: null }),
    signInWithOAuth: async () => ({ data: null, error: null }),
    signOut: async () => ({ error: null }),
    getSession: async () => ({ data: { session: null }, error: null }),
    exchangeCodeForSession: async () => ({ data: null, error: null }),
  },
  from: (table: string) => ({
    select: (columns = "*") => createMockQuery(),
    insert: (data: any) => ({ data: null, error: null }),
    update: (data: any) => ({ data: null, error: null }),
    delete: () => ({ data: null, error: null }),
    upsert: (data: any) => ({ data: null, error: null }),
    ...createMockQuery(),
  }),
};

export async function createClient({
  admin = false,
}: { admin?: boolean } = {}) {
  if (isDevelopment) {
    return mockSupabaseServerClient as any;
  }

  const cookieStore = await cookies();

  const auth = admin
    ? {
        persistSession: false,
        autoRefreshToken: false,
        detectSessionInUrl: false,
      }
    : {};

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    admin
      ? process.env.SUPABASE_SERVICE_ROLE_KEY!
      : process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      auth,
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            for (const { name, value, options } of cookiesToSet) {
              cookieStore.set(name, value, options);
            }
          } catch {
            // The `setAll` method was called from a Server Component.
            // This can be ignored if you have middleware refreshing
            // user sessions.
          }
        },
      },
    },
  );
}
