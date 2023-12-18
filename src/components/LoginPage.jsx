import React, { useState } from "react";
import Loader from "./Loader";
import { login } from "../api/user";
import { loginUser } from "../helper/auth";
import { useNavigate } from "react-router-dom";

const LoginPage = ({ isLogin }) => {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [loader, setLoader] = useState(false);

  const navigate = useNavigate();
  const handleLogin = async () => {
    const userData = { email, password };
    if (!email || !password) {
      return alert("All feilds are manadatory!")
    }
    else {
      setLoader(true);
      const res = await login(userData);
      if (res && res.error) {
        alert(res.error)
        setLoader(false);
        return;
      }
      loginUser(res);
      function myFunction() {
        navigate("/app");
        setLoader(false);
      }
      
      // Set a timeout for 2 seconds
      setTimeout(myFunction, 2000);
    }
  };

  const toggleLogin = (e) => {
    e.preventDefault();
    isLogin(false);
  }
  return (
    <div
      id="input-box"
      style={{ zIndex: "5" }}
      className="max-w-md w-full lg:h-[100%] mb-16 lg:mb-0 bg-white p-6 rounded-lg shadow-lg text-white
       dark:text-black bg-opacity-40 backdrop-filter backdrop-blur-18 border border-opacity-20 border-white"
    >
      {loader && <Loader />}

      <h2 className=" w-full text-black flex justify-center items-center text-2xl font-semibold mb-6">
        Welcome to Catalyst!
      </h2>
      <form>
        <label className="block mb-2 text-gray-600">E-mail:</label>
        <input
          type="email"
          // value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your E-mail"
          className="w-full p-2 border border-gray-300 rounded focus:outline-none text-black focus:shadow-outline focus:border-pink-400"
        />
        <br />
        <label className="block mt-4 mb-2 text-gray-600">Password:</label>
        <input
          type="password"
          // value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your password"
          className="w-full p-2 border border-gray-300 rounded focus:outline-none text-black focus:shadow-outline focus:border-pink-400"
        />
        <br />
        <div className="w-full mt-6 flex justify-between items-start">
          <button
            onClick={toggleLogin}
            className="border p-2 w-[5rem] bg-yellow-400 rounded-lg shadow-lg text-white hover:translate-y-[-2px] transition-transform duration-300"
          >
            SignUp?
          </button>
          <button
            type="button"
            onClick={handleLogin}
            className=" border p-2 w-[5rem] bg-purple-400 rounded-lg shadow-lg text-white hover:translate-y-[-2px] transition-transform duration-300"
            disabled={!email || !password}
          >
            Login
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
