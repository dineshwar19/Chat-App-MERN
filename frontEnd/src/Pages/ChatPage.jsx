import React, { useContext, useEffect } from "react";
import ChatContext from "../context/ChatContext";
import SideBar from "../components/SideBar";
import ChatMember from "../components/ChatMember";
import ChatBox from "../components/ChatBox";

const ChatPage = () => {
  const { user } = useContext(ChatContext);
  return (
    <div className="text-white">
      <div>
        {user && <SideBar />}
      </div>

      <div className="flex justify-between">
        {user && <ChatMember />}
        {user && <ChatBox />}
      </div>
    </div>
  );
};

export default ChatPage;
