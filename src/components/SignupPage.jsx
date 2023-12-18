import React, { useState } from "react";
import Loader from "./Loader";
import { signup } from "../api/user";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../helper/auth";

const SignUp = ({ isLogin }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loader, setLoader] = useState(false);
  const navigate = useNavigate();

  const isEmailValid = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const isPasswordMatch = () => {
    return password === confirmPassword;
  };

  const handleSignup = async (e) => {
    e.preventDefault(); // Prevent default form submission

    if (!name || !email || !password || !confirmPassword) {
      alert("All feilds are mandatory")
      return;
    }

    if (!isEmailValid(email)) {
      alert("Use a valid E-mail")
      return;
    }

    if (!isPasswordMatch()) {
      alert("Password doesn't match!")
      return;
    }

    setLoader(true);

    const data = { name, email, password };
    const res = await signup(data);
    
    if (res) {
      console.log(res);
      loginUser(res);
      navigate("/app");
    }

    setLoader(false); // Hide the loader after signup
  };

  const toggleLogin = (e) => {
    e.preventDefault();
    isLogin(true);
  };

  return (
    <div
      id="input-box"
      style={{ zIndex: "5" }}
      className="max-w-md w-full lg:h-[100%] mb-16 lg:mb-0 bg-white p-6 rounded-lg shadow-lg text-white
       dark:text-black bg-opacity-40 backdrop-filter backdrop-blur-18 border border-opacity-20 border-white"
    >
      {loader && <Loader />}

      <h2 className="w-full text-black flex justify-center items-center text-2xl font-semibold mb-6">
        Welcome to Catalyst!
      </h2>
      <form>
        <label className="block mb-2 text-gray-600">Name:</label>
        <input
          type="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter your Name"
          className="w-full p-2 border text-black dark:text-white border-gray-300 rounded focus:outline-none focus:shadow-outline focus:border-pink-400"
        />
        <label className="block mt-4 mb-2 text-gray-600">E-mail:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your E-mail"
          className="w-full p-2 text-black dark:text-white border border-gray-300 rounded focus:outline-none focus:shadow-outline focus:border-pink-400"
        />
        <br />
        <label className="block mt-4 mb-2 text-gray-600">Enter Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your password"
          className="w-full p-2 border text-black dark:text-white border-gray-300 rounded focus:outline-none focus:shadow-outline focus:border-pink-400"
        />
        <label className="block mt-4 mb-2 text-gray-600">Confirm Password:</label>
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Confirm your password"
          className="w-full p-2 border text-black dark:text-white border-gray-300 rounded focus:outline-none focus:shadow-outline focus:border-pink-400"
        />
        <br />
        <div className="w-full mt-6 flex justify-between items-start">
          <button
            onClick={toggleLogin}
            className="border p-2 w-[5rem] bg-yellow-400 rounded-lg shadow-lg text-white hover:translate-y-[-2px] transition-transform duration-300"
          >
            Login?
          </button>
          <button
            type="submit" // Change type to submit
            onClick={handleSignup}
            className="border p-2 w-[5rem] bg-purple-400 rounded-lg shadow-lg text-white hover:translate-y-[-2px] transition-transform duration-300"
            disabled={!name || !email || !password || !confirmPassword}
          >
            SignUp
          </button>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
