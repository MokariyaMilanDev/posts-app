import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Loading from "../../components/Loading";
import { INIT_USER } from "../../store/slices/user.slice";
import { useDispatch, useSelector } from "react-redux";
import Header from "../../components/Header";
import { fetchUser } from "../../api/user/fetchUser";

function UserHomePage() {
  const params = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = useSelector((state) => state.User);

  const ParamsUsername = params.username;

  const userHandler = async () => {
    const userResponse = await fetchUser(ParamsUsername);

    console.log("UserHome.jsx RES : ", userResponse);

    if (!userResponse?.success) {
      navigate("/auth/login");
      return;
    }

    dispatch(INIT_USER(userResponse.data.user));
  };

  useEffect(() => {
    userHandler();
  }, []);

  return (
    <div className="p-4">
      {user.username ? (
        <div>
          <Header />
          {/* Add other features */}
        </div>
      ) : (
        <Loading />
      )}
    </div>
  );
}

export default UserHomePage;
