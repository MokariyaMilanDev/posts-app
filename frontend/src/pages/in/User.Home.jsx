import { Suspense, useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { userController } from "../../functions/user.controller";
import Loading from "../../components/Loading";

function UserHomePage() {
  const params = useParams();
  const navigate = useNavigate();

  const [userData, setUserData] = useState({});

  const ParamsUsername = params.username;

  const userHandler = async () => {
    const userResponse = await userController(ParamsUsername);

    if (!userResponse.success) {
      navigate("/auth/login");
    }

    setUserData(userResponse.data);
  };

  useEffect(() => {
    userHandler();
  }, []);

  return (
    <Suspense fallback={<Loading />}>
      <div className="p-4">
        <header className="flex items-center justify-between">
          <div>
            <Link to={`/in/${userData.username}`}>
              <h1 className="text-2xl font-semibold">{userData.username}</h1>
            </Link>
          </div>
          <div>
            <Link to={`/in/${userData.username}/posts`}>
              <h1 className="underline ">Posts</h1>
            </Link>
          </div>
        </header>
      </div>
    </Suspense>
  );
}

export default UserHomePage;