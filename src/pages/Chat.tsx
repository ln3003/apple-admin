import SideBar from "./sidebar/SideBar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faPaperPlane, faUser } from "@fortawesome/free-solid-svg-icons";
import { io } from "socket.io-client";
import { useEffect, useState } from "react";
const socket = io(process.env.REACT_APP_HOSTX, { withCredentials: true });
socket.on("connect", () => {});
library.add(faPaperPlane, faUser);
const Chat = () => {
  const [roomIds, setRoomIds] = useState([]);
  const [message, setMessage] = useState("");
  const [email, setEmail] = useState("");
  const [conversation, setConversation] = useState([]);
  useEffect(() => {
    socket.on("adminGetUserChat", (arg) => {
      setConversation(arg);
    });
    socket.on("conversation", (arg) => {
      setConversation(arg);
    });
    socket.emit("getUserOnline", "getUserOnline");
    socket.on("useronline", (arg) => {
      setRoomIds(arg);
    });
  }, []);

  const sendMessage = () => {
    socket.emit("send", { isAdmin: true, message });
    setMessage("");
  };
  return (
    <div className="grid grid-cols-[200px_auto] grid-rows-[60px_auto] text-slate-600">
      <div className=" border">
        <h1 className="text-center p-3 font-bold text-xl text-violet-600">
          Admin Page
        </h1>
      </div>
      <div className="border "></div>
      <div className="border ">
        <SideBar />
      </div>
      <div className="border p-5">
        <div className="shadow-lg pb-5 px-5 font-semibold">
          <h2 className="font-bold text-xl mb-4">Chat</h2>
          <div className=" w-full h-[500px] flex border">
            <div className="border-r w-1/6">
              {roomIds.map((x) => {
                return (
                  <div
                    key={x}
                    onClick={() => {
                      socket.emit("adminJoin", x);
                      setEmail(x);
                    }}
                    className={`flex items-center gap-1 p-3 cursor-pointer hover:text-violet-800 ${
                      x === email && "bg-violet-100"
                    }`}
                  >
                    <FontAwesomeIcon
                      className="text-violet-600"
                      icon={["fas", "user"]}
                    />
                    <div className=" w-full">{x}</div>
                  </div>
                );
              })}
            </div>
            <div className=" w-5/6 flex flex-col">
              <div className=" h-5/6 overflow-scroll flex flex-col-reverse scrollbar">
                {conversation.map((x: any) => {
                  return x.isAdmin ? (
                    <div key={Math.random()} className="flex justify-end p-3">
                      <div className="bg-violet-900 text-white px-3 py-1 rounded-full shadow-md">
                        {x.message}
                      </div>
                    </div>
                  ) : (
                    <div
                      key={Math.random()}
                      className="flex items-center gap-1 p-3"
                    >
                      <FontAwesomeIcon
                        className="text-violet-600 text-2xl"
                        icon={["fas", "user"]}
                      />
                      <div className=" bg-violet-100 px-3 py-1 text-violet-500 rounded-full shadow-md">
                        <span className="text-violet-800">
                          {"["}
                          {email}
                          {"] "}
                        </span>
                        {x.message}
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className=" h-1/6 flex items-center gap-4 pr-3 border-t">
                <input
                  className="w-full h-full p-2"
                  placeholder="Type and enter"
                  value={message}
                  onChange={(event) => {
                    setMessage(event.target.value);
                  }}
                  onKeyDown={(event) => {
                    if (event.key === "Enter") {
                      sendMessage();
                    }
                  }}
                />
                <FontAwesomeIcon
                  className="text-violet-600 text-5xl"
                  icon={["fas", "paper-plane"]}
                  onClick={sendMessage}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
