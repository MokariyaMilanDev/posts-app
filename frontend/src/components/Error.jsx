import { Link, useLocation, useRouteError } from "react-router-dom";

function Error({ errorMessage="Something went wrong !!!" }) {
  const error = useRouteError();
  const location = useLocation();
  
  return (
    <div className="flex justify-center items-center h-screen w-screen">
      <div>
        <h1 className="text-xl">
          Error : <b>{error.message || errorMessage}</b>{" "}
        </h1>
        <div className="flex gap-2 justify-center items-center my-4">
          <button className="border border-zinc-900 rounded px-8 py-2 hover:bg-zinc-900 hover:text-white ">
            <Link to={`/`}>Back</Link>
          </button>
          <button className="border border-zinc-900 rounded px-8 py-2 hover:bg-zinc-900 hover:text-white ">
            <Link to={`${location.pathname}`}>Reload</Link>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Error;
