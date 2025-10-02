import { useState, useEffect } from "react";
import { Posttype } from "../types/common";

const PostListSection = () => {
  // state
  const [posts, setPosts] = useState<Posttype[]>([]);
  // 投稿データ表示
  useEffect(() => {
    const postData = async () => {
      try {
        const res = await fetch("http://localhost:8000/api/posts_list.php");

        if (!res.ok) {
          console.log(posts);
        }

        const data = await res.json();
        console.log(data);
        setPosts(data);
      } catch (error) {
        console.error(error);
      }
    };
    postData();
  }, []);

  return (
    <div className="posts_wrap p-10">
      <div className="posts_inner w-full m-auto">
        <dl className="border-b-1 border-b-gray-500 py-3">
          {posts.map((post, index) => (
            <div key={index}>
              <dt className="text-xl">{post.user_name}</dt>
              <dd className="my-2">{post.post}</dd>
              <dd className="text-sm">{post.created_at}</dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
};

export default PostListSection;
