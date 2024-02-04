import React from "react";

const LoginToSignIn = ({ changeState }) => {
  return (
    <div className="flex gap-3">
      <b>No account ?</b>
      <span
        className="text-blue-600 cursor-pointer hover:underline"
        onClick={changeState}
      >
        Create one
      </span>
    </div>
  );
};

export default LoginToSignIn;
