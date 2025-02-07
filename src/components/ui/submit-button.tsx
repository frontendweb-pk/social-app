"use client";
import { Loader2 } from "lucide-react";
import Button, { ButtonProps } from "./button";
import { useFormStatus } from "react-dom";

export default function SubmitButton({ children, ...props }: ButtonProps) {
  const { pending } = useFormStatus();
  return (
    <Button {...props} disabled={pending}>
      {pending && <Loader2 />} {children}
    </Button>
  );
}
