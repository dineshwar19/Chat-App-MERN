import React, { useState } from "react";
import { useSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";
import showPasswordFunc from "./SignUpBreakDown/showPasswordFunc";
import axios from "axios";
import LoginFormComponent from "./LoginBreakDown/LoginFormComponent";

const Login = ({ changeState }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(true);
  const [passType, setpassType] = useState("password");
  const [picLoading, setPicLoading] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
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
      if (!res.status == 200) throw new Error();
      enqueueSnackbar("Successfully Logged", { variant: "success" });
      setPicLoading(false);
      navigate("/chats");
    } catch (error) {
      enqueueSnackbar(`Error : Invalid Email or password`, {
        variant: "error",
      });
      setPicLoading(false);
    }
  };
  const guestCredentials = (e) => {
    e.preventDefault();
    setEmail("guest@gmail.com");
    setPassword("123456");
  };
  return (
    <div>
      <LoginFormComponent
        email={email}
        password={password}
        setEmail={setEmail}
        setPassword={setPassword}
        passType={passType}
        setpassType={setpassType}
        showPassword={showPassword}
        setShowPassword={setShowPassword}
        picLoading={picLoading}
        submitHandler={submitHandler}
        guestCredentials={guestCredentials}
        showPasswordFunc={showPasswordFunc}
        changeState={changeState}
      />
    </div>
  );
};

export default Login;
