import SideBar from "./sidebar/SideBar";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const NewProduct = () => {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [shortDes, setShortDes] = useState("");
  const [longDes, setLongDes] = useState("");
  const [image, setImage] = useState<string[]>([]);
  const [error, setError] = useState([]);
  const navigate = useNavigate();
  const handle = () => {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("category", category);
    formData.append("shortDes", shortDes);
    formData.append("longDes", longDes);
    for (let key in image) {
      formData.append("image", image[key]);
    }

    axios
      .post(process.env.REACT_APP_HOSTX + "/product/add-product", formData, {
        withCredentials: true,
      })
      .then((value) => {
        setError([]);
        alert("New Product has been added!");
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
              onChange={(event: any) => {
                setImage(event.target.files);
              }}
            ></input>
          </div>
          <button
            onClick={handle}
            className="px-10 py-2 bg-violet-600 text-white mt-3"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewProduct;
