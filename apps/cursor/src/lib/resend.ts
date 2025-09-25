import { Resend } from "resend";

// Mock pour le développement local
const isDevelopment = process.env.NODE_ENV === 'development' || 
  !process.env.RESEND_API_KEY ||
  process.env.RESEND_API_KEY === "";

const mockResend = {
  emails: {
    send: async (data: any) => {
      console.log(`[DEV] Email simulé envoyé:`, data);
      return { data: { id: 'mock-email-id' }, error: null };
    },
  },
};

export const resend = isDevelopment ? mockResend as any : new Resend(process.env.RESEND_API_KEY);
