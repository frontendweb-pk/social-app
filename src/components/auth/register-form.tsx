"use client";

import { signup } from "@/lib/actions/auth";
import Form from "next/form";
import { useActionState, useEffect } from "react";
import Input from "../ui/input";

import SubmitButton from "../ui/submit-button";
import ErrorMessages from "../ui/error";
import { toast } from "react-toastify";

export default function RegisterForm() {
  const [state, formAction, isPending] = useActionState(signup, {
    message: "",
    status: "idle",
  });

  useEffect(() => {
    if (state.status === "success") {
      toast.success("User registered successfully");
    }

    if (state.status === "error") {
      toast.error(state.message);
    }
  }, [state]);

  console.log(state, "state");

  return (
    <>
      {isPending && (
        <div className="text-white p--2 rounded-md mb-4">
          Wait registering...
        </div>
      )}
      <Form action={formAction} noValidate className="space-y-4">
        <div className="grid grid-cols-2 gap-2">
          <Input
            error={state.errors?.first_name}
            dark
            type="text"
            name="first_name"
            placeholder="First name"
          />
          <Input
            error={state.errors?.last_name}
            dark
            type="text"
            name="last_name"
            placeholder="Last name"
          />
        </div>
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
        <Input
          error={state.errors?.mobile}
          dark
          type="text"
          name="mobile"
          placeholder="Mobile"
        />
        <SubmitButton
          dark
          type="submit"
          className="px-7 py-2 uppercase bg-white w-full text-indigo-900 text-md font-bold rounded-md"
        >
          Register
        </SubmitButton>
      </Form>
      <ErrorMessages errors={state.errors} />
    </>
  );
}
