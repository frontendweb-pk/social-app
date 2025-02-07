interface FormState<T> {
  data?: T | null;
  errors?: Record<string, string[]>;
  status?: "idle" | "loading" | "error" | "success" | string;
  message: string;
}
