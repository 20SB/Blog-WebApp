import React from "react";
import { useNavigate } from "react-router-dom";

const ChatProvider = ({ children }) => {
    return <ChatContext.Provider>{children}</ChatContext.Provider>;
};


export default ChatProvider;