// ? dependencies
import { Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";

// ? Pages
import Home from "./pages/home/Home";
import Loading from "./components/Loading";

const Login = lazy(() => import("./pages/auth/Login"));
const Register = lazy(() => import("./pages/auth/Register"));
const UserHomePage = lazy(() => import("./pages/in/User.Home"));
const Posts = lazy(() => import("./pages/in/posts/Posts"));
const Create = lazy(() => import("./pages/in/posts/Create"));

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route
          path="/auth/register"
          element={
            <Suspense fallback={<Loading />}>
              <Register />
            </Suspense>
          }></Route>
        <Route
          path="/auth/login"
          element={
            <Suspense fallback={<Loading />}>
              <Login />
            </Suspense>
          }></Route>

        {/* Protected Routes  */}
        <Route
          path="/in/:username"
          element={
            <Suspense fallback={<Loading />}>
              <UserHomePage />
            </Suspense>
          }></Route>
        <Route
          path="/in/:username/posts"
          element={
            <Suspense>
              <Posts />
            </Suspense>
          }></Route>
        <Route
          path="/in/:username/post/create"
          element={
            <Suspense>
              <Create />
            </Suspense>
          }></Route>
      </Routes>
    </>
  );
}

export default App;
