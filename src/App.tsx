import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Product from "./pages/Product";
import Dashboard from "./pages/Dashboard";
import NewProduct from "./pages/NewProduct";
import Chat from "./pages/Chat";
import EditProduct from "./pages/EditProduct";
import Error500 from "./pages/Error500";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/new-product" element={<NewProduct />} />
        <Route path="/edit-product/:id" element={<EditProduct />} />
        <Route path="/product" element={<Product />} />
        <Route path="/error" element={<Error500 />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

//https://appleserver.ngh.one
