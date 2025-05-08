import { Fragment, useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createNewProduct } from "../../actions/productActions";
import { clearError, clearProductCreated } from "../../slices/productSlice";
import { toast } from "react-toastify";

export default function NewProduct() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [stock, setStock] = useState(0);
  const [seller, setSeller] = useState("");
  const [images, setImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);

  const { loading, isProductCreated, error } = useSelector(
    (state) => state.productState
  );

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onImagesChange = (e) => {
    const files = Array.from(e.target.files);

    files.forEach((file) => {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setImagesPreview((oldArray) => [...oldArray, reader.result]);
          setImages((oldArray) => [...oldArray, file]);
        }
      };

      reader.readAsDataURL(file);
    });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("price", price);
    formData.append("stock", stock);
    formData.append("description", description);
    formData.append("seller", seller);
    images.forEach((img) => {
      formData.append("images", img);
    });
    dispatch(createNewProduct(formData));
  };

  useEffect(() => {
    if (isProductCreated) {
      toast("Product Created Succesfully!", {
        type: "success",
        position: toast.POSITION.BOTTOM_CENTER,
        onOpen: () => dispatch(clearProductCreated()),
      });
      navigate("/admin/products");
      return;
    }

    if (error) {
      toast(error, {
        position: toast.POSITION.BOTTOM_CENTER,
        type: "error",
        onOpen: () => {
          dispatch(clearError());
        },
      });
      return;
    }
  }, [isProductCreated, error, dispatch,navigate]);

  return (
    <div
      className={`bg-slate-900 font-montserrat text-pale-blue px-4 min-h-screen p-8`}
    >
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 mt-20">
        <div className="col-span-1 md:col-span-2">
          <Sidebar />
        </div>
        <div className="col-span-1 md:col-span-10">
          <Fragment>
            <div className="flex justify-center mt-5">
              <form
                onSubmit={submitHandler}
                className={`w-full max-w-md px-4 py-2 bg-gradient-to-bl from-blue-950 to-cyan-700 via-stone-800 rounded-lg mb-2 mt-8`}
                encType="multipart/form-data"
              >
                <div className="bg-slate-900 p-3 shadow-sm shadow-teal-600 mb-2">
                  <h1 className="text-3xl text-center font-semibold mb-3">
                    <span className="text-red-600">New</span> Product
                  </h1>
                </div>

                <div className="mb-4">
                  <label htmlFor="name_field" className="block font-medium">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name_field"
                    className=" mt-1 p-2 w-full bg-gray-300 text-stone-900 rounded border border-blue-950"
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                  />
                </div>

                <div className="mb-4">
                  <label htmlFor="price_field" className="block font-medium">
                    Price
                  </label>
                  <input
                    type="text"
                    id="price_field"
                    className=" mt-1 p-2 w-full bg-gray-300 text-stone-900 rounded border border-blue-950"
                    onChange={(e) => setPrice(e.target.value)}
                    value={price}
                  />
                </div>

                <div className="mb-4">
                  <label
                    htmlFor="description_field"
                    className="block font-medium"
                  >
                    Description
                  </label>
                  <textarea
                    className=" mt-1 p-2 w-full bg-gray-300 text-stone-900 rounded border border-blue-950"
                    id="description_field"
                    rows="6"
                    onChange={(e) => setDescription(e.target.value)}
                    value={description}
                  ></textarea>
                </div>

                <div className="mb-4">
                  <label htmlFor="stock_field" className="block font-medium">
                    Stock
                  </label>
                  <input
                    type="number"
                    id="stock_field"
                    className=" mt-1 p-2 w-full bg-gray-300 text-stone-900 rounded border border-blue-950"
                    onChange={(e) => setStock(e.target.value)}
                    value={stock}
                  />
                </div>

                <div className="mb-4">
                  <label htmlFor="seller_field" className="block font-medium">
                    Seller Name
                  </label>
                  <input
                    type="text"
                    id="seller_field"
                    className=" mt-1 p-2 w-full bg-gray-300 text-stone-900 rounded border border-blue-950"
                    onChange={(e) => setSeller(e.target.value)}
                    value={seller}
                  />
                </div>

                <div className="mb-4">
                  <label className="block font-medium">Images</label>

                  <div className="custom-file">
                    <input
                      type="file"
                      name="product_images"
                      className="hidden"
                      id="customFile"
                      multiple
                      onChange={onImagesChange}
                    />

                    <div className="flex justify-center items-center space-x-4">
                      <label
                        className="px-4 py-2 bg-black text-white-400 font-semibold rounded-lg text-center cursor-pointer"
                        htmlFor="customFile"
                      >
                        Choose Images
                      </label>
                    </div>
                    <div className="flex gap-4 mt-2 items-center justify-center ">
                      {imagesPreview.map((img) => (
                        <img
                          className="w-20 h-16  rounded-lg"
                          key={img}
                          src={img}
                          alt={`Image Preview`}
                        />
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mb-4 flex justify-center">
                  <button
                    id="login_button"
                    type="submit"
                    disabled={loading}
                    className={`w-full  py-3 rounded text-white bg-gradient-to-t from-slate-900 to-black via-slate-900 hover:scale-105 duration-300 focus:outline-none`}
                  >
                    CREATE
                  </button>
                </div>
              </form>
            </div>
          </Fragment>
        </div>
      </div>
    </div>
  );
}
