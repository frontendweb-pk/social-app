"use server";

import { IPost } from "@/types/index";

/**
 * Fetch all posts
 * @returns
 */
export async function getPosts() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/post`);

  const data: IPost[] = await res.json();

  console.log("data-aaa", data);

  return data;
}
