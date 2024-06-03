import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { fetchUserLogin } from "../../api/auth/fetchUserLogin";

function Login() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [formData, setFormData] = useState({
    gmail: "",
    password: "",
  });
  const [errorFields, setErrorFields] = useState({
    universal: {
      isError: false,
      message: "",
    },
    gmail: {
      isError: false,
      message: "",
    },
    password: {
      isError: false,
      message: "",
    },
  });

  async function LoginHandler() {
    setLoading(true);

    //// empty fields checking ////
    if (!formData.gmail) {
      setErrorFields({
        ...errorFields,
        gmail: { isError: true, message: "Gmail is required" },
      });
      setLoading(false);
      return;
    }

    if (!formData.password) {
      setErrorFields({
        ...errorFields,
        password: { isError: true, message: "Password is required" },
      });
      setLoading(false);
      return;
    }

    //// fetch "/auth/login" ////
    const loginResponse = await fetchUserLogin(formData);
    if (!loginResponse?.success) {
      if (loginResponse?.errorCode === 0) {
        setErrorFields({
          ...errorFields,
          universal: {
            isError: true,
            message: loginResponse.message,
          },
        });
      }

      if (loginResponse?.errorCode === 1) {
        setErrorFields({
          ...errorFields,
          gmail: {
            isError: true,
            message: loginResponse.message,
          },
        });
      }

      if (loginResponse?.errorCode === 2) {
        setErrorFields({
          ...errorFields,
          password: {
            isError: true,
            message: loginResponse.message,
          },
        });
      }

      setLoading(false);
      setError(true);
      return;
    }

    setError(false);
    setLoading(false);
    navigate(`/in/${loginResponse.data.username}`);
  }

  return (
    <div className="register-container flex justify-center items-center m-4">
      <div className="rounded w-[100%] md:w-[60%] grid sm:grid-cols-2 text-white bg-zinc-900 p-2">
        <section className="auth-heading-section flex w-full p-4 h-full rounded-lg justify-center items-center">
          <div className="grid gap-4 p-4 rounded isolate bg-black/30 shadow-lg ring-1 ring-black/20 backdrop-blur-[2px]">
            <h1 className="text-2xl text-center font-bold">Welcome back</h1>
            <h1 className="text-2xl text-center font-bold">Get you account</h1>
          </div>
        </section>
        {/* FORM  */}
        <section className="grid gap-4 p-4">
          <div>
            <h1 className="text-3xl my-4 text-center font-bold">Login</h1>
          </div>
          {error ? <p className="text-red-600">Server error, try again</p> : ""}
          {/* Gmail */}
          <div>
            {errorFields.gmail.isError ? (
              <p className="bg-red-500 rounded px-1 inline-block text-sm my-1 z-10">
                {errorFields.gmail.message}
              </p>
            ) : (
              ""
            )}
            <div
              className={`flex items-center px-2 rounded border border-zinc-500`}>
              <svg height="20" viewBox="0 0 512 512">
                <path
                  fill={"#707070"}
                  d="M48 64C21.5 64 0 85.5 0 112c0 15.1 7.1 29.3 19.2 38.4L236.8 313.6c11.4 8.5 27 8.5 38.4 0L492.8 150.4c12.1-9.1 19.2-23.3 19.2-38.4c0-26.5-21.5-48-48-48H48zM0 176V384c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V176L294.4 339.2c-22.8 17.1-54 17.1-76.8 0L0 176z"
                />
              </svg>
              <input
                type="text"
                value={formData.gmail}
                onChange={(event) => {
                  setErrorFields({
                    ...errorFields,
                    gmail: { isError: false, message: "" },
                  });
                  setFormData({
                    ...formData,
                    gmail: event.currentTarget.value,
                  });
                }}
                className="border-none bg-zinc-900 w-full p-2 focus:outline-none"
                placeholder="gmail"
              />
            </div>
          </div>
          {/* password */}
          <div>
            {errorFields.password.isError ? (
              <p className="bg-red-500 rounded px-1 inline-block text-sm my-1 z-10">
                {errorFields.password.message}
              </p>
            ) : (
              ""
            )}
            <div
              className={`flex items-center px-2 rounded border border-zinc-500`}>
              <svg height="24" viewBox="0 -960 960 960" width="24">
                <path
                  fill="#707070"
                  d="M480-480q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47ZM160-160v-112q0-34 17.5-62.5T224-378q62-31 126-46.5T480-440q66 0 130 15.5T736-378q29 15 46.5 43.5T800-272v112H160Zm80-80h480v-32q0-11-5.5-20T700-306q-54-27-109-40.5T480-360q-56 0-111 13.5T260-306q-9 5-14.5 14t-5.5 20v32Zm240-320q33 0 56.5-23.5T560-640q0-33-23.5-56.5T480-720q-33 0-56.5 23.5T400-640q0 33 23.5 56.5T480-560Zm0-80Zm0 400Z"
                />
              </svg>
              <input
                type="text"
                value={formData.password}
                onChange={(event) => {
                  setErrorFields({
                    ...errorFields,
                    password: { isError: false, message: "" },
                  });
                  setFormData({
                    ...formData,
                    password: event.currentTarget.value,
                  });
                }}
                className="border-none bg-zinc-900 w-full p-2 focus:outline-none"
                placeholder="password"
              />
            </div>
          </div>
          {/* button */}
          <div className="my-2">
            {loading ? (
              <button className="w-full flex justify-center items-center rounded p-2 border border-zinc-500">
                <svg
                  className={`${loading ? "animate-spin" : ""}`}
                  height={25}
                  viewBox="0 0 512 512"
                  repeatCount="-1">
                  <path
                    fill="white"
                    d="M463.5 224H472c13.3 0 24-10.7 24-24V72c0-9.7-5.8-18.5-14.8-22.2s-19.3-1.7-26.2 5.2L413.4 96.6c-87.6-86.5-228.7-86.2-315.8 1c-87.5 87.5-87.5 229.3 0 316.8s229.3 87.5 316.8 0c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0c-62.5 62.5-163.8 62.5-226.3 0s-62.5-163.8 0-226.3c62.2-62.2 162.7-62.5 225.3-1L327 183c-6.9 6.9-8.9 17.2-5.2 26.2s12.5 14.8 22.2 14.8H463.5z"
                  />
                </svg>
              </button>
            ) : (
              <button
                className="w-full rounded p-2 border border-zinc-500"
                onClick={() => LoginHandler()}>
                Login
              </button>
            )}
          </div>
          {/* OR */}
          <div className="my-4">
            <hr className=" relative z-10" />
            <p className=" relative bg-zinc-900 px-4 mx-auto table -top-3 z-20">
              OR
            </p>
          </div>
          {/* Register */}
          <div className="text-center">
            <p>
              Already have an account{" "}
              <Link className="text-blue-700 underline" to={"/auth/register"}>
                Register
              </Link>
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Login;