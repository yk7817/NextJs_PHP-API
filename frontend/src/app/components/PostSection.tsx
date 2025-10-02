"use client";
import { useState, useEffect } from "react";
import { LoginAuthProps } from "../types/common";
import { useAuth } from "./AuthContext";

const PostSection = () => {
  const { authState, user } = useAuth();

  // state
  const [post, setPost] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [userId, setUserId] = useState<number>();
  const [userName, setUserName] = useState<string>("");

  // useEffect
  useEffect(() => {
    if (user) {
      setUserId(user.id);
      setUserName(user.name);
    }
  }, [user]);

  // function
  const handlePostChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPost(e.target.value);
  };

  //submit
  const handlePostClick = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:8000/api/post.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ post, userId, userName }),
      });
      const data = await res.json();
      if (!res.ok) {
        console.log(data.error);
        setError(data.error);
      } else {
        console.log(data.success);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      {authState && user ? (
        <div className="post_wrap flex align-middle justify-center py-10">
          <div className="post_inner">
            <div className="post_title">
              <p className="text-gray-600">
                {user.name}さん、投稿してみましょう！
              </p>
            </div>
            {error && (
              <div className="post_error">
                <p className="text-red-500 text-sm">{error}</p>
              </div>
            )}
            <div className="post_form py-3">
              <form method="post">
                <input
                  type="text"
                  name="post"
                  value={post}
                  onChange={handlePostChange}
                  className="bg-white p-1 rounded-md"
                />
                <button
                  type="submit"
                  onClick={handlePostClick}
                  className="bg-blue-500 font-bold text-slate-200 ml-2 rounded-md px-5 py-1"
                >
                  Post
                </button>
              </form>
            </div>
          </div>
        </div>
      ) : (
        <div className="post flex justify-center items-center py-30">
          <div className="post_title">
            <h2>サインアップをして投稿</h2>
          </div>
        </div>
      )}
      <div className="h-2 w-2/3 m-auto rounded-2xl bg-blue-300"></div>
    </div>
  );
};

export default PostSection;
