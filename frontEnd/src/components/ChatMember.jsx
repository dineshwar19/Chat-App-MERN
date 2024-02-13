import React, { useContext, useEffect, useState } from "react";
import { useSnackbar } from "notistack";
import axios from "axios";
import ChatContext from "../context/ChatContext";
import { FaPlus } from "react-icons/fa";
import { getSender } from "../chatLogics/getSender";
import GroupChatModal from "./GroupChatModal";

const ChatMember = () => {
  const [loggedUser, setLoggedUser] = useState();
  const { selectedChat, setSelectedChat, user, chats, setChats } =
    useContext(ChatContext);
  const [showModal, setShowModal] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const fetchChats = async () => {
    // console.log(user._id);
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.get(
        "http://localhost:8000/api/chat",
        config
      );
      setChats(data);
    } catch (err) {
      enqueueSnackbar("Error occured", { variant: "error" });
    }
  };
  useEffect(() => {
    setLoggedUser(JSON.parse(localStorage.getItem("userInfo")));
    fetchChats();
  }, []);


  return (
    <div
      className={`
        ${
          selectedChat ? "hidden" : "smd:flex smd:flex-col"
        } bg-white h-full text-black px-3 py-2 w-1/3 overflow-y-scroll min-h-screen gap-2`}
    >
      <div className="flex justify-between w-full items-center gap-10">
        <h1>My Chats</h1>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 hover:bg-gray-400 rounded-md p-2"
        >
          <FaPlus />
          New Group
        </button>
        <GroupChatModal showModal={showModal} setShowModal={setShowModal} />
      </div>
      <div>
        {chats ? (
          <div className="flex flex-col gap-3">
            {chats.map((chat) => (
              <div
                onClick={() => setSelectedChat(chat)}
                className={`cursor-pointer ${
                  selectedChat === chat
                    ? "bg-teal-500 text-white"
                    : "bg-gray-500 text-black"
                } px-3 py-2 rounded-md`}
                key={chat._id}
              >
                <h1 className="text-white font-semibold">
                  {!chat.isGroupChat
                    ? getSender(loggedUser, chat.users)
                    : chat.chatName}
                </h1>
              </div>
            ))}
          </div>
        ) : (
          "loading..."
        )}
      </div>
    </div>
  );
};

export default ChatMember;
