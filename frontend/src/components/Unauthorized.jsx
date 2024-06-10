import { Link } from "react-router-dom";

function Unauthorized({ message = "Unauthorized request" }) {
  return (
    <div className="flex justify-center items-center h-screen w-screen">
      <div>
        <h1 className="text-xl">
          Error : <b className="text-red-400">{message}</b>{" "}
        </h1>
        <div className="flex gap-2 justify-center items-center my-4">
          <button className="border border-zinc-900 rounded px-8 py-2 hover:border-green-800 hover:bg-green-800 hover:text-white ">
            <Link to={`/`}>Back</Link>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Unauthorized