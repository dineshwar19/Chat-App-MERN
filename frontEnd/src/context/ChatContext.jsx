import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
  const [user, setUser] = useState();
  const navigate = useNavigate();
  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("userInfo"));
    setUser(userData);
    if(!userData) navigate("/")
  }, [navigate]);
  return (
    <ChatContext.Provider
      value={{
        user,
        setUser,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export default ChatContext;
