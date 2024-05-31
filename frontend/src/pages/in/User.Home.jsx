import { useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { userController } from "../../functions/user.controller";
import Loading from "../../components/Loading";
import iconCreate from "../../assets/icons/create.svg";
import { INIT_USER } from "../../store/slices/user.slice";
import { useDispatch, useSelector } from "react-redux";

function UserHomePage() {
  const params = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = useSelector((state) => state.User);

  const ParamsUsername = params.username;

  const userHandler = async () => {
    const userResponse = await userController(ParamsUsername);

    if (!userResponse?.success) {
      navigate("/auth/login");
      return;
    }

    dispatch(INIT_USER(userResponse.data));
  };

  useEffect(() => {
    userHandler();
  }, []);

  return (
    <div className="p-4">
      {user.username ? (
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
      ) : (
        <Loading />
      )}
    </div>
  );
}

export default UserHomePage;