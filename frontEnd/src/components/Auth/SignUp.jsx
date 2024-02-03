import React, { useState } from "react";
import { IoEye } from "react-icons/io5";
import { IoEyeOff } from "react-icons/io5";

const SignUp = ({ changeState }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [pic, setPic] = useState("");
  const [showPassword, setShowPassword] = useState(true);
  const [passVal, setPassVal] = useState("");

  const showPasswordFunc = () => {
    setShowPassword(!showPassword);
    if (showPassword) {
      setPassVal("text");
    } else {
      setPassVal("password");
    }
  };
  return (
    <div>
      <form className="bg-inherit p-8 w-96 brightness-200 text-white backdrop-blur-md border-2 border-slate-400  flex flex-col gap-5 rounded-lg">
        <h1 className="text-3xl font-bold text-gray-400">Create Account</h1>
        <input
          type="text"
          placeholder="Name"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="bg-inherit p-2 border-b outline-none placeholder:text-gray-500 "
        />
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
          <button className="absolute top-4 right-0" onClick={showPasswordFunc}>
            {showPassword ? <IoEye size={20} /> : <IoEyeOff size={20} />}
          </button>
        </div>
        <div className="relative">
          <input
            type={passVal}
            placeholder="confirm password"
            required
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="bg-inherit p-2 border-b outline-none placeholder:text-gray-500 w-full "
          />
          <button className="absolute top-4 right-0" onClick={showPasswordFunc}>
            {showPassword ? <IoEye size={20} /> : <IoEyeOff size={20} />}
          </button>
        </div>
        <div className="flex flex-col gap-3">
          <label htmlFor="profile">Upload Your Picture</label>
          <input type="file" accept="image/*" className="cursor-pointer" />
        </div>

        <input
          type="submit"
          value="Sign Up"
          className="bg-blue-800 p-2 cursor-pointer rounded-md"
        />

        <div className="flex gap-3">
          <b>Already have an account?</b>
          <span
            className="text-blue-600 cursor-pointer hover:underline"
            onClick={changeState}
          >
            Log in
          </span>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
