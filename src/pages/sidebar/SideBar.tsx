import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faDashboard,
  faUser,
  faHotel,
  faDoorOpen,
  faList,
  faSignOut,
  faMobilePhone,
  faAdd,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import axios from "axios";
library.add(
  faDashboard,
  faUser,
  faHotel,
  faDoorOpen,
  faList,
  faSignOut,
  faMobilePhone,
  faAdd
);
const SideBar = () => {
  const navigate = useNavigate();
  const logoutHandle = () => {
    localStorage.removeItem("currentUser");
    axios
      .get(process.env.REACT_APP_HOSTX + "/user/logout", {
        withCredentials: true,
      })
      .then((value) => {})
      .catch((reason) => {
        console.log(reason);
        navigate("/error");
      });
    navigate("/");
  };
  return (
    <div className=" flex flex-col p-3 text-slate-600">
      <div>
        <FontAwesomeIcon
          className="text-violet-600"
          icon={["fas", "dashboard"]}
        />
        <button
          onClick={() => {
            navigate("/dashboard");
          }}
          className="ml-2"
        >
          Dashboard
        </button>
      </div>
      <div>
        <FontAwesomeIcon
          className="text-violet-600"
          icon={["fas", "mobile-phone"]}
        />
        <button
          onClick={() => {
            navigate("/product");
          }}
          className="ml-2"
        >
          Products
        </button>
      </div>
      <div>
        <FontAwesomeIcon className="text-violet-600" icon={["fas", "add"]} />
        <button
          onClick={() => {
            navigate("/new-product");
          }}
          className="ml-2"
        >
          Add New Product
        </button>
      </div>
      <div>
        <FontAwesomeIcon className="text-violet-600" icon={["fas", "user"]} />
        <button
          onClick={() => {
            navigate("/chat");
          }}
          className="ml-2"
        >
          Chat
        </button>
      </div>
      {/*<div>
        <FontAwesomeIcon className="text-violet-600" icon={["fas", "hotel"]} />
        <button
          onClick={() => {
            navigate("/hotel");
          }}
          className="ml-2"
        >
          Hotels
        </button>
      </div>
      <div>
        <FontAwesomeIcon
          className="text-violet-600"
          icon={["fas", "door-open"]}
        />
        <button
          onClick={() => {
            navigate("/room");
          }}
          className="ml-2"
        >
          Rooms
        </button>
      </div>
      <div>
        <FontAwesomeIcon className="text-violet-600" icon={["fas", "list"]} />
        <button
          onClick={() => {
            navigate("/transactions");
          }}
          className="ml-2"
        >
          Transactions
        </button>
      </div>
      <p className="mt-2 font-bold">NEW</p>
      <div>
        <FontAwesomeIcon className="text-violet-600" icon={["fas", "hotel"]} />
        <button
          onClick={() => {
            navigate("/new-hotel");
          }}
          className="ml-2"
        >
          New Hotel
        </button>
      </div>
      <div>
        <FontAwesomeIcon
          className="text-violet-600"
          icon={["fas", "door-open"]}
        />
        <button
          onClick={() => {
            navigate("/new-room");
          }}
          className="ml-2"
        >
          New Room
        </button>
      </div>
      <p className="mt-2 font-bold">USER</p> */}
      <div>
        <FontAwesomeIcon
          className="text-violet-600"
          icon={["fas", "sign-out"]}
        />
        <button onClick={logoutHandle} className="ml-2">
          Logout
        </button>
      </div>
      <p></p>
      <p></p>
      <p></p>
    </div>
  );
};

export default SideBar;
