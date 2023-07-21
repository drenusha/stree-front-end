import React from "react";
import logo from "../assets/icons/Logo.svg";
import "./Login.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Auth from "../components/auth";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleRegisterClick = () => {
    navigate("/register");
  };

  const handleLogin = (e) => {
    e.preventDefault();

    const users = JSON.parse(localStorage.getItem("USERS")) ?? [];
    console.log();
    const userMatch = users.find(
      (user) => user.email === email && user.password === btoa(password)
    );
    if (userMatch) {
      Auth.login();
      setEmail("");
      setPassword("");

      navigate("/home");
    } else {
      setErrorMessage("Invalid email or password.");
    }
  };

  return (
    <div className="login_page bg-gray-200">
      <div className="container w-[350px] bg-white">
        <div className="flex flex-col px-6 pt-20">
          <div className="logo pt-14 mt-10 ">
            <img className="logo_img mx-auto h-10 w-auto" src={logo} />
          </div>

          <div className="form_container pb-8">
            <form className="login_form mt-12" onSubmit={handleLogin}>
              <div className="relative">
                <input
                  id="email"
                  name="email"
                  type="text"
                  className="peer h-10 w-full border-b-2 border-gray-300 text-gray-900 placeholder-transparent focus:outline-none focus:border-gray-300"
                  placeholder="tanveshpadyal@gmail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <label
                  htmlFor="email"
                  className="absolute left-0 -top-3.5 text-gray-600 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                >
                  Email ID
                </label>
              </div>
              <div className="mt-10 relative">
                <input
                  id="password"
                  type="password"
                  name="password"
                  className="peer h-10 w-full border-b-2 border-gray-300 text-gray-900 placeholder-transparent focus:outline-none focus:border-gray-300"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <label
                  htmlFor="password"
                  className="absolute left-0 -top-3.5 text-gray-600 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                >
                  Password
                </label>
                <div className="grid justify-items-end mt-3 text-sm">
                  <a
                    href=""
                    className="forgot_pass font-semibold text-rose-600 hover:text-red-500"
                  >
                    Forgot password?
                  </a>
                </div>
              </div>
              {errorMessage && (
                <div
                  class="p-3 mb-1 mt-4 text-xs text-center text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
                  role="alert"
                >
                  <span class="font-small">{errorMessage}</span>
                </div>
              )}

              <button
                type="sumbit"
                className="login_btn shadow-lg mt-10 px-4 py-2 rounded bg-red-600 hover:bg-stone-300 text-white font-semibold text-center block w-full focus:outline-none cursor-pointer"
              >
                Login
              </button>
            </form>

            <p className="mt-5 mb-10 text-center text-sm text-gray-500">
              Dont have an account?{" "}
              <a
                href=""
                className="register_now font-semibold leading-6 text-rose-600 hover:text-rose-500"
                onClick={handleRegisterClick}
              >
                Register Now
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
