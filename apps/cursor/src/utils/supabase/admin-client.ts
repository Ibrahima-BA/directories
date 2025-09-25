import { createServerClient } from "@supabase/ssr";

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

const mockSupabaseAdminClient = {
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

export async function createClient() {
  if (isDevelopment) {
    return mockSupabaseAdminClient as any;
  }

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    {
      cookies: {
        getAll() {
          return null;
        },
        setAll() {},
      },
    },
  );
}
