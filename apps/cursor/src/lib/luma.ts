// FORCER LE MODE OFFLINE - Désactiver Luma
const API_ENDPOINT = "https://api.lu.ma/public/v1";
const OFFLINE_MODE = true;

export interface Event {
  api_id: string;
  event: {
    api_id: string;
    calendar_api_id: string;
    created_at: string;
    cover_url: string;
    name: string;
    description: string;
    description_md: string;
    start_at: string;
    duration_interval: string;
    end_at: string;
    geo_address_json: any;
    geo_latitude: string;
    geo_longitude: string;
    url: string;
    timezone: string;
    user_api_id: string;
    visibility: string;
    meeting_url: string | null;
    zoom_meeting_url: string | null;
  };
  tags: string[];
}

export async function getEvents(): Promise<{ entries: Event[] }> {
  // FORCER LE MODE OFFLINE - Toujours utiliser le mock
  if (OFFLINE_MODE) {
    return {
      entries: [
        {
          api_id: "demo-event-1",
          event: {
            api_id: "demo-event-1",
            calendar_api_id: "demo-calendar",
            created_at: new Date().toISOString(),
            cover_url: "https://via.placeholder.com/400x200",
            name: "Événement de démonstration",
            description: "Un événement de démonstration pour le développement local",
            description_md: "Un événement de **démonstration** pour le développement local",
            start_at: new Date(Date.now() + 86400000).toISOString(), // Demain
            duration_interval: "PT2H",
            end_at: new Date(Date.now() + 86400000 + 7200000).toISOString(),
            geo_address_json: { address: "Paris, France" },
            geo_latitude: "48.8566",
            geo_longitude: "2.3522",
            url: "https://demo.luma.com/event",
            timezone: "Europe/Paris",
            user_api_id: "demo-user",
            visibility: "public",
            meeting_url: null,
            zoom_meeting_url: null,
          },
          tags: ["demo", "développement"],
        },
      ],
    };
  }

  const response = await fetch(
    `${API_ENDPOINT}/calendar/list-events?pagination_limit=100`,
    {
      method: "GET",
      headers: {
        "X-Luma-API-Key": process.env.LUMA_API_KEY || "",
      },
    },
  );

  return response.json();
}
