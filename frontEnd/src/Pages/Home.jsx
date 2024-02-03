import React, { useState } from "react";
import SignUp from "../components/Auth/SignUp";
import Login from "../components/Auth/Login";
const Home = () => {
  const [showSignup, setShowSignUp] = useState(true);
  const changeState = () => {
    setShowSignUp(!showSignup);
  };
  return (
    <div className="min-h-screen flex justify-center items-center">
      {showSignup ? (
        <SignUp changeState={changeState} />
      ) : (
        <Login changeState={changeState} />
      )}
    </div>
  );
};

export default Home;
