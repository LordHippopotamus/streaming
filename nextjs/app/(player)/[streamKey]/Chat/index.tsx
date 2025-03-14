"use client";

import { User } from "next-auth";
import { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
import { getUserNameById } from "./actions";
import { PaperAirplaneIcon } from "@heroicons/react/24/outline";

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
    extraHeaders: { room, user: user?.id ? user.id : "" },
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
            className="w-full rounded p-1 border border-slate-500 focus:outline-2 outline-slate-300"
            placeholder="message..."
            value={value}
            onChange={(e) => setValue(e.currentTarget.value)}
          />
          <button className=" p-1 rounded transition bg-slate-500 hover:bg-slate-600 active:bg-slate-700 cursor-pointer">
            <PaperAirplaneIcon className="h-6 w-6" />
          </button>
        </form>
      )}
    </div>
  );
};

export default Chat;
