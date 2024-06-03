import { Suspense, useEffect, useState } from "react";
import Loading from "../../../components/Loading";
import { useParams } from "react-router-dom";
import { fetchUserPosts } from "../../../api/posts/fetchUserPosts";
import Header from "../../../components/Header";
import Error from "../../../components/Error";
import icon from "../../../assets/img/auth__bg.jpg";
import Unauthorized from "../../../components/Unauthorized";


function Posts() {
  const params = useParams();
  const userParamsName = params.username;

  const [postsData, setPostsData] = useState({});
  const [contentLoading, setContentLoading] = useState(true);
  const [fetchError, setFetchError] = useState(false);
  const [Auth, setAuth] = useState(true);

  const getUserPosts = async () => {
    const fetchUserPostsRes = await fetchUserPosts(userParamsName);

    if (!fetchUserPostsRes?.success) {
      if(fetchUserPostsRes?.errorCode){
        setAuth(false);
      }

      setContentLoading(false);
      setFetchError(true);
      return;
    }

    setContentLoading(false);
    setFetchError(false);
    setPostsData(fetchUserPostsRes.data.posts);
  };

  useEffect(() => {
    getUserPosts();
  }, []);

  return contentLoading ? (
    <Loading />
  ) : fetchError ? (
    Auth ? <Error /> : <Unauthorized />
  ) : (
    <Suspense fallback={<Loading />}>
      <div className="p-4">
        <div className="grid gap-4">
          <Header />
          <div className="--grid-templete-columns grid gap-4 justify-center items-center">
            {postsData[0] !== undefined ? (
              postsData.map((post, index) => {
                return (
                  <div className="w-full grid gap-2 p-2 border" key={index}>
                    <div className="col-span-2">
                      <img
                        className="size-16 object-cover rounded"
                        src={icon}
                        alt=""
                      />
                    </div>
                    <div className="col-span-8 w-full">
                      <div className="flex justify-between items-center">
                        <h1 className="font-bold">{post.title}</h1>
                        <span>{post.auther}</span>
                      </div>
                      <p>{post.description}</p>
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
    </Suspense>
  );
}

export default Posts;