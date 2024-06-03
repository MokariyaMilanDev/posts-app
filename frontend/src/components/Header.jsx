import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import iconCreate from "../assets/icons/create.svg";

function Header() {

  const user = useSelector((state) => state.User);

  return (
    <header className="flex items-center justify-between">
      <div>
        <Link to={`/in/${user.username}`}>
          <h1 className="text-2xl font-semibold">{user.username}</h1>
        </Link>
      </div>
      <section className="flex gap-4 justify-center items-center">
        <div>
          <Link to={`/in/${user.username}/posts`}>
            <h1 className="underline ">Posts</h1>
          </Link>
        </div>

        <Link
          className="flex justify-center items-center size-8 bg-zinc-200 hover:bg-green-600"
          to={`/in/${user.username}/post/create`}>
          <img src={iconCreate} alt="" />
        </Link>
      </section>
    </header>
  );
}

export default Header