declare module 'express-session' {
  interface SessionData {
    jwt: string;
    redirectUri: string | undefined;
  }
}
