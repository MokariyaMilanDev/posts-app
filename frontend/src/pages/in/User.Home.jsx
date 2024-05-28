import { useParams } from "react-router-dom"

function UserHomePage() {
  const params = useParams();
  const username = params.username;

  return (
    <div>UserHomePage : {username}</div>
  )
}

// header 
/// Name || posts 

export default UserHomePage