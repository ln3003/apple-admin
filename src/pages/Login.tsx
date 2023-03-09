import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faUser, faKey } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
library.add(faUser, faKey);
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const loginHandle = () => {
    axios
      .post(
        process.env.REACT_APP_HOSTX + "/user/login",
        { email: email, password: password },
        { withCredentials: true }
      )
      .then((value) => {
        if (value.data.role !== "customer") {
          navigate("/dashboard");
        } else {
          alert("Only Admin or Support can access!");
        }
      })
      .catch((reason) => {
        console.log(reason);
        navigate("/error");
      });
  };
  return (
    <div className="bg-gradient-to-r from-cyan-200 via-purple-500 to-pink-500 w-full h-screen pt-24 transition-all duration-500 bg-size-200 bg-pos-0 hover:bg-pos-100 text-slate-600">
      <div className="bg-white w-1/4 h-[500px] rounded-lg shadow-lg mx-auto p-5">
        <h1 className="text-center font-extrabold text-4xl animate-pulse">
          Admin Area
        </h1>
        <div className="flex flex-col gap-1 mt-10 px-8">
          <label className="" htmlFor="username">
            Email
          </label>
          <div className="flex items-center">
            <div className="self-stretch border-b flex items-center">
              <FontAwesomeIcon
                className="text-slate-300 text-2xl"
                icon={["fas", "user"]}
              />
            </div>
            <input
              className="border-b outline-none p-3"
              id="username"
              type="email"
              placeholder="Email"
              value={email}
              onChange={(event) => {
                setEmail(event.target.value);
              }}
            ></input>
          </div>
          <label className="mt-5" htmlFor="password">
            Password
          </label>
          <div className="flex items-center">
            <div className="self-stretch border-b flex items-center">
              <FontAwesomeIcon
                className="text-slate-300 text-2xl"
                icon={["fas", "key"]}
              />
            </div>
            <input
              className="border-b outline-none p-3"
              id="password"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(event) => {
                setPassword(event.target.value);
              }}
            ></input>
          </div>
          <button
            onClick={loginHandle}
            className="py-3 mt-10 text-white rounded-full shadow-md shadow-cyan-100 transition-all duration-500 bg-gradient-to-r from-cyan-200 via-purple-500 to-pink-500 bg-size-200 bg-pos-0 hover:bg-pos-100 hover:animate-pulse"
          >
            LOGIN
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
