import React from "react";

const SearchUserList = ({ user, showUser }) => {
  return (
    <div
      className="relative hover:bg-gray-400 cursor-pointer p-2 rounded-md mt-4"
      onClick={showUser}
    >
      <img
        src={user.picture}
        alt=""
        width={30}
        className="rounded-full absolute right-2 top-4" 
      />
      <p>{user.name}</p>
      <b>{user.email}</b>
    </div>
  );
};

export default SearchUserList;
