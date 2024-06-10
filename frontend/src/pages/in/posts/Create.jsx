import { useState } from "react";
import {
  Link,
  useActionData,
  useNavigate,
  useOutletContext,
  useSubmit,
} from "react-router-dom";

function Create() {
  const {username} = useOutletContext();
  const navigate = useNavigate();
  const actionData = useActionData();

  const submit = useSubmit();
  const [loading, setLoading] = useState(false);
  const [post, setPost] = useState({
    title: "",
    description: "",
  });
  const [errorFields, setErrorFields] = useState({
    univarsal: {
      isError: false,
      message: "",
    },
    title: {
      isError: false,
      message: "",
    },
    description: {
      isError: false,
      message: "",
    },
  });

  const createPostHandler = async () => {
    setLoading(true);
    if (!post.title) {
      setErrorFields({
        ...errorFields,
        title: { isError: true, message: "Title is required" },
      });
      setLoading(false);
      return;
    }

    if (!post.description) {
      setErrorFields({
        ...errorFields,
        description: { isError: true, message: "Description is required" },
      });
      setLoading(false);
      return;
    }

    submit(post, { method: "POST" });
    setLoading(false)
  };

  return (
    <div className="p-4 h-screen flex justify-center items-center">
      <div className="border border-zinc-950 rounded p-3 grid gap-4">
        <div>
          <h1 className="text-2xl mb-2 font-semibold">Create a post</h1>
        </div>
        <section className="grid gap-2">
          {/* title */}
          <div>
            {errorFields.title.isError ? (
              <p className="bg-red-500 rounded table px-1 text-sm my-1 z-10">
                {errorFields.title.message}
              </p>
            ) : (
              ""
            )}
            <input
              name="title"
              className="border border-zinc-950 focus:outline-none px-3 py-2 rounded"
              type="text"
              onChange={(event) => {
                setErrorFields({
                  ...errorFields,
                  title: { isError: false, message: "" },
                });
                setPost({ ...post, title: event.currentTarget.value });
              }}
              value={post.title}
              placeholder="title"
            />
          </div>
          {/* description */}
          <div>
            {errorFields.description.isError ? (
              <p className="bg-red-500 rounded table px-1 text-sm my-1 z-10">
                {errorFields.description.message}
              </p>
            ) : (
              ""
            )}
            <textarea
              name="description"
              className="border border-zinc-950 focus:outline-none px-3 py-2 rounded w-full min-h-24 h-32 max-h-40"
              onChange={(event) => {
                setErrorFields({
                  ...errorFields,
                  description: { isError: false, message: "" },
                });
                setPost({
                  ...post,
                  description: event.currentTarget.value,
                });
              }}
              value={post.description}
              placeholder="description"></textarea>
          </div>
          {/* button */}
          <div className="grid grid-cols-3 gap-2 justify-center items-center">
            <Link
              to={`/in/${username}`}
              className="border col-span-1 border-zinc-950 w-full p-2 flex justify-center items-center">
              <p>Back</p>
            </Link>
            <button
              onClick={() => createPostHandler()}
              className="border border-zinc-950 w-full p-2 col-span-2 flex justify-center items-center">
              {loading ? (
                <svg
                  className={`${loading ? "animate-spin" : ""}`}
                  height={20}
                  viewBox="0 0 512 512"
                  repeatCount="-1">
                  <path
                    fill="black"
                    d="M463.5 224H472c13.3 0 24-10.7 24-24V72c0-9.7-5.8-18.5-14.8-22.2s-19.3-1.7-26.2 5.2L413.4 96.6c-87.6-86.5-228.7-86.2-315.8 1c-87.5 87.5-87.5 229.3 0 316.8s229.3 87.5 316.8 0c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0c-62.5 62.5-163.8 62.5-226.3 0s-62.5-163.8 0-226.3c62.2-62.2 162.7-62.5 225.3-1L327 183c-6.9 6.9-8.9 17.2-5.2 26.2s12.5 14.8 22.2 14.8H463.5z"
                  />
                </svg>
              ) : (
                <p className="">Create</p>
              )}
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}

Create.action = async ({ request, params }) => {
  const formData = await request.formData();
  const post = Object.fromEntries(formData);
  console.log("Request : ", request);
  const res = await fetch(
    `http://localhost:8000/in/${params.username}/post/create`,
    {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      credentials: "include",
      body: JSON.stringify(post),
    }
  )
    .then((response) => response.json())
    .then((body) => body);

  return res;
};

export default Create;
