import MetaData from "./layouts/MetaData";
import { useDispatch, useSelector } from "react-redux";
import Hero from "./Banner/Hero";
import FirstFlex from "./Banner/FirstFlex";
import SecondFlex from "./Banner/SecondFlex";
import { Fragment, useEffect } from "react";
import { toast } from "react-toastify";
import { getProducts } from "../actions/productActions";
import Loader from "./layouts/Loader";
import PopularSales from "./product/PopularSales";
import TopRatedSales from "./product/TopRatedSales";
import Contact from "./layouts/Contact";
export default function Home() {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.productsState);

  useEffect(() => {
    if (error) {
      return toast.error(error, {
        position: "top-right",
      });
    }
    dispatch(getProducts());
  }, [dispatch, error]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <div className="flex flex-col gap-6 relative ">
          <MetaData title={`Nike's Digital Journey`} />
          <Hero />
          <PopularSales/>
          <FirstFlex />
          <TopRatedSales/>
          <SecondFlex />
          <Contact/>
        </div>
      )}
    </Fragment>
  );
}
