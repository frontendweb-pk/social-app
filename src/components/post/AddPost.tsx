"use client";

import Form from "../ui/Form";
import Input from "../ui/Input";
import FormButton from "../ui/FormButton";
import { createPost } from "@/app/post/actions/post";
import { useFormState } from "react-dom";
import { AppContent } from "@/utils/content";
import { toast } from "react-toastify";

const initialState = {
  message: "",
};

/**
 * Add post component
 * @returns
 */
export default function AddPost() {
  const [state, formAction] = useFormState(createPost, initialState);

  if (state.message) {
    toast.success("Post added!");
  }

  return (
    <Form action={formAction}>
      {state && <p>{state.message}</p>}
      <Input
        hidden
        id="user"
        name="user"
        defaultValue="67065bd5d848a616006db973"
      />
      <Input placeholder="content" id="content" name="content" />
      <FormButton>{AppContent.addPost}</FormButton>
    </Form>
  );
}
