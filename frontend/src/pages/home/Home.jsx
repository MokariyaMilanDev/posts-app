import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="h-screen w-screen flex justify-center text-center items-center">
      <div>
        <h1 className=" text-2xl my-1 font-bold">Posts application</h1>
        <p>For creating, viewing and managing posts.</p>
        <div className="flex justify-center items-center gap-4 my-4">
          <button className="border border-zinc-900 rounded px-8 py-2 hover:bg-zinc-900 hover:text-white ">
            <Link to={"/auth/login"}>Login</Link>
          </button>
          <button className="border border-zinc-900 rounded px-8 py-2 hover:bg-zinc-900 hover:text-white ">
            <Link to={"/auth/register"}>Register</Link>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Home