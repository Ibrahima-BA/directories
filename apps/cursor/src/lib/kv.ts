// FORCER LE MODE OFFLINE - Désactiver complètement Redis
const mockRedis = {
  sadd: async () => 1,
  incr: async () => 1,
  get: async () => null,
  set: async () => 'OK',
  del: async () => 1,
  exists: async () => 0,
  expire: async () => 1,
  ttl: async () => -1,
  keys: async () => [],
  flushall: async () => 'OK',
};

// TOUJOURS utiliser le mock en développement
export const redis = mockRedis as any;
