declare namespace NodeJS {
  interface ProcessEnv {
    MONGODB_URI: string;
    SECRET_TOKEN: string;
  }
}

interface Media {
  public_id: string;
  url: string;
  resource_type?: string;
  access_mode?: string;
  folder?: string;
  version?: string;
  signature: string;
}
