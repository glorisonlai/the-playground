import React, { useEffect, useState } from "react";
import NormalForm from "../normal_form";
import axios from "axios";
import DOMPurify from "dompurify";
import "./chat_app.css";
import { SupportUser } from "assets/fontawesome";
import SplitPane from "components/common/split-pane/split-pane";

/**
 * Renders support chat app.
 * Sends messages to server to be delivered to appropriate challenge server
 * Renders normal flag form for submission
 * TODO: Make into websocket for better simulation?
 * @param id Challenge ID
 * @param callBack Switch background once completed
 * @returns Chat app component
 */
const ChatApp = ({ id, callBack }: { id: number; callBack: Function }) => {
  // Prevent user from spamming submit
  const [loading, setLoading] = useState(false);

  // Updates form message
  const [msg, setMsg] = useState("");

  useEffect(() => {
    const chat_box = document.getElementById("support-chat");
    const el = createMsg("Hi! How can I help?", "admin");
    chat_box!.appendChild(el);
  }, []);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMsg(event.target.value);
  };

  // Append message to support chat div, and sends message to server
  const sendMsg = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (loading) return;
    if (!msg) return;
    setLoading(true);
    const chat_box = document.getElementById("support-chat");
    const el = createMsg(msg, "user");
    chat_box!.appendChild(el);
    setMsg("");
    const { data } = await axios.post(
      process.env.REACT_APP_API_URL + "/api/c3/chat",
      { msg: msg }
    );
    const response = createMsg(data, "admin");
    chat_box!.appendChild(response);
    setLoading(false);
  };

  // Securely creates new message component
  const createMsg = (msg: string, user: string) => {
    const chat_row = document.createElement("div");
    chat_row.className = `row justify-${user === "admin" ? "right" : "left"}`;
    const chat_bubble = document.createElement("div");
    chat_bubble.innerHTML = DOMPurify.sanitize(msg);
    chat_bubble.className = `talk-bubble ${user}`;
    chat_row.appendChild(chat_bubble);
    return chat_row;
  };

  return (
    <SplitPane>
      <div id="support-pane" className="support">
        {/* Blue header */}
        <div id="support-header">
          <SupportUser />
          <>Tech Support</>
        </div>
        {/* Chat pane */}
        <div id="support-chat" />
        {/* Text Input */}
        <form id="support-msg" onSubmit={sendMsg}>
          <input
            type="text"
            id="support-msg-text"
            name="flag"
            placeholder="Type here..."
            value={msg}
            onChange={handleChange}
          />
          <input id="support-msg-submit" type="submit" value="Send" />
        </form>
      </div>
      <NormalForm id={id} callBack={callBack} />
    </SplitPane>
  );
};

export default ChatApp;
