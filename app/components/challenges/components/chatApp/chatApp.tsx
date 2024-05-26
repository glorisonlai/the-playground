import { useEffect, useState } from "react";
import styles from "styles/chatApp.module.scss";
import { SupportUser } from "components/icons";

import type { ChangeEvent, FormEvent } from "react";

/**
 * Renders support chat app.
 * Sends messages to server to be parsed
 * Renders normal flag form for submission
 * TODO: Make into websocket for better simulation?
 * @param id Challenge ID
 * @param callBack Switch background once completed
 * @returns Chat app component
 */
const ChatApp = () => {
  const ChatPane = () => {
    // Prevent user from spamming submit
    const [loading, setLoading] = useState(false);

    // Updates form message
    const [msg, setMsg] = useState("");

    enum MessageType {
      Admin = "admin",
      User = "user",
    }

    useEffect(() => {
      const chat_box = document.getElementById("supportChat");
      const el = createMsg("Hi! How can I help?", MessageType.Admin);
      chat_box!.appendChild(el);
    }, []);

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
      setMsg(event.target.value);
    };

    // Append message to support chat div, and sends message to server
    const sendMsg = async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      if (loading) return;
      if (!msg) return;
      setLoading(true);
      const chat_box = document.getElementById("supportChat");
      const el = createMsg(msg, MessageType.User);
      chat_box!.appendChild(el);
      setMsg("");
      const res = await fetch(process.env.REACT_APP_API_URL + "/c3/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ msg: msg }),
      });
      if (res.status !== 200) {
        // Do error handling here
        return;
      }
      const response = createMsg(await res.json(), MessageType.Admin);
      chat_box!.appendChild(response);
      setLoading(false);
    };

    // Securely creates new message component - apparently don't need to? but might as well
    const createMsg = (msg: string, user: string) => {
      const chat_row = document.createElement("div");
      chat_row.className =
        user === MessageType.Admin ? styles.justifyRight : styles.justifyLeft;
      const userClass = user === MessageType.Admin ? styles.admin : styles.user;
      const chat_bubble = document.createElement("div");
      chat_bubble.innerHTML = msg;
      chat_bubble.className = `${styles.talkBubble} ${userClass}`;
      chat_row.appendChild(chat_bubble);
      return chat_row;
    };

    return (
      <>
        {/* Chat pane */}
        <div id="supportChat" className={styles.supportChat} />
        {/* Text Input */}
        <form className={styles.supportMsg} onSubmit={sendMsg}>
          <input
            type="text"
            className={styles.supportMsgText}
            name="flag"
            placeholder="Type here..."
            value={msg}
            autoComplete="off"
            onChange={handleChange}
          />
          <input className={styles.supportMsgSubmit} type="submit" value="💌" />
        </form>
      </>
    );
  };

  const names = ["Mark", "Emily", "Tim", "Rebecca", "Augustus"];

  const selectRandom = <T extends unknown>(arr: T[]): T =>
    arr[Math.floor(Math.random() * arr.length)];

  return (
    <div className={styles.supportPane}>
      {/* Blue header */}
      <div className={styles.supportHeader}>
        <SupportUser />
        <div className={styles.supportName}>{selectRandom(names)}</div>
      </div>
      <ChatPane />
    </div>
  );
};

export default ChatApp;
