"use server";

import { revalidatePath } from "next/cache";

interface State {
  message: string;
  [key: string]: string;
}

/**
 * Fetch all posts
 * @returns
 */
export async function getPosts() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/post`);

  if (!res.ok) throw new Error("Post data fetch failed!");

  const data = await res.json();
  return data;
}

/**
 * Create new post
 * @param prevState
 * @param formData
 * @returns
 */
export async function createPost(prevState: State, formData: FormData) {
  let state = prevState;

  const body = {
    content: formData.get("content"),
    user: formData.get("user"),
  };

  await new Promise((resolve) => setTimeout(resolve, 5000));
  try {
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/post`, {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    if (error instanceof Error)
      state = {
        message: error.message,
      };
  }

  revalidatePath("/post");
  return state;
}
