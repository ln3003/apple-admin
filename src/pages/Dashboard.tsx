import { useEffect, useState } from "react";
import InfoBoard from "./info-board/InfoBoard";
import SideBar from "./sidebar/SideBar";
import Transaction from "./table-transaction/Transaction";
// import { useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [dataTransactions, setDataTransaction] = useState({});
  const navigate = useNavigate();
  useEffect(() => {
    axios
      .get(process.env.REACT_APP_HOSTX + "/order/get-all-orders", {
        withCredentials: true,
      })
      .then((value) => {
        setDataTransaction(value.data);
      })
      .catch((reason) => {
        if (reason.response.status === 500) {
          alert("Only admin or support can access!");
          navigate("/");
        }
      });
  }, [navigate]);
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
        <InfoBoard data={dataTransactions} />
        <Transaction data={dataTransactions} />
      </div>
    </div>
  );
};

export default Dashboard;
