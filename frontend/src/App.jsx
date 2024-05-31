// ? dependencies
import { Routes, Route } from "react-router-dom";

// ? Pages
import Register from "./pages/auth/Register";
import Login from "./pages/auth/Login";
import UserHomePage from "./pages/in/User.Home";
import Home from "./pages/home/Home";
import Posts from "./pages/in/posts/Posts";
import Create from "./pages/in/posts/Create";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/auth/register" element={<Register />}></Route>
        <Route path="/auth/login" element={<Login />}></Route>

        {/* Protected Routes  */}
        <Route path="/in/:username" element={<UserHomePage />}></Route>
        <Route path="/in/:username/posts" element={<Posts />}></Route>
        <Route path="/in/:username/post/create" element={<Create />}></Route>
      </Routes>
    </>
  );
}

export default App;
