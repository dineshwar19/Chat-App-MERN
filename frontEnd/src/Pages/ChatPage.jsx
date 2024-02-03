import React, { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
const ChatPage = () => {
  const [chats, setChats] = useState([]);
  useEffect(() => {
    const fetchMsg = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/chats");
        if (response.status !== 200) throw new Error("data is not found");
        setChats(response.data);
      } catch (err) {
        console.log(err.message);
      }
    };
    fetchMsg();
  }, []);
  return (
    <div>
      {chats && (
        <ul>
          {chats.map(chat => (
            <li key={chat._id}>
              {chat.chatName}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ChatPage;
