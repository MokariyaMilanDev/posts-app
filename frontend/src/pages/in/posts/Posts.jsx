import { useState } from "react";
import { Link, useLoaderData, useOutletContext } from "react-router-dom";
import icon from "../../../assets/img/auth__bg.jpg";

function Posts() {
  const {username} = useOutletContext();
  const postsData = useLoaderData();
  const [posts, setPosts] = useState(postsData.data.posts || undefined);

  return (
    <div className="mt-4">
      <div className="grid gap-4">
        <div className="--grid-templete-columns grid gap-4 items-center">
          {posts !== undefined && posts[0] ? (
            posts.map((post, index) => {
              return (
                <Link to={`/in/${username}/posts/${post._id}`} className="w-full grid gap-3 rounded border hover:bg-zinc-100 " key={index}>
                  <div className="">
                    <img
                      className="w-full aspect-square object-cover rounded"
                      src={icon}
                      alt=""
                    />
                  </div>
                  <div className="w-fit px-2">
                    <div className="">
                      <h1 className="font-bold">{post.title}</h1>
                      <p>
                        <span>1h</span>
                      </p>
                    </div>
                  </div>
                  <div className="px-2 pb-2 flex gap-6 items-center justify-between">
                    {/* likes */}
                    <div className="flex gap-1">
                      <svg
                        viewBox="0 -960 960 960"
                        width="20px"
                        fill="#707070">
                        <path d="M720-120H280v-520l280-280 50 50q7 7 11.5 19t4.5 23v14l-44 174h258q32 0 56 24t24 56v80q0 7-2 15t-4 15L794-168q-9 20-30 34t-44 14Zm-360-80h360l120-280v-80H480l54-220-174 174v406Zm0-406v406-406Zm-80-34v80H160v360h120v80H80v-520h200Z" />
                      </svg>
                      <p>{20}</p>
                    </div>
                    {/* comments */}
                    <div className="flex gap-1">
                      <svg viewBox="0 -960 960 960" width="24px" fill="black">
                        <path d="M240-400h480v-80H240v80Zm0-120h480v-80H240v80Zm0-120h480v-80H240v80ZM880-80 720-240H160q-33 0-56.5-23.5T80-320v-480q0-33 23.5-56.5T160-880h640q33 0 56.5 23.5T880-800v720ZM160-320h594l46 45v-525H160v480Zm0 0v-480 480Z" />
                      </svg>
                      <p>{30}</p>
                    </div>
                    {/* share */}
                    <div className="">
                      <svg viewBox="0 -960 960 960" width="24px" fill="black">
                        <path d="M720-80q-50 0-85-35t-35-85q0-7 1-14.5t3-13.5L322-392q-17 15-38 23.5t-44 8.5q-50 0-85-35t-35-85q0-50 35-85t85-35q23 0 44 8.5t38 23.5l282-164q-2-6-3-13.5t-1-14.5q0-50 35-85t85-35q50 0 85 35t35 85q0 50-35 85t-85 35q-23 0-44-8.5T638-672L356-508q2 6 3 13.5t1 14.5q0 7-1 14.5t-3 13.5l282 164q17-15 38-23.5t44-8.5q50 0 85 35t35 85q0 50-35 85t-85 35Zm0-640q17 0 28.5-11.5T760-760q0-17-11.5-28.5T720-800q-17 0-28.5 11.5T680-760q0 17 11.5 28.5T720-720ZM240-440q17 0 28.5-11.5T280-480q0-17-11.5-28.5T240-520q-17 0-28.5 11.5T200-480q0 17 11.5 28.5T240-440Zm480 280q17 0 28.5-11.5T760-200q0-17-11.5-28.5T720-240q-17 0-28.5 11.5T680-200q0 17 11.5 28.5T720-160Zm0-600ZM240-480Zm480 280Z" />
                      </svg>
                    </div>
                    {/* other */}
                    <div className="">
                      <svg
                        viewBox="0 -960 960 960"
                        width="24px"
                        fill="black">
                        <path d="M480-160q-33 0-56.5-23.5T400-240q0-33 23.5-56.5T480-320q33 0 56.5 23.5T560-240q0 33-23.5 56.5T480-160Zm0-240q-33 0-56.5-23.5T400-480q0-33 23.5-56.5T480-560q33 0 56.5 23.5T560-480q0 33-23.5 56.5T480-400Zm0-240q-33 0-56.5-23.5T400-720q0-33 23.5-56.5T480-800q33 0 56.5 23.5T560-720q0 33-23.5 56.5T480-640Z" />
                      </svg>
                    </div>
                  </div>
                </Link>
              );
            })
          ) : (
            <div className="h-screen flex justify-center items-center">
              <h1 className="font-semibold text-xl">No posts available</h1>
            </div>
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
