import { IPost } from "@/types/index";
import { getPosts } from "./actions/post";
import AddPost from "@/components/post/AddPost";

export default async function Post() {
  const posts: IPost = await getPosts();

  return (
    <div>
      Post Page
      <AddPost />
      {JSON.stringify(posts)}
    </div>
  );
}
