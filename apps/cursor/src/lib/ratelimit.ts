// FORCER LE MODE OFFLINE - Désactiver complètement Upstash
// Pas d'import de @upstash/ratelimit pour éviter les appels réseau

const mockRatelimit = {
  limit: async () => ({ success: true, limit: 10, remaining: 9, reset: Date.now() + 60000 }),
};

// TOUJOURS utiliser le mock - pas d'appels réseau
export const generateRuleRatelimit = mockRatelimit as any;
export const createPostRatelimit = mockRatelimit as any;
