import { google } from "googleapis";

/**
 * Factory for Google Classroom API clients.
 * Standardizes authentication and versioning.
 */
export class GoogleClassroomClientFactory {
  static create(accessToken: string) {
    const auth = new google.auth.OAuth2({
      clientId: process.env.GOOGLE_CLASSROOM_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLASSROOM_CLIENT_SECRET,
    });

    auth.setCredentials({ access_token: accessToken });

    return google.classroom({
      version: "v1",
      auth,
    });
  }
}

/**
 * Legacy wrapper for compatibility with existing use cases.
 */
export const getAuthenticatedClassroomClient = (accessToken: string) => {
  return GoogleClassroomClientFactory.create(accessToken);
};
