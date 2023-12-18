import {React, useEffect, useState} from "react";
import LoginPage from "../components/LoginPage";
import SignupPage from "../components/SignupPage";
import { isLoggedIn } from "../helper/auth";
import { useNavigate } from "react-router-dom";

function Homepage() {
  const navigate = useNavigate();
  const [login, setLogin] = useState(true); 
  const handleToggle = (e) => {
    setLogin(e);
  }

  useEffect(() => {
    if (isLoggedIn()) {
      navigate("/app")
    } 
  }, [])
  return (
    <>
      <div className="z-8 w-full flex justify-between items-center flex-col lg:flex-row">
        <div className="relative xl:w-full flex flex-col justify-center items-start w-full max-xl:padding-x pt-28">
          <p className="text-xl font-montserrat text-yellow-400 ">
            Dive into a World Tailored Just for You
          </p>
          {/* max-sm:text-[72px] max-sm:leading-[82] */}
          <h1
            id="hero-title"
            className="mt-6 font-palanquin lg:text-7xl 
         dark:text-gray-300 text-5xl"
          >
            <span
              className=" w-full
            z-5 relative pr-10
          "
            >
              Discover Your Literary Match
            </span>
            <br />
            <span className="text-purple-400 dark:text-purple-300 inline-block mt-4">
              HARMONY
            </span>{" "}
            PAGES
          </h1>
          <p
            className="font-montserrat text-gray-400 dark:text-gray-300 text-lg leading-8 mt-6
        mb-14 sm:max-w-sm"
          >
            Unlock the Perfect Book for Your Personality.
          </p>
        </div>
        {login ? <LoginPage isLogin={handleToggle} /> : <SignupPage isLogin={handleToggle} />}
      </div>
    </>
  );
}

export default Homepage;
