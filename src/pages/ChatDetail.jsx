import React, { useEffect, useState, useRef } from "react";
import ImageAI from "../assets/temp.jpeg";
import IconMenu from "../assets/menu.png";
import SideBar from "../components/SideBar";
import IconStar from "../assets/star.png";
import { useParams } from "react-router-dom";
import { addChat } from "../store/chatSlice/index";
import { useSelector } from "react-redux";
import Gemini from "../gemini/index";
import { useDispatch } from "react-redux";
import { addMessage, setNameChat } from "../store/chatSlice/index";

const ChatDetail = () => {
  const [menuToggle, setMenuToggle] = useState(false);
  const [dataDetail, setDataDetail] = useState({});
  const [messageDetail, setMessageDetail] = useState([]);
  const [inputChat, setInputChat] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const { id } = useParams();

  const { data } = useSelector((state) => state.chat);
  const dispatch = useDispatch();

  useEffect(() => {
    if (data.length > 0) {
      const chat = data.find((chat) => chat.id === id);
      if (chat) {
        scrollToBottom();
        setDataDetail(chat);
        setIsLoading(false);
        setMessageDetail(chat.messages);
      }
    }
  }, [data, id]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleChatDetail = async () => {
    if (id && inputChat.trim().length > 0) {
      setIsLoading(true);
      const chatText = await Gemini(inputChat, messageDetail);
      if (dataDetail.title === "Chat") {
        const promptName = `This is a new chat, and user ask about ${inputChat}. No rely and comment just give me a name for this chat, Max length is 10 characters`;
        const newTitle = await Gemini(promptName);
        dispatch(setNameChat({ newTitle, chatId: id }));
      }
      if (chatText) {
        const dataMessage = {
          idChat: id,
          userMess: inputChat,
          botMess: chatText,
        };

        setInputChat("");
        dispatch(addMessage(dataMessage));
      }
    }
  };

  return (
    <div className="text-white xl:w-[80%] p-4 w-full relative">
      <div className="flex space-x-3 md:hidden">
        <button onClick={() => setMenuToggle(!menuToggle)}>
          <img src={IconMenu} className="w-10 h-10" alt="icon_menu" />
        </button>
        <h1 className="text-xl uppercase font-bold mt-2">Gemini</h1>
      </div>
      <h1 className="text-xl uppercase font-bold mt-2 hidden md:block">
        Gemini
      </h1>
      {menuToggle && (
        <div className="absolute h-full top-0 left-0 block md:hidden">
          <SideBar onToggle={() => setMenuToggle(!menuToggle)} />
        </div>
      )}
      {id ? (
        <div className="flex flex-col space-y-4 p-4 h-[450px] mt-24 overflow-x-hidden overflow-y-auto mb-10">
          {Array.isArray(messageDetail) &&
            messageDetail.map((item) => (
              <div className="flex items-center space-x-10" key={item.id}>
                <div className="flex space-x-6">
                  {item.isBot ? (
                    <>
                      <img
                        src={IconStar}
                        alt="star"
                        className="w-full h-full max-w-12 max-h-12"
                      />
                      <p>
                        <p dangerouslySetInnerHTML={{ __html: item.title }} />
                      </p>
                    </>
                  ) : (
                    <div className="border flex space-x-9 rounded-md border-gray-300 p-2">
                      <p>User</p>
                      <p>{item.title}</p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          <div ref={messagesEndRef} />
        </div>
      ) : (
        <div className="max-w-[90%] w-full mx-auto mt-32">
          <div className="flex flex-col space-y-5">
            <div className="space-y-1">
              <h2
                className="bg-gradient-to-r from-blue-600 via-green-500
            to-indigo-400 text-[30px] inline-block text-transparent bg-clip-text font-bold"
              >
                Xin Chào
              </h2>
              <p className="text-3xl">Hôm nay tôi có thể giúp gì cho bạn</p>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-[200px] h-[200px] bg-primayBg-sideBar flex items-center justify-center rounded-lg">
                <p>Lên kế hoạch bữa ăn</p>
              </div>
              <div className="w-[200px] h-[200px] bg-primayBg-sideBar flex items-center justify-center rounded-lg">
                <p>Cụm từ ngôn ngữ mới</p>
              </div>
              <div className="w-[200px] h-[200px] bg-primayBg-sideBar flex items-center justify-center rounded-lg">
                <p>Bí quyết viết thư xin việc</p>
              </div>
              <div className="w-[200px] h-[200px] bg-primayBg-sideBar flex items-center justify-center rounded-lg flex-col">
                <p>Tạo hình ảnh với AI</p>
                <img
                  src={ImageAI}
                  alt="Image AI"
                  className="w-[150px] h-[150px]"
                ></img>
              </div>
            </div>
          </div>
        </div>
      )}
      {isLoading === true ? (
        <div className="animate-pulse pl-4 text-red-300 italic">
          Vui lòng chờ...
        </div>
      ) : (
        ""
      )}

      <div className="flex items-center space-x-4 w-full mt-4 ml-2">
        <input
          value={inputChat}
          type="text"
          placeholder="Nhập câu lệnh tại đây"
          className="p-4 rounded-lg bg-primayBg-default w-[95%] border"
          onChange={(e) => setInputChat(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              handleChatDetail();
            }
          }}
        />
        <button
          className="p-4 rounded-lg bg-green-500 text-white"
          onClick={handleChatDetail}
        >
          Gửi
        </button>
      </div>
    </div>
  );
};

export default ChatDetail;
