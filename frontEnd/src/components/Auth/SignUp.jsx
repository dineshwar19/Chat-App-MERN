import React, { useState } from "react";
import { useSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import FormComponent from "./SignUpBreakDown/FormComponent";
const SignUp = ({ changeState }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [pic, setPic] = useState("");
  const [showPassword, setShowPassword] = useState(true);
  const [passType, setpassType] = useState("password");
  const [picLoading, setPicLoading] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

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
      console.log(res.data);
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
      <FormComponent
        name={name}
        email={email}
        password={password}
        confirmPassword={confirmPassword}
        showPassword={showPassword}
        passType={passType}
        picLoading={picLoading}
        setName={setName}
        setEmail={setEmail}
        setPassword={setPassword}
        setConfirmPassword={setConfirmPassword}
        setShowPassword={setShowPassword}
        setpassType={setpassType}
        setPicLoading={setPicLoading}
        submitHandler={submitHandler}
        changeState={changeState}
        enqueueSnackbar={enqueueSnackbar}
        setPic={setPic}
      />
    </div>
  );
};

export default SignUp;
