// FORCER LE MODE OFFLINE - Toujours en mode offline en développement
export const isOfflineMode = true;

export const config = {
  offline: isOfflineMode,
  supabase: {
    enabled: !isOfflineMode,
  },
  redis: {
    enabled: !isOfflineMode,
  },
  email: {
    enabled: !isOfflineMode,
  },
  luma: {
    enabled: !isOfflineMode,
  },
};

// Messages pour le mode offline
export const offlineMessages = {
  banner: "Mode développement - Données statiques",
  rules: "Règles de démonstration",
  jobs: "Emplois de démonstration", 
  mcp: "MCPs de démonstration",
  events: "Événements de démonstration",
};
