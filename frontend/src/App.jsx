// ? dependencies
import { Routes, Route } from "react-router-dom";

// ? Pages
import Register from "./pages/auth/Register";
import Login from "./pages/auth/Login";

function App() {
  return (
    <>
      <Routes>
        <Route path="/auth/register" element={<Register />}></Route>
        <Route path="/auth/login" element={<Login />}></Route>
      </Routes>
    </>
  );
}

export default App;
