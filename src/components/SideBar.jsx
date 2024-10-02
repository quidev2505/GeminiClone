import React, { useEffect } from "react";
import IconPlus from "../assets/plusIcon.png";
import IconChat from "../assets/chat.png";
import IconRecycle from "../assets/remove.png";
import IconMenu from "../assets/menu.png";
import { useDispatch, useSelector } from "react-redux";
import { addChat, removeChat } from "../store/chatSlice/index";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const SideBar = ({ onToggle }) => {
  const nav = useNavigate();
  const dispatch = useDispatch();
  const { data } = useSelector((state) => state.chat);
  const handleAddChat = () => {
    dispatch(addChat());
  };

  const handleRemoveChat = (e, id) => {
    e.preventDefault();
    dispatch(removeChat(id));
    nav("/");
  };

  return (
    <div className="bg-primayBg-sideBar w-[280px] h-screen text-white p-2">
      <button className="flex p-4 xl:hidden space-x-4" onClick={onToggle}>
        <img src={IconMenu} className="w-10 h-10" alt="icon_menu" />
        <h1 className="text-xl uppercase font-bold mt-2">Gemini</h1>
      </button>
      <div className="mt-20 pl-5">
        <button
          className="px-6 py-1 flex items-center space-x-4 bg-gray-600 rounded-sm h-12"
          onClick={handleAddChat}
        >
          <img src={IconPlus} alt="plus icon" className="w-4 h-4"></img>
          <p>Cuộc trò chuyện mới</p>
        </button>
      </div>
      <div className="space-y-4 mt-8">
        <p>Gần đây</p>
        <div className="flex flex-col space-y-6 mx-2 rounded-sm">
          {data.map((item) => (
            <Link
              to={`/chat/${item?.id}`}
              key={item?.id}
              className="flex items-center justify-between p-2 bg-gray-700"
            >
              <div className="flex space-x-2 p-2 items-center">
                <img src={IconChat} alt="plus icon" className="w-8 h-8"></img>
                <span>{item?.title}</span>
              </div>
              <button onClick={(e) => handleRemoveChat(e, item.id)}>
                <img
                  src={IconRecycle}
                  alt="icon recycle"
                  className="w-6 h-6"
                ></img>
              </button>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SideBar;
