interface UserAttributes {
  user_id: number;
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  mobile: string;
  role_id: number;
  role_name?: string;
  avatar?: object;
  active?: boolean;
  access_token?: string;
  email_verified?: boolean;
  created_at?: Date;
  updated_at?: Date;
  expireIn?: number;
}

interface FormState<T> {
  data?: T | null;
  errors?: Record<string, string[]>;
  status?: "idle" | "loading" | "error" | "success" | string;
  message: string;
}
