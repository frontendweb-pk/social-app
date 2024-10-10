import { IPost } from "@/types/index";
import { getPosts } from "./actions/post";

export const revalidate = 0;
export default async function Post() {
  const posts: IPost[] = await getPosts();
  console.log("POST", posts);
  return (
    <div>
      Post Page
      {JSON.stringify(posts)}
    </div>
  );
}
