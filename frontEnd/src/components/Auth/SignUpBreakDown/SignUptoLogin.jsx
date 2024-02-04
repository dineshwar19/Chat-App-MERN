import React from "react";

const SignUptoLogin = ({changeState}) => {
  return (
    <div className="flex gap-3">
      <b>Already have an account?</b>
      <span
        className="text-blue-600 cursor-pointer hover:underline"
        onClick={changeState}
      >
        Log in
      </span>
    </div>
  );
};

export default SignUptoLogin;
