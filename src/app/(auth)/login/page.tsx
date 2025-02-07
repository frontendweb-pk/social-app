"use client";
import { login } from "@/lib/actions/auth";
import Form from "next/form";
import { useActionState } from "react";
import { BanIcon } from "lucide-react";

export default function Page() {
  const [state, formAction, isPending] = useActionState(login, {
    message: "",
    status: "idle",
  });

  return (
    <div>
      <h1>Login</h1>
      {JSON.stringify(state)}
      <Form action={formAction}>
        <input type="email" name="email" placeholder="Email" />
        <input type="password" name="password" placeholder="Password" />
        <button type="submit">Login</button>

        {state.errors && (
          <div className="bg-red-50 border-red-100 border text-red-900 p-2 mt-2">
            <h6 className="text-sm font-semibold flex items-center gap-2 mb-3">
              <BanIcon size={20} /> Error Type:{" "}
              <small className="font-normal">{state.message}</small>
            </h6>

            <div className="text-sm">eamil: {state.errors?.email}</div>
            <div className="text-sm">password: {state.errors?.password}</div>
          </div>
        )}
      </Form>
    </div>
  );
}
