const Transaction = ({ ...props }) => {
  return (
    <div className="shadow-lg mt-5 p-5 text-sm font-semibold">
      <h2 className="font-bold text-xl mb-4">History</h2>
      <table className="border w-full">
        <thead className="text-left bg-violet-200">
          <tr>
            <th className="text-center p-3 border px-1">
              <input type="checkbox" />
            </th>
            <th className="border px-1">ID USER</th>
            <th className="border px-1">NAME</th>
            <th className="border px-1">PHONE</th>
            <th className="border px-1">ADDRESS</th>
            <th className="border px-1">TOTAL</th>
            <th className="border px-1">DELIVERY</th>
            <th className="border px-1">STATUS</th>
            <th className="border px-1">DETAIL</th>
          </tr>
        </thead>
        <tbody>
          {props.data.transactions?.map((x: any) => {
            const total = x.orderItem.reduce((sum: number, x: any) => {
              return sum + x.quantity * Number(x.item.price);
            }, 0);
            const totalWithDot = total
              .toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ".");
            return (
              <tr key={x._id} className="border even:bg-violet-50">
                <td className="text-center p-3 border px-1">
                  <input type="checkbox" />
                </td>
                <td className="border px-1">{x.idUser._id}</td>
                <td className="border px-1">{x.idUser.name}</td>
                <td className="border px-1">{x.idUser.tel}</td>
                <td className="border px-1">{x.address}</td>
                <td className="border px-1">{totalWithDot} VND</td>
                <td className="border px-1">{x.delivery}</td>
                <td className="border px-1">{x.status}</td>
                <td className="border px-1">
                  <div className="px-2 py-1 text-green-600 bg-rose-200 rounded-lg">
                    <button className="px-2 py-1 text-green-600 bg-rose-200 rounded-lg">
                      View &#10144;
                    </button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="  w-full text-end">
        {`1-${props.data.transactions?.length} of ${props.data.orderNumber}`}
        <button className="pr-3 pl-10 font-bold text-xl">{"<"}</button>
        <button className="px-3 font-bold text-xl">{">"}</button>
      </div>
    </div>
  );
};

export default Transaction;
