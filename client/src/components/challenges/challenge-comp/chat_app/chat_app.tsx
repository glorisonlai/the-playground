import React, { useState } from "react";
import NormalForm from "../normal_form";
import axios from "axios";
import DOMPurify from "dompurify";
import "./chat_app.css";

const ChatApp = ({ id, callBack }: { id: number; callBack: Function }) => {
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");
  const [lastMsg, setLastMsg] = useState(1);
  const [screen, setScreen] = useState(0);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMsg(event.target.value);
  };

  const sendMsg = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (msg === "") return;
    const el = document.createElement("div");
    el.innerHTML = msg;
    document.querySelector("#support-chat")!.appendChild(el);
    setMsg("");
    const { data } = await axios.post(
      process.env.REACT_APP_API_URL + "/api/c3/chat",
      { msg: msg }
    );
    const response = document.createElement("li");
    response.innerHTML = data;
    document.querySelector("#support")!.appendChild(response);
  };

  const createMsg = (msg: string) => <li>{DOMPurify.sanitize(msg)}</li>;

  return (
    <div className="splitPane">
      <div className="panel">
        <div className="support-pane">
          <ul id="support-chat">
            <div className="talk-bubble tri-right left-top">
              Hi! How can I help you? afeeahjsfgjeaskhfiesahgfaeshfiasufhoiase
            </div>
          </ul>
        </div>
        <form onSubmit={sendMsg}>
          <input
            className="flag"
            type="text"
            id="flag"
            name="flag"
            placeholder=""
            value={msg}
            onChange={handleChange}
          />
          <input className="flag" type="submit" value="Send" />
        </form>
      </div>
      <NormalForm id={id} callBack={callBack} />
    </div>
  );
};

export default ChatApp;
