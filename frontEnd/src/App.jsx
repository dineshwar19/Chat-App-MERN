import { Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import ChatPage from "./Pages/ChatPage";
function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/chats" element={<ChatPage />} />
      </Routes>
    </div>
  );
}

export default App;
