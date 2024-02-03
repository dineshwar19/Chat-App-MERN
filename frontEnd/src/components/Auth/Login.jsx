import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { IoEye } from "react-icons/io5";
import { IoEyeOff } from "react-icons/io5";
import { useSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = ({ changeState }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [passVal, setPassVal] = useState("password");
  const [picLoading, setPicLoading] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const showPasswordFunc = (e) => {
    e.preventDefault();
    setShowPassword(!showPassword);
    if (showPassword) {
      setPassVal("text");
    } else {
      setPassVal("password");
    }
  };
  const submitHandler = async (e) => {
    e.preventDefault();
    setPicLoading(true);
    const userData = {
      email: email,
      password: password,
    };
    try {
      const res = await axios.post(
        "http://localhost:8000/api/user/login",
        userData
      );
      if (!res.status == 200) throw new Error("Data is not Posted");

      enqueueSnackbar("Successfully Logged", { variant: "success" });
      setPicLoading(false);
      navigate("/chats");
    } catch (error) {
      enqueueSnackbar(`Error : ${error.message}`, { variant: "error" });
      setPicLoading(false);
    }
  };
  return (
    <div>
      <form className="bg-inherit p-8 w-96 brightness-200 text-white backdrop-blur-md border-2 border-slate-400  flex flex-col gap-5 rounded-lg">
        <h1 className="text-3xl font-bold text-gray-400">Login</h1>
        <input
          type="email"
          placeholder="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="bg-inherit p-2 border-b outline-none placeholder:text-gray-500 "
        />
        <div className="relative">
          <input
            type={passVal}
            placeholder="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="bg-inherit p-2 border-b outline-none placeholder:text-gray-500 w-full "
          />
          <button
            className="absolute top-4 right-0"
            onClick={(e) => showPasswordFunc(e)}
          >
            {showPassword ? <IoEye size={20} /> : <IoEyeOff size={20} />}
          </button>
        </div>

        <input
          type="submit"
          disabled={picLoading}
          value={picLoading ? "Loading..." : "SignUp"}
          onClick={(e) => submitHandler(e)}
          className="bg-blue-800 p-2 cursor-pointer rounded-md"
        />
        <button
          className="bg-red-900 p-2 cursor-pointer rounded-md"
          onClick={(e) => {
            e.preventDefault();
            setEmail("guest@gmail.com");
            setPassword("123456");
            submitHandler();
          }}
        >
          Get Guest User Credentials
        </button>
        <div className="flex gap-3">
          <b>No account ?</b>
          <span
            className="text-blue-600 cursor-pointer hover:underline"
            onClick={changeState}
          >
            Create one
          </span>
        </div>

        <div className="text-center">or</div>

        <button
          disabled
          className="w-full flex items-center justify-center gap-3 bg-black border border-white p-2 rounded-md"
        >
          <FcGoogle size={30} />
          <span>Continue with Google</span>
        </button>
      </form>
    </div>
  );
};

export default Login;
