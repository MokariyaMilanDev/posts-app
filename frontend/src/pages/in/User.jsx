import {
  useLoaderData,
  Outlet,
} from "react-router-dom";
import Header from "../../components/Header";
import Unauthorized from "../../components/Unauthorized";

function User() {
  var userResponse = useLoaderData();
  const user = userResponse.data.user;

  if (!userResponse?.success) {
    return <Unauthorized message={userResponse.message} />;
  }

  return (
    <div className="p-4">
      <Header username={user.username} />
      <Outlet context={{username: user.username}}/>
    </div>
  );
}

User.loader = async ({ params }) => {
  var res = await fetch(`http://localhost:8000/in/${params.username}`, {
    method: "post",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    credentials: "include",
  })
    .then((response) => response.json())
    .then((body) => body);

  return res;
};

User.action = ({ params }) => {
  console.log("Action : ", params);
};

export default User;
