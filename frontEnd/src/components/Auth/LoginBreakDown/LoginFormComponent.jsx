import React from "react";
import GoogleButton from "./GoogleButton";
import LoginToSignIn from "./LoginToSignIn";
import GuestCredential from "./GuestCredential";
import { IoEye } from "react-icons/io5";
import { IoEyeOff } from "react-icons/io5";
import { FcGoogle } from "react-icons/fc";

const LoginFormComponent = ({
  email,
  password,
  setEmail,
  setPassword,
  passType,
  setpassType,
  showPassword,
  setShowPassword,
  picLoading,
  showPasswordFunc,
  submitHandler,
  guestCredentials,
  changeState,
}) => {
  return (
    <form className="bg-inherit p-8 w-96 brightness-200 text-white backdrop-blur-md border-2 border-slate-400  flex flex-col gap-5 rounded-lg">
      <h1 className="text-3xl font-bold text-gray-400">Login</h1>
      <input
        type="email"
        placeholder="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="bg-inherit p-2 border-0 border-b outline-none placeholder:text-gray-500 "
      />
      <div className="relative">
        <input
          type={passType}
          placeholder="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="bg-inherit p-2 border-0 border-b outline-none placeholder:text-gray-500 w-full "
        />
        <button
          className="absolute top-4 right-0"
          onClick={(e) =>
            showPasswordFunc(e, setpassType, setShowPassword, showPassword)
          }
        >
          {showPassword ? <IoEye size={20} /> : <IoEyeOff size={20} />}
        </button>
      </div>

      <input
        type="submit"
        disabled={picLoading}
        value={picLoading ? "Loading..." : "SignUp"}
        onClick={submitHandler}
        className="bg-blue-800 p-2 cursor-pointer rounded-md"
      />
      <GuestCredential guestCredentials={guestCredentials} />
      <LoginToSignIn changeState={changeState} />

      <div className="text-center">or</div>

      <GoogleButton FcGoogle={FcGoogle} />
    </form>
  );
};

export default LoginFormComponent;
