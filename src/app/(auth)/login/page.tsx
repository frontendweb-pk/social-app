import AuthTitle from "@/components/auth/auth-title";
import LoginForm from "@/components/auth/login-form";

export default function Page() {
  return (
    <>
      <AuthTitle
        title="Login"
        subtitle="If you have an account, please"
        href="/register"
        linkLabel="Register"
      />
      <LoginForm />
    </>
  );
}
