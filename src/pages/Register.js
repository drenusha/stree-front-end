import React from "react";
import navBack from "../assets/icons/nav-back.svg";
import "./Register.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import zxcvbn from "zxcvbn";
import validatePasswordStrength from "../components/validatePasswordStrength";

const Register = () => {
  const [fullName, setfullName] = useState("");
  const [email, setEmail] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const [passwordStrength, setPasswordStrength] = useState(0);
  const [isSubmit, setIsSubmit] = useState(false);

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    let isValid = true;
    const newErrors = {};

    if (!fullName.trim()) {
      newErrors.fullName = "Full Name is required";
      isValid = false;
    } else if (!/^[a-zA-Z\s]+$/.test(fullName.trim())) {
      newErrors.fullName = "Full Name must contain only letters and spaces";
      isValid = false;
    }

    if (!email.trim()) {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (!/^[\w.-]+@[a-zA-Z]+\.[a-zA-Z]{2,}$/.test(email.trim())) {
      newErrors.email = "Invalid Email";
      isValid = false;
    }

    if (!mobileNumber.trim()) {
      newErrors.mobileNumber = "Mobile Number is required";
      isValid = false;
    } else if (!/^\d{9,}$/.test(mobileNumber.trim())) {
      newErrors.mobileNumber = "Mobile Number must be at least 9 digits";
      isValid = false;
    }

    if (password.length < 9) {
      newErrors.password = "Password must be at least 9 characters long";
      isValid = false;
    }

    if (password !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmit(true);
    if (validateForm()) {
      const users = JSON.parse(localStorage.getItem("USERS")) ?? [];
      if (users.find((user) => user.email === email)) {
        alert("User already registered.");
        return;
      }
      console.log(users);
      const user = {
        fullName: fullName,
        email: email,
        mobileNumber: mobileNumber,
        password: btoa(password),
      };
      users.push(user);
      localStorage.setItem("USERS", JSON.stringify(users));
      setEmail("");
      setPassword("");

      navigate("/");
    }
  };

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    const strengthScore = validatePasswordStrength(newPassword);
    setPasswordStrength(strengthScore);
  };

  useEffect(() => {
    if (isSubmit) {
      validateForm();
    }
  }, [fullName, email, mobileNumber, password, confirmPassword]);

  const navback = (e) => {
    e.preventDefault();
    navigate("/");
  };

  return (
    <div className="register_page bg-gray-200 font-primary">
      <div className="container w-[350px] bg-white">
        <div className="flex flex-col py-10 px-1">
          <div className="nav_back flex items-start">
            <a href="" onClick={navback}>
              <img className="nav_back_img mx-auto h-10 w-auto" src={navBack} />
            </a>
          </div>

          <div className="form_container sm:mx-auto px-5">
            <h2 className="title mt-5 text-left text-2xl font-bold leading-9 tracking-tight text-gray-900">
              Register to Stree
            </h2>
            <form className="register_form mt-8 px-1" onSubmit={handleSubmit}>
              <div className="relative">
                <input
                  id="fullName"
                  name="fullName"
                  type="text"
                  className="peer h-10 w-full border-b-2 border-gray-300 text-gray-900 placeholder-transparent focus:outline-none focus:border-gray-300"
                  placeholder="Filan Fisteku"
                  value={fullName}
                  onChange={(e) => setfullName(e.target.value)}
                />
                {errors.fullName && (
                  <span className="error mt-2 text-xs text-red-600 dark:text-red-500">
                    {errors.fullName}
                  </span>
                )}
                <label
                  htmlFor="fullName"
                  className="absolute left-0 -top-3.5 text-gray-600 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                >
                  Full Name
                </label>
              </div>
              <div className="mt-8 relative">
                <input
                  id="email"
                  name="email"
                  type="email"
                  className="peer h-10 w-full border-b-2 border-gray-300 text-gray-900 placeholder-transparent focus:outline-none focus:border-gray-300"
                  placeholder="tanveshpadyal@gmail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                {errors.email && (
                  <span className="error mt-2 text-xs text-red-600 dark:text-red-500">
                    {errors.email}
                  </span>
                )}
                <label
                  htmlFor="email"
                  className="absolute left-0 -top-3.5 text-gray-600 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                >
                  Email
                </label>
              </div>
              <div className="mt-8 relative">
                <input
                  id="mobileNumber"
                  name="mobileNumber"
                  type="tel"
                  className="peer h-10 w-full border-b-2 border-gray-300 text-gray-900 placeholder-transparent focus:outline-none focus:border-gray-300"
                  placeholder="+383 44 123 456"
                  value={mobileNumber}
                  onChange={(e) => setMobileNumber(e.target.value)}
                />
                {errors.mobileNumber && (
                  <span className="error mt-2 text-xs text-red-600 dark:text-red-500">
                    {errors.mobileNumber}
                  </span>
                )}
                <label
                  htmlFor="mobileNumber"
                  className="absolute left-0 -top-3.5 text-gray-600 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                >
                  Mobile Number
                </label>
              </div>
              <div className="mt-8 relative">
                <input
                  id="password"
                  type="password"
                  name="password"
                  className="peer h-10 w-full border-b-2 border-gray-300 text-gray-900 placeholder-transparent focus:outline-none focus:border-gray-300"
                  placeholder="Password"
                  value={password}
                  onChange={handlePasswordChange}
                />
                {errors.password && (
                  <span className="error mt-2 text-xs text-red-600 dark:text-red-500">
                    {errors.password}
                  </span>
                )}
                <label
                  htmlFor="password"
                  className="absolute left-0 -top-3.5 text-gray-600 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                >
                  Password
                </label>
              </div>
              <div className="password-strength-indicato flex flex-row">
                <div
                  className={`horizontal_bar h-1 w-1/4 mt-1 mr-8 ${
                    passwordStrength >= 1 ? "bg-red-500" : "bg-gray-300"
                  }`}
                ></div>
                <div
                  className={`horizontal_bar h-1 w-1/4 mt-1 mr-8 ${
                    passwordStrength >= 2 ? "bg-orange-500" : "bg-gray-300"
                  }`}
                ></div>
                <div
                  className={`horizontal_bar h-1 w-1/4 mt-1 mr-8 ${
                    passwordStrength >= 3 ? "bg-yellow-500" : "bg-gray-300"
                  }`}
                ></div>
                <div
                  className={`horizontal_bar h-1 w-1/4 mt-1 ${
                    passwordStrength >= 4 ? "bg-green-500" : "bg-gray-300"
                  }`}
                ></div>
              </div>
              <div className="mt-8 relative">
                <input
                  id="confirmPassword"
                  type="password"
                  name="confirmPassword"
                  className="peer h-10 w-full border-b-2 border-gray-300 text-gray-900 placeholder-transparent focus:outline-none focus:border-gray-300"
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                {errors.confirmPassword && (
                  <span className="error mt-2 text-xs text-red-600 dark:text-red-500">
                    {errors.confirmPassword}
                  </span>
                )}
                <label
                  htmlFor="confirmPassword"
                  className="absolute left-0 -top-3.5 text-gray-600 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                >
                  Confirm Password
                </label>
              </div>
              <button
                type="sumbit"
                className="register_btn shadow-lg mt-10 px-4 py-2 rounded bg-red-600 hover:bg-stone-300 text-white font-semibold text-center block w-full focus:outline-none cursor-pointer"
              >
                Register
              </button>
            </form>

            <p className="text-xs mt-6 mr-1.5 ml-1.5 font-semibold text-center text-back">
              By registering you agree to{" "}
              <a className="font-semibold leading-6 text-red-600 hover:text-red-500 cursor-pointer">
                Terms & Conditions
              </a>{" "}
              and{" "}
              <a className="font-semibold leading-6 text-red-600 hover:text-red-500 cursor-pointer">
                Privacy Policy of Stree
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
