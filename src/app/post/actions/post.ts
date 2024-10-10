"use server";

/**
 * Fetch all posts
 * @returns
 */
export async function getPosts() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/post`);

  if (res.status !== 200) throw new Error("Fetch error!");
  const data = await res.json();

  console.log("data-aaa", data);

  return data;
}
