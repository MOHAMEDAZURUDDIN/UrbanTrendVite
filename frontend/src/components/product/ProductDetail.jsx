import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { MinusIcon, PlusIcon } from "@heroicons/react/24/outline";
import { BiSolidStar } from "react-icons/bi";
import Loader from "../layouts/Loader";
import MetaData from "../layouts/MetaData";
import { StarIcon } from "@heroicons/react/24/solid";
import { addCartItem } from "../../actions/cartActions";
import { toast } from "react-toastify";
import ProductReview from "./ProductReview";
import {
  clearReviewSubmitted,
  clearError,
  clearProduct,
} from "../../slices/productSlice";
import { createReview, getProduct } from "../../actions/productActions";

const ProductDetail = () => {
  const { loading, product, isReviewSubmitted, error } = useSelector(
    (state) => state.productState
  );
  console.log('prd:',product);
  const { user } = useSelector((state) => state.authState);
  const dispatch = useDispatch();
  const { id } = useParams();
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [rating, setRating] = useState(1);
  const [comment, setComment] = useState("");
  

  const increaseQTY = () => {
    if (product.stock === 0 || quantity >= product.stock) return;
    setQuantity(quantity + 1);
  };

  const decreaseQTY = () => {
    if (quantity === 1) return;
    setQuantity(quantity - 1);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleShowModal = () => {
    setShowModal(true);
  };

  const reviewHandler = () => {
    const formData = new FormData();
    formData.append("rating", rating);
    formData.append("comment", comment);
    formData.append("productId", id);
    dispatch(createReview(formData));
  };

  useEffect(() => {
    if (isReviewSubmitted) {
      handleCloseModal();
      toast.success("Review Submitted successfully", {
        position: toast.POSITION.BOTTOM_CENTER,
        onOpen: () => dispatch(clearReviewSubmitted()),
      });
    }
    if (error) {
      toast.error(error, {
        position: toast.POSITION.BOTTOM_CENTER,
        onOpen: () => dispatch(clearError()),
      });
      return;
    }
    if (!product._id || isReviewSubmitted) {
      dispatch(getProduct(id));
    }
    return () => {
      dispatch(clearProduct());
    };
  }, [isReviewSubmitted, error, dispatch, id]);

  const {
    _id,
    name,
    description,
    price,
    seller,
    numOfReviews,
    stock,
    images,
    ratings,
  } = product;

  const mainImage =
    images && images.length > 0 ? images[selectedImage].image : "";

  const handleImageClick = (index) => {
    setSelectedImage(index);
  };

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <div className="min-h-screen flex justify-center items-center bg-gradient-to-b from-slate-800 to-slate-950 via-slate-600 font-palanquin">
          <MetaData title={name} />
          <div className="w-full md:w-1/2 md:mr-4  mb-4 md:mb-0">
              <img
                src={mainImage}
                alt={name}
                className="h-auto w-full object-cover rounded-lg mb-8"
              />
            </div>
          <div className="flex flex-col md:flex-row w-full p-8 mt-16 font-montserrat">
            

            <div className="w-full md:w-1/2 mt-5 font-montserrat">
              <h3 className="font-medium text-xl text-pale-blue lg:text-md mb-2">
                {name}
              </h3>
              <p className="text-sm md:text-md text-white-400 mb-2">
                Product # {_id}
              </p>

              {images && images.length > 1 && (
                <div className="flex space-x-2 mb-4">
                  {images.map((img, index) => (
                    <img
                      key={img._id}
                      src={img.image}
                      alt={name}
                      className={`h-12 w-12 md:h-16 md:w-16 object-cover rounded-md border border-white cursor-pointer ${
                        index === selectedImage ? "border-blue-500" : ""
                      }`}
                      onClick={() => handleImageClick(index)}
                    />
                  ))}
                </div>
              )}

              <div className="flex items-center gap-1 mb-4">
              <StarIcon className="w-4 h-4 md:w-5 md:h-5 text-yellow-300" />
              <p className="text-xs md:text-sm font-normal text-white">
                  {ratings} ({numOfReviews} reviews)
                </p>
              </div>

              <p className="text-md md:text-lg font-bold mb-4 px-4 md:px-6 text-coral-red">
                ${price}
              </p>

              <div className="flex items-center mt-2 text-pale-blue">
                <button
                  onClick={decreaseQTY}
                  type="button"
                  className={`bg-theme-cart px-2 py-2 rounded text-xl border border-white-400 ${
                    product.stock === 0 || quantity === 1
                      ? "cursor-not-allowed"
                      : "hover:bg-red-700"
                  }`}
                  disabled={product.stock === 0 || quantity === 1}
                >
                  <MinusIcon className="w-8 h-5 lg:w-6 lg:h-5 bg-red-500 stroke-[2] border border-gray-400 " />
                </button>
                <input
                  type="number"
                  className="w-8 mx-2 text-center bg-theme-cart  border border-gray-400 rounded"
                  value={quantity}
                  readOnly
                />
                <button
                  onClick={increaseQTY}
                  type="button"
                  className="bg-theme-cart px-2 py-2 rounded text-xl border border-white-400 "
                >
                  <PlusIcon className="w-8 h-5 lg:w-6 lg:h-5 bg-green-500 stroke-[2] border border-gray-400" />
                </button>
              </div>

              <div className="flex items-start mt-2">
                <button
                  type="button"
                  disabled={product.stock === 0}
                  onClick={() => {
                    dispatch(addCartItem(product._id, quantity));
                    
                  }}
                  className={`mt-2 px-6 py-3 mb-1 ${
                    product.stock === 0
                      ? "bg-gray-400 cursor-not-allowed"
                      : " bg-gradient-to-t from-rose-700 to-rose-700 via-red-950 font-semibold"
                  } text-pale-blue rounded hover:scale-105 duration-300  focus:outline-none`}
                >
                  Add to Cart
                </button>
              </div>

              <hr className="my-4" />

              <p className="text-md text-pale-blue">
                Status:{" "}
                <span
                  className={`text-sm font-bold ${
                    stock > 0 ? "text-green-500" : "text-red-500"
                  }`}
                >
                  {stock > 0 ? "In Stock" : "Out of Stock"}
                </span>
              </p>

              <hr className="my-4" />

              <h4 className="text-md mb-2 text-pale-blue">Description:</h4>
              <p className="text-white-400 text-sm mb-4">{description}</p>

              <hr className="my-4" />

              <p className="text-sm mb-2 text-pale-blue">
                Sold by:{" "}
                <strong className="font-bold text-sm text-blue-500">{seller}</strong>
              </p>

              {user ? (
                <div>
                  <button
                    onClick={handleShowModal}
                    id="review_btn"
                    type="button"
                    className={`mt-4 px-4 py-3 font-palanquin bg-gradient-to-t from-green-500 to-green-800 via-lime-950 font-semibold text-pale-blue rounded hover:scale-105 duration-300  focus:outline-none`}
                  >
                    Submit Your Review
                  </button>
                  <div
                    className={`blur-effect-theme fixed inset-0 flex items-center justify-center  ${
                      showModal ? "visible" : "invisible"
                    }`}
                  >
                    <div className=" bg-gradient-to-b from-slate-900 via-cyan-900 to-slate-900 p-6 text-pale-blue rounded-lg shadow-lg max-w-md mx-auto">
                      <div className="flex flex-col space-y-4">
                        <div className="flex space-x-2">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <div
                              key={star}
                              onClick={() => setRating(star)}
                              className={`text-2xl cursor-pointer ${
                                star <= rating
                                  ? "text-yellow-400"
                                  : "text-gray-300 hover:text-yellow-400"
                              }`}
                            >
                              <BiSolidStar />
                            </div>
                          ))}
                        </div>
                        <textarea
                          onChange={(e) => setComment(e.target.value)}
                          name="review"
                          id="review"
                          className="w-full p-2 bg-gray-100 border text-stone-900 text-xl border-gray-500 rounded"
                        ></textarea>
                        <button
                          disabled={loading}
                          onClick={reviewHandler}
                          className={`mt-3 px-6 py-2 text-pale-blue ${
                            loading
                              ? "bg-gray-400 cursor-not-allowed"
                              : "bg-gradient-to-b from-blue-600 to-blue-600 via-sky-500 hover:to-cyan-500"
                          } font-semibold rounded-md hover:scale-105 duration-300  focus:outline-none`}
                        >
                          Submit
                        </button>
                        <button
                          onClick={handleCloseModal}
                          className="mt-3 px-6 py-2 bg-red-500 text-white font-semibold rounded hover:scale-105 duration-300  focus:outline-none"
                        >
                          Close
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <p className="mt-5 text-red-600">Login to Post Review</p>
              )}
              <div className="mt-2">
                <div className="rating"></div>
              </div>
            </div>
          </div>
          {product && product.reviews && product.reviews.length > 0 ? (
            <ProductReview reviews={product.reviews} />
          ) : null}
        </div>
      )}
    </Fragment>
  );
};

export default ProductDetail;
