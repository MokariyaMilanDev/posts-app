// ? dependencies
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import { Suspense, lazy } from "react";

// ? Pages
import Home from "./pages/home/Home.jsx";
import User from "./pages/in/User.jsx";
import Posts from "./pages/in/posts/Posts.jsx";
import Create from "./pages/in/posts/Create.jsx";
import Post from "./pages/in/posts/Post.jsx";
import Login from "./pages/auth/Login.jsx";
import Register from "./pages/auth/Register.jsx";

// ? Components
const Error = lazy(() => import("./components/Error.jsx"));
import Loading from "./components/Loading.jsx";

const App = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Home />}></Route>
      <Route
        path="/auth/register"
        action={Register.action}
        errorElement={<Error />}
        element={
          <Suspense fallback={<Loading />}>
            <Register />
          </Suspense>
        }></Route>
      <Route
        path="/auth/login"
        action={Login.action}
        errorElement={<Error />}
        element={
          <Suspense fallback={<Loading />}>
            <Login />
          </Suspense>
        }></Route>

      <Route
        path="/in/:username/*"
        loader={User.loader}
        action={User.action}
        errorElement={<Error />}
        element={
          <Suspense fallback={<Loading />}>
            <User />
          </Suspense>
        }>
        <Route
          path="posts"
          loader={Posts.loader}
          errorElement={<Error />}
          element={
            <Suspense fallback={<Loading />}>
              <Posts />
            </Suspense>
          }></Route>
        <Route
          path="posts/:_id"
          loader={Post.loader}
          errorElement={<Error />}
          element={
            <Suspense fallback={<Loading />}>
              <Post />
            </Suspense>
          }></Route>
        <Route
          path="post/create"
          action={Create.action}
          errorElement={<Error />}
          element={
            <Suspense fallback={<Loading />}>
              <Create />
            </Suspense>
          }></Route>
      </Route>
    </>
  )
);

export default App;
