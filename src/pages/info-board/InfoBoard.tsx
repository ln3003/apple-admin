import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faUser,
  faList,
  faMoneyCheckDollar,
  faWallet,
} from "@fortawesome/free-solid-svg-icons";
library.add(faUser, faList, faMoneyCheckDollar, faWallet);
const InfoBoard = ({ ...props }) => {
  const totalWithDot = props.data.earningNumber
    ?.toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  return (
    <div className=" flex justify-around gap-3 text-slate-600">
      <div className="rounded-lg w-full shadow-xl p-2 flex flex-col">
        <p className="text-sm">Clients</p>
        <p className="text-2xl">{props.data.userNumber}</p>
        <FontAwesomeIcon
          className="text-red-600 self-end"
          icon={["fas", "user"]}
        />
      </div>
      <div className="rounded-lg w-full shadow-xl p-2 flex flex-col">
        <p className="text-sm">Earnings of Month</p>
        <p className="text-2xl">${totalWithDot} VND</p>
        <FontAwesomeIcon
          className="text-green-600 self-end"
          icon={["fas", "money-check-dollar"]}
        />
      </div>
      <div className="rounded-lg w-full shadow-xl p-2 flex flex-col">
        <p className="text-sm">New Order</p>
        <p className="text-2xl">{props.data.orderNumber}</p>
        <FontAwesomeIcon
          className="text-yellow-600 self-end"
          icon={["fas", "list"]}
        />
      </div>
    </div>
  );
};

export default InfoBoard;
