import { Fragment, useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getProduct, updateProduct } from "../../actions/productActions";
import { clearError, clearProductUpdated } from "../../slices/productSlice";
import { toast } from "react-toastify";

export default function UpdateProduct() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [stock, setStock] = useState(0);
  const [seller, setSeller] = useState("");
  const [images, setImages] = useState([]);
  const [imagesCleared, setImagesCleared] = useState(false);
  const [imagesPreview, setImagesPreview] = useState([]);
  const { id: productId } = useParams();

  const { loading, isProductUpdated, error, product } = useSelector(
    (state) => state.productState
  );

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
    formData.append("category", category);
    images.forEach((image) => {
      formData.append("images", image);
    });
    formData.append("imagesCleared", imagesCleared);
    dispatch(updateProduct(productId, formData));
  };

  const clearImagesHandler = () => {
    setImages([]);
    setImagesPreview([]);
    setImagesCleared(true);
  };

  useEffect(() => {
    if (isProductUpdated) {
      toast("Product Updated Succesfully!", {
        type: "success",
        position: toast.POSITION.BOTTOM_CENTER,
        onOpen: () => dispatch(clearProductUpdated()),
      });
      setImages([]);
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

    dispatch(getProduct(productId));
  }, [isProductUpdated, error, dispatch, productId]);

  useEffect(() => {
    if (product._id) {
      setName(product.name);
      setPrice(product.price);
      setStock(product.stock);
      setDescription(product.description);
      setSeller(product.seller);
      setCategory(product.category);

      let images = [];
      product.images.forEach((image) => {
        images.push(image.image);
      });
      setImagesPreview(images);
    }
  }, [product]);

  return (
    <div
      className={`bg-slate-900 font-montserrat text-pale-blue px-4 min-h-screen p-8 `}
    >
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 mt-16">
        <div className="col-span-1 md:col-span-2">
          <Sidebar />
        </div>
        <div className="col-span-1 md:col-span-10">
          <Fragment>
            <div className="flex justify-center mt-5">
              <form
                onSubmit={submitHandler}
                className={`w-full max-w-md px-4 py-2 bg-gradient-to-bl from-blue-950 to-cyan-700 via-stone-800 rounded-lg mb-2`}
                encType="multipart/form-data"
              >
                <div className="bg-slate-900 p-3 shadow-sm shadow-teal-600 mb-2">
                  <h1 className="font-montserrat text-3xl text-white-400 font-bold text-center ">
                    Update <span className="text-red-600">Product</span>
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
                    className=" mt-1 p-2 w-full bg-gray-300 text-stone-900 rounded-lg border border-blue-950"
                    id="description_field"
                    rows="4"
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

                    <div className="flex justify-start items-center">
                      <label
                        className="px-4 py-2 bg-black text-white-400 font-semibold rounded-lg text-center cursor-pointer"
                        htmlFor="customFile"
                      >
                        Choose Images
                      </label>
                      {imagesPreview.length > 0 && (
                        <span
                          className=" px-4 py-3  cursor-pointer text-red-500 text-2xl"
                          onClick={clearImagesHandler}
                        >
                          <i className="fa fa-trash "></i>
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="mt-3 flex px-4 space-x-4 overflow-x-auto">
                    {imagesPreview.map((images) => (
                      <img
                        className="w-28 h-28 rounded-lg"
                        key={images}
                        src={images}
                        alt={`Images Preview`}
                      />
                    ))}
                  </div>
                </div>
                <div className="mb-4 flex justify-center">
                  <button
                    id="login_button"
                    type="submit"
                    disabled={loading}
                    className={`w-full  py-3 rounded text-white bg-gradient-to-b from-cyan-400 to-black via-slate-950 hover:scale-105 duration-300 shadow-md hover:shadow-pale-blue focus:outline-none`}
                  >
                    UPDATE
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
