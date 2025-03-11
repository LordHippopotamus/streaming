"use client";

import { User } from "next-auth";
import { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
import { getUserNameById } from "./actions";

type Message = { message: string; user: string; id: string };

const Chat = ({
  user,
  room,
  socketIoUrl,
}: {
  user?: User;
  room: string;
  socketIoUrl: string;
}) => {
  const socket = io(socketIoUrl, {
    extraHeaders: { room, user: user ? user.id : "" },
  });
  const [messages, setMessages] = useState<Message[]>([]);
  const [value, setValue] = useState("");
  const messagesRef = useRef<HTMLDivElement | null>(null);

  const sendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!value) return;
    socket.emit("sendMessage", value);
    setValue("");
  };
  const onMessage = async (data: Message) => {
    const userName = await getUserNameById(data.user);
    setMessages((prev) => [...prev, { ...data, user: userName }]);
  };

  useEffect(() => {
    if (!messagesRef.current) return;
    messagesRef.current.lastElementChild?.scrollIntoView({
      behavior: "smooth",
      block: "end",
    });
  }, [messages]);

  useEffect(() => {
    socket.on("message", onMessage);
    return () => {
      socket.off("message", onMessage);
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="w-72 flex flex-col overflow-hidden bg-slate-950">
      <div className="flex-1 p-1 overflow-y-auto" ref={messagesRef}>
        <div className="flex flex-col justify-end">
          {messages.map((el) => (
            <div key={el.id}>
              {el.user}: {el.message}
            </div>
          ))}
        </div>
      </div>
      {user && (
        <form
          onSubmit={sendMessage}
          className="bg-slate-800 p-4 flex items-center gap-1"
        >
          <input
            className="w-full text-slate-900 rounded p-1 focus:outline outline-slate-700"
            placeholder="message..."
            value={value}
            onChange={(e) => setValue(e.currentTarget.value)}
          />
          <button className="w-8 h-8 p-1 rounded transition bg-slate-500 hover:bg-slate-600 active:bg-slate-700">
            <svg
              data-slot="icon"
              aria-hidden="true"
              fill="none"
              strokeWidth="1.5"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></path>
            </svg>
          </button>
        </form>
      )}
    </div>
  );
};

export default Chat;
