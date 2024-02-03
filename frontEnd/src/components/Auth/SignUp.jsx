import React, { useState } from "react";
import { IoEye } from "react-icons/io5";
import { IoEyeOff } from "react-icons/io5";
import { useSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const SignUp = ({ changeState }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [pic, setPic] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [passType, setpassType] = useState("password");
  const [picLoading, setPicLoading] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const showPasswordFunc = (e) => {
    e.preventDefault();
    setShowPassword(!showPassword);
    setpassType(showPassword ? "text" : "password");
  };

  const getPicUrl = async (pics) => {
    setPicLoading(true);
    if (pics === undefined) {
      enqueueSnackbar("Error", { variant: "error" });
      return;
    }
    try {
      if (pics.type === "image/jpeg" || pics.type === "image/png") {
        const data = new FormData(); //FormData is a data structure that can store key-value pairs. It is primarily used to send form data, but can also be used independently to transmit keyed data.
        data.append("file", pics);
        data.append("upload_preset", "chatApp");
        data.append("cloud_name", "dqsozxnkl");
        const response = await fetch(
          "https://api.cloudinary.com/v1_1/dqsozxnkl/image/upload",
          {
            method: "post",
            body: data,
          }
        );
        const res = await response.json();
        setPic(res.url.toString());
        console.log(res.url.toString());
        enqueueSnackbar("Image uploaded successfully", {
          variant: "success",
        });
        setPicLoading(false);
      }
    } catch (error) {
      enqueueSnackbar(
        "Invalid file format. Please select a JPEG or PNG image.",
        { variant: "error" }
      );
      setPicLoading(false);
      return;
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setPicLoading(true);
    const userData = {
      name: name,
      email: email,
      password: password,
      picture: pic,
    };
    if (password !== confirmPassword) {
      enqueueSnackbar("password does not match", { variant: "error" });
      setPicLoading(false);
    }
    try {
      const res = await axios.post("http://localhost:8000/api/user", userData);
      if (!res.status == 200) throw new Error("Data is not Posted");
      enqueueSnackbar("Data was successfully stored", { variant: "success" });
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
            type={passType}
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
        <div className="relative">
          <input
            type={passType}
            placeholder="confirm password"
            required
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="bg-inherit p-2 border-b outline-none placeholder:text-gray-500 w-full "
          />
          <button
            className="absolute top-4 right-0"
            onClick={(e) => showPasswordFunc(e)}
          >
            {showPassword ? <IoEye size={20} /> : <IoEyeOff size={20} />}
          </button>
        </div>
        <div className="flex flex-col gap-3">
          <label htmlFor="profile">Upload Your Picture</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => getPicUrl(e.target.files[0])}
            className="cursor-pointer"
          />
        </div>

        <input
          type="submit"
          disabled={picLoading}
          value={picLoading ? "Loading..." : "SignUp"}
          onClick={(e) => submitHandler(e)}
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
