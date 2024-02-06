import React, { useContext, useState } from "react";
import { IoSearch } from "react-icons/io5";
import { FiBell } from "react-icons/fi";
import ChatContext from "../context/ChatContext";
import "flowbite";
import "flowbite-react";
// import ProfileModal from "./ProfileModal";
import { useNavigate } from "react-router-dom";
import Drawer from "./Drawer";
const SideBar = () => {
  const { user } = useContext(ChatContext);
  const navigate = useNavigate();
  // const [isOpen, setIsOpen] = useState(false);
  const [openLeft, setOpenLeft] = useState(false);
  // const open = () => {
  //   setIsOpen(!isOpen);
  // };
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

        <img
          id="avatarButton"
          type="button"
          data-dropdown-toggle="userDropdown"
          data-dropdown-placement="bottom-start"
          class="w-10 h-10 rounded-full cursor-pointer"
          src={
            user.picture
              ? user.picture
              : "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
          }
          alt={user.name.charAt(0)}
        />

        {/* <!-- Dropdown menu --> */}
        <div
          id="userDropdown"
          class="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600"
        >
          <ul
            class="py-2 text-sm text-gray-700 dark:text-gray-200"
            aria-labelledby="avatarButton"
          >
            <li>
              <button
                data-modal-target="static-modal"
                data-modal-toggle="static-modal"
                class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white w-full"
                type="button"
                // onClick={open}
              >
                My Profile
              </button>
              {/* <ProfileModal isOpen={isOpen} /> */}
            </li>
          </ul>
          <div class="py-1">
            <button
              class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white w-full"
              onClick={logOutUser}
            >
              Log out
            </button>
          </div>
        </div>
        <Drawer open={openLeft} side="left" setOpen={setOpenLeft} />
      </div>
    </div>
  );
};

export default SideBar;
