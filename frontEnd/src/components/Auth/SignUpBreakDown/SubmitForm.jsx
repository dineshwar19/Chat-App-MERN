import React from "react";

const SubmitForm = ({ submitHandler, picLoading }) => {
  return (
    <input
      type="submit"
      disabled={picLoading}
      value={picLoading ? "Loading..." : "SignUp"}
      onClick={(e) => submitHandler(e)}
      className="bg-blue-800 p-2 cursor-pointer rounded-md"
    />
  );
};

export default SubmitForm;
