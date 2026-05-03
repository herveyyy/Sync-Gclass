import "next-auth";

declare module "next-auth" {
  interface Session {
    access_token?: string;
    db_user_id?: string;
    is_onboarded?: boolean;
    google_id?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    access_token?: string;
    token_issued_at?: number;
    google_id?: string;
    db_user_id?: string;
    is_onboarded?: boolean;
  }
}
