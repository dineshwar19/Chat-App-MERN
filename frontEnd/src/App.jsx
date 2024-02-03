import { Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import ChatPage from "./Pages/ChatPage";
import loginImage from "./assets/loginImage.webp";
function App() {
  return (
    <div
      className="min-h-screen"
      style={{
        background: `url(${loginImage}) `,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
    >
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/chats" element={<ChatPage />} />
      </Routes>
    </div>
  );
}

export default App;
