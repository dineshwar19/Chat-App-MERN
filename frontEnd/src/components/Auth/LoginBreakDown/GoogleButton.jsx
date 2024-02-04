import React from "react";

const GoogleButton = ({ FcGoogle }) => {
  return (
    <button
      disabled
      className="w-full flex items-center justify-center gap-3 bg-black border border-white p-2 rounded-md"
    >
      <FcGoogle size={30} />
      <span>Continue with Google</span>
    </button>
  );
};

export default GoogleButton;
