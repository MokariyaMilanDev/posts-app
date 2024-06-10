import { useState } from "react";
import { useLoaderData } from "react-router-dom";
import icon from "../../../assets/img/auth__bg.jpg";

function Posts() {
  const postsData = useLoaderData();
  const [posts, setPosts] = useState(postsData.data.posts || undefined);

  return (
    <div className="p-4">
      <div className="grid gap-4">
        <div className="--grid-templete-columns grid gap-4 items-center">
          {posts !== undefined ? (
            posts.map((post, index) => {
              return (
                <div
                  className="w-full grid justify-center gap-2 p-2 border"
                  key={index}>
                  <div className="size-32">
                    <img
                      className="size-full object-cover rounded"
                      src={icon}
                      alt=""
                    />
                  </div>
                  <div className="w-full">
                    <div className="flex justify-between items-center">
                      <h1 className="font-bold">{post.title}</h1>
                      <span>{post.auther}</span>
                    </div>
                  </div>
                  {/* <div>
                    <img src="" alt="" />
                    <p>{post.liked}</p>
                  </div> */}
                </div>
              );
            })
          ) : (
            <div>No data</div>
          )}
        </div>
      </div>
    </div>
  );
}

Posts.loader = async ({ params }) => {
  const res = await fetch(`http://localhost:8000/in/${params.username}/posts`, {
    method: "post",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    credentials: "include",
  })
    .then((response) => response.json())
    .then((body) => body);

  return res;
};

export default Posts;
