import React from "react";
import ImageUpload from "./ImageUpload";
import SignUptoLogin from "./SignUptoLogin";
import SubmitForm from "./SubmitForm";
import { IoEye } from "react-icons/io5";
import { IoEyeOff } from "react-icons/io5";
import showPasswordFunc from "./showPasswordFunc";
import getPicUrl from "./getPicUrl";
const FormComponent = ({
  name,
  email,
  password,
  confirmPassword,
  showPassword,
  passType,
  picLoading,
  setName,
  setEmail,
  setPassword,
  setPic,
  setConfirmPassword,
  setShowPassword,
  setPicLoading,
  setpassType,
  submitHandler,
  changeState,
  enqueueSnackbar,
}) => {
  return (
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
          onClick={(e) =>
            showPasswordFunc(e, setpassType, setShowPassword, showPassword)
          }
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
          onClick={(e) =>
            showPasswordFunc(e, setpassType, setShowPassword, showPassword)
          }
        >
          {showPassword ? <IoEye size={20} /> : <IoEyeOff size={20} />}
        </button>
      </div>
      <ImageUpload
        getPicUrl={getPicUrl}
        enqueueSnackbar={enqueueSnackbar}
        setPic={setPic}
        setPicLoading={setPicLoading}
      />

      <SubmitForm submitHandler={submitHandler} picLoading={picLoading} />

      <SignUptoLogin changeState={changeState} />
    </form>
  );
};

export default FormComponent;
