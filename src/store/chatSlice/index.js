import { createSlice } from "@reduxjs/toolkit"
import { v4 as uuidv4 } from 'uuid';
import { marked } from "https://cdn.jsdelivr.net/npm/marked/lib/marked.esm.js";
import DOMPurify from 'dompurify';

const initData = {
  data: []
}

const ChatSlice = createSlice({
  name: 'chat',
  initialState: initData,
  reducers: {
    addChat: (state) => {
      state.data.push({
        id: uuidv4(),
        title: 'Chat',
        messages: []
      })
    },
    addMessage: (state, action) => {
      const { idChat, userMess, botMess } = action.payload
      const chat = state.data.find((chat) => chat.id === idChat)
      if (chat) {
        const messageFormat = marked.parse(botMess)
        const safeChat = DOMPurify.sanitize(messageFormat);
        const newMessage = [
          ...chat.messages,
          { id: uuidv4(), title: userMess, isBot: false },
          { id: uuidv4(), title: safeChat, isBot: true },
        ]
        chat.messages = newMessage;
        state.data = [...state.data]
      }
    },
    removeChat: (state, action) => {
      state.data = state.data.filter(item => item.id !== action.payload)
    },
    setNameChat: (state, action) => {
      const { newTitle, chatId } = action.payload;
      const chat = state.data.find(item => item.id === chatId)
      if (chat) {
        chat.title = newTitle
      }
    }

  }
})

export const { addChat, removeChat, addMessage, setNameChat } = ChatSlice.actions;

export default ChatSlice.reducer;