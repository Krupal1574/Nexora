import { google } from "googleapis";

export const getGoogleOAuth2Client = () => {
  return new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    `${process.env.NEXT_PUBLIC_APP_URL || process.env.NEXTAUTH_URL}/api/integrations/google/callback`
  );
};

export const getAuthUrl = (scopeType: 'workspace' | 'calendar') => {
  const oauth2Client = getGoogleOAuth2Client();
  const scopes = scopeType === 'workspace' 
    ? ['https://www.googleapis.com/auth/drive.file', 'https://www.googleapis.com/auth/spreadsheets', 'https://www.googleapis.com/auth/documents']
    : ['https://www.googleapis.com/auth/calendar.events'];

  return oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: scopes,
    state: scopeType,
    prompt: 'consent', // Force to get refresh token
  });
};
