import SideBar from "./sidebar/SideBar";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const EditProduct = () => {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [shortDes, setShortDes] = useState("");
  const [longDes, setLongDes] = useState("");
  const [error, setError] = useState([]);
  const navigate = useNavigate();
  const params = useParams();
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_HOSTX}/product/edit-product/${params.id}`, {
        withCredentials: true,
      })
      .then((value) => {
        setName(value.data.name);
        setCategory(value.data.category);
        setShortDes(value.data.short_desc);
        setLongDes(value.data.long_desc);
      })
      .catch((reason) => {
        console.log(reason);
        navigate("/error");
      });
  }, [params.id, navigate]);
  const handle = () => {
    axios
      .patch(
        process.env.REACT_APP_HOSTX + "/product/edit-product",
        {
          id: params.id,
          name,
          category,
          shortDes,
          longDes,
        },
        {
          withCredentials: true,
        }
      )
      .then((value) => {
        setError([]);
        alert("Product has been update!");
        navigate("/product");
      })
      .catch((reason) => {
        console.log(reason);
        if (reason.response.status === 500) {
          alert("Only admin can do this!");
        } else {
          setError(reason.response.data.errors);
        }
      });
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
        {error.length > 0
          ? error.map((x: any) => {
              return (
                <p className="text-red-600 shadow-ms" key={x.param}>
                  {x.msg}
                </p>
              );
            })
          : ""}
        <div className="shadow-lg pb-5 px-5 text-sm font-semibold">
          <h2 className="font-bold text-xl mb-4">Add New Product</h2>
          <div className="flex  gap-48">
            <div className=" flex flex-col w-full">
              <label htmlFor="name">Product Name</label>
              <input
                className="p-2 border-b mb-3 outline-none"
                id="name"
                type="text"
                placeholder="Enter Product Name"
                value={name}
                onChange={(event) => {
                  setName(event.target.value);
                }}
              ></input>
              <label htmlFor="short">Short Description</label>
              <textarea
                className="p-2 border-b mb-3 outline-none"
                id="short"
                placeholder="Enter Short Description"
                value={shortDes}
                onChange={(event) => {
                  setShortDes(event.target.value);
                }}
              ></textarea>
            </div>
            <div className="flex flex-col w-full">
              <label htmlFor="category">Category</label>
              <input
                className="p-2 border-b mb-3 outline-none"
                id="category"
                type="text"
                placeholder="Enter Category"
                value={category}
                onChange={(event) => {
                  setCategory(event.target.value);
                }}
              ></input>
              <label htmlFor="long">Long Description</label>
              <textarea
                className="p-2 border-b mb-3 outline-none"
                id="long"
                placeholder="Enter Long Description"
                value={longDes}
                onChange={(event) => {
                  setLongDes(event.target.value);
                }}
              ></textarea>
            </div>
          </div>
          <div className=" flex flex-col w-full">
            <label htmlFor="images">Upload Images (4 images)</label>
            <input
              type="file"
              multiple={true}
              className="p-2 border mb-3 outline-none"
              id="images"
              disabled
            ></input>
          </div>
          <button
            onClick={handle}
            className="px-10 py-2 bg-violet-600 text-white mt-3"
          >
            Update
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditProduct;
