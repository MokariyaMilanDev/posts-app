import { useState } from "react";
import { useLoaderData } from "react-router-dom";
import icon from "../../../assets/img/auth__bg.jpg";
import Navigator from "../../../components/Navigator";

function Post() {
  const loaderData = useLoaderData();
  const [post, setPost] = useState(loaderData.data.post || undefined);

  return (
    <div className="h-screen w-screeen p-4 flex justify-center items-center">
      <div className="rounded container min-w-[300px] max-w-[400px]">
        <Navigator />
        <div className="aspect-square">
          <img className="aspect-square object-cover" src={icon} alt="" />
        </div>
        <div className="w-fit">
          <div className="">
            <h1 className="font-bold text-2xl mt-4">{post.title}</h1>
            <p className="mb-2 flex gap-1">
              <span>1h</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 -960 960 960"
                width="20px"
                fill="#808080">
                <path d="M480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm-40-82v-78q-33 0-56.5-23.5T360-320v-40L168-552q-3 18-5.5 36t-2.5 36q0 121 79.5 212T440-162Zm276-102q20-22 36-47.5t26.5-53q10.5-27.5 16-56.5t5.5-59q0-98-54.5-179T600-776v16q0 33-23.5 56.5T520-680h-80v80q0 17-11.5 28.5T400-560h-80v80h240q17 0 28.5 11.5T600-440v120h40q26 0 47 15.5t29 40.5Z" />
              </svg>
            </p>
            <p>{post.description}
            </p>
          </div>
        </div>
        <div className="my-4 flex gap-6 items-center justify-between">
          {/* likes */}
          <div className="flex gap-1">
            <svg viewBox="0 -960 960 960" width="20px" fill="#707070">
              <path d="M720-120H280v-520l280-280 50 50q7 7 11.5 19t4.5 23v14l-44 174h258q32 0 56 24t24 56v80q0 7-2 15t-4 15L794-168q-9 20-30 34t-44 14Zm-360-80h360l120-280v-80H480l54-220-174 174v406Zm0-406v406-406Zm-80-34v80H160v360h120v80H80v-520h200Z" />
            </svg>
            <p>{post.like}</p>
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
            <svg viewBox="0 -960 960 960" width="24px" fill="black">
              <path d="M480-160q-33 0-56.5-23.5T400-240q0-33 23.5-56.5T480-320q33 0 56.5 23.5T560-240q0 33-23.5 56.5T480-160Zm0-240q-33 0-56.5-23.5T400-480q0-33 23.5-56.5T480-560q33 0 56.5 23.5T560-480q0 33-23.5 56.5T480-400Zm0-240q-33 0-56.5-23.5T400-720q0-33 23.5-56.5T480-800q33 0 56.5 23.5T560-720q0 33-23.5 56.5T480-640Z" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

Post.loader = async ({ params }) => {
  const res = await fetch(
    `http://localhost:8000/in/${params.username}/posts/${params._id}`,
    {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      credentials: "include",
    }
  )
    .then((response) => response.json())
    .then((body) => body);

  return res;
};

export default Post;
