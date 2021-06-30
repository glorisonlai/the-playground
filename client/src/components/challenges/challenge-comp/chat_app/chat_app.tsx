import React, { useState } from "react";
import NormalForm from "../normal_form";
import axios from "axios";
import DOMPurify from "dompurify";
import "./chat_app.css";
import { SupportUser } from "assets/fontawesome";
import SplitPane from "components/split-pane/split-pane";

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

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMsg(event.target.value);
  };

  // Append message to support chat div, and sends message to server
  const sendMsg = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (loading) return;
    if (!msg) return;
    setLoading(true);
    const el = document.createElement("div");
    el.innerHTML = msg;
    el.className = "talk-bubble user";
    document.querySelector("#support-chat")!.appendChild(el);
    setMsg("");
    const { data } = await axios.post(
      process.env.REACT_APP_API_URL + "/api/c3/chat",
      { msg: msg }
    );
    const response = document.createElement("li");
    response.innerHTML = data;
    document.querySelector("#support")!.appendChild(response);
    setLoading(false);
  };

  // Securely creates new message component
  const createMsg = (msg: string) => <li>{DOMPurify.sanitize(msg)}</li>;

  return (
    <SplitPane>
      <div id="support-pane" className="support">
        {/* Blue header */}
        <div id="support-header">
          <SupportUser />
          <>Tech Support</>
        </div>
        {/* Chat pane */}
        <ul id="support-chat">
          <div className="talk-bubble admin">Hi! How can I help?</div>
        </ul>
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
