import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SideBar from "./sidebar/SideBar";

const Product = () => {
  const [dataTransactions, setDataTransactions] = useState([]);
  const [search, setSearch] = useState("");
  const [render, setRender] = useState(0);
  const navigate = useNavigate();
  useEffect(() => {
    axios
      .get(process.env.REACT_APP_HOSTX + "/product/get-product", {
        withCredentials: true,
      })
      .then((value) => {
        setDataTransactions(value.data);
      })
      .catch((reason) => {
        console.log(reason);
        navigate("/error");
      });
  }, [render, navigate]);
  const deleteHandle = (id: string) => {
    if (window.confirm("Are you sure ?")) {
      axios
        .delete(`${process.env.REACT_APP_HOSTX}/product/delete-product/${id}`, {
          withCredentials: true,
        })
        .then((value) => {
          console.log(value);
          setRender(Math.random());
        })
        .catch((reason) => {
          console.log(reason);
          if (reason.response.status === 500) {
            alert("Only admin can do this!");
          }
        });
    }
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
          <div className="flex gap-2 items-center mb-4">
            <h2 className="font-bold text-xl">Products</h2>
            <input
              className="border border-violet-200"
              type="text"
              value={search}
              onChange={(event) => {
                setSearch(event.target.value);
                axios
                  .post(
                    process.env.REACT_APP_HOSTX + "/product/get-product",
                    { value: event.target.value },
                    {
                      withCredentials: true,
                    }
                  )
                  .then((value) => {
                    setDataTransactions(value.data);
                  })
                  .catch((reason) => {
                    console.log(reason);
                  });
              }}
              placeholder="Enter Search!"
            />
            <button
              onClick={() => {
                navigate("/new-product");
              }}
              className="text-green-600 border-green-600 border px-2 py-1 rounded-lg"
            >
              Add New
            </button>
          </div>
          <table className="border w-full">
            <thead className="text-left bg-violet-200">
              <tr>
                <th className="text-center p-3 border px-1">
                  <input type="checkbox" />
                </th>
                <th className="border px-1">ID</th>
                <th className="border px-1">Name</th>
                <th className="border px-1">Price</th>
                <th className="border px-1">Image</th>
                <th className="border px-1">Category</th>
                <th className="border px-1">Edit</th>
              </tr>
            </thead>
            <tbody>
              {dataTransactions?.map((x: any) => {
                const price = x.price
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ".");
                return (
                  <tr key={x._id} className="border even:bg-violet-50">
                    <td className="text-center p-3 border px-1">
                      <input type="checkbox" />
                    </td>
                    <td className="border px-1">{x._id}</td>
                    <td className="border px-1">{x.name}</td>
                    <td className="border px-1">{price} VND</td>
                    <td className="border px-1">
                      <img className="w-24 mx-auto" src={x.img1} alt={x.name} />
                    </td>
                    <td className="border px-1">{x.category}</td>
                    <td className="border px-1">
                      <button
                        onClick={() => {
                          navigate(`/edit-product/${x._id}`);
                        }}
                        className="text-blue-600 border-blue-600 border px-2 py-1 rounded-lg"
                      >
                        Update
                      </button>
                      <button
                        onClick={() => {
                          deleteHandle(x._id);
                        }}
                        className="text-rose-600 border-rose-600 border px-2 py-1 rounded-lg ml-1"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <div className="  w-full text-end">
            {`1-${dataTransactions?.length} of ${dataTransactions?.length}`}
            <button className="pr-3 pl-10 font-bold text-xl">{"<"}</button>
            <button className="px-3 font-bold text-xl">{">"}</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
