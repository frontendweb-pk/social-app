declare namespace NodeJS {
  interface ProcessEnv {
    MONGODB_URI: string;
    SECRET_TOKEN: string;
    NEXT_PUBLIC_API_URL: string;
  }
}
