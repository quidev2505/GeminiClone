import { Outlet } from "react-router-dom";
import SideBar from "./components/SideBar";
import Gemini from "../src/gemini/index";
import { useEffect } from "react";
import { addChat } from "./store/chatSlice/index";

function App() {
  return (
    <>
      <div className="bg-primayBg-default h-screen flex">
        <div className="hidden xl:block">
          <SideBar />
        </div>
        <Outlet />
      </div>
    </>
  );
}

export default App;
