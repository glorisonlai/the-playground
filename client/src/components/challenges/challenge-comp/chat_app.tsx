import React, { useState } from "react";
import NormalForm from "./normal_form";
import axios from "axios";
import DOMPurify from "dompurify";
import e from "cors";

const ChatApp = ({ callBack }: { callBack: Function }) => {
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");
  const [screen, setScreen] = useState(0);

  const handleChange = (event) => {
    setMsg(event.target.value);
  };

  const sendMsg = async (event) => {
    event.preventDefault();
    if (msg === "") return;
    const el = document.createElement("li");
    el.innerHTML = msg;
    document.querySelector("#support")!.appendChild(el);
    setMsg("");
    const { data } = await axios.get("http://localhost:9000/chat_app.php");
    const response = document.createElement("li");
    response.innerHTML = data;
    document.querySelector("#support")!.appendChild(response);
  };

  const createMsg = (msg: string) => <li>{DOMPurify.sanitize(msg)}</li>;

  return (
    <div className="splitPane">
      <ul id="support">
        <li className="supp">Hi! How can I help you?</li>
      </ul>
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
      <NormalForm id={3} callBack={callBack} />
    </div>
  );
};

export default ChatApp;
