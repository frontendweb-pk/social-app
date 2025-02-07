"use client";

import Form from "next/form";
import Input from "../ui/input";
import SubmitButton from "@/components/ui/submit-button";
import ErrorMessages from "@/components/ui/error";
import { useActionState } from "react";
import { login } from "@/lib/actions/auth";

export default function LoginForm() {
  const [state, formAction] = useActionState(login, {
    message: "",
    status: "idle",
  });
  return (
    <>
      <Form action={formAction} noValidate className="space-y-4">
        <Input
          error={state.errors?.email}
          dark
          type="email"
          name="email"
          placeholder="Email"
        />
        <Input
          error={state.errors?.password}
          dark
          type="password"
          name="password"
          placeholder="Password"
        />
        <SubmitButton dark fullWidth type="submit">
          Login
        </SubmitButton>
      </Form>

      <ErrorMessages errors={state.errors} />
    </>
  );
}
