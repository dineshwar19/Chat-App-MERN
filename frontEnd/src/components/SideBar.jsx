import React, { useContext, useState } from "react";
import { IoSearch } from "react-icons/io5";
import { FiBell } from "react-icons/fi";
import ChatContext from "../context/ChatContext";
import "flowbite";
import { Avatar, Dropdown } from "flowbite-react";
import { useNavigate } from "react-router-dom";
import Drawer from "./Drawer";
import ProfileModal from "./ProfileModal";
const SideBar = () => {
  const { user } = useContext(ChatContext);
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState(false);
  const [openLeft, setOpenLeft] = useState(false);
  const logOutUser = () => {
    localStorage.removeItem("userInfo");
    navigate("/");
  };
  return (
    <div className="bg-white text-black p-4 flex justify-between items-center">
      <button
        className="items-center gap-3 hidden smd:flex px-2 py-1 rounded-md transition-hover duration-200 hover:bg-gray-500 hover:text-white w-fit "
        onClick={() => setOpenLeft(!openLeft)}
      >
        <IoSearch size={20} />
        <span className="">Search</span>
      </button>

      <div>
        <h1 className="text-2xl font-bold">My Chat app</h1>
      </div>

      <div className="flex justify-center items-center gap-2">
        <FiBell size={20} />

        <Dropdown
          label={
            <Avatar
              alt="User settings"
              img={
                user.picture
                  ? user.picture
                  : "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
              }
              rounded
            />
          }
          arrowIcon={false}
          inline
        >
          <Dropdown.Item
            className="flex flex-col items-start"
            onClick={() => setOpenModal(true)}
          >
            <div className="">{user.name}</div>
            <div className="">{user.email}</div>
          </Dropdown.Item>

          <Dropdown.Item onClick={logOutUser}>Sign out</Dropdown.Item>
        </Dropdown>
        <Drawer open={openLeft} side="left" setOpen={setOpenLeft} />
        {/* <ProfileModal openModal={openModal} setOpenModal={setOpenModal} /> */}
      </div>
    </div>
  );
};

export default SideBar;
