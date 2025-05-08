import { useSelector } from "react-redux";
import TopRatedCard from "./TopRatedCard";

const TopRatedSales = () => {
  const { products } = useSelector((state) => state.productsState);

  return (
    <div className="shoes-container px-4">
      <div className="grid items-center">
        <h1 className="text-5xl lg:text-4xl md:text-3xl font-bold text-slate-900 filter drop-shadow-lg">
          TopRated Sales
        </h1>
      </div>
      <div className="grid items-center justify-items-center gap-7 lg:gap-5 mt-7 grid-cols-3 xl:grid-cols-2 sm:grid-cols-1">
        {products &&
          products.slice(3).map((product, index) => (
            <TopRatedCard key={index} product={product}  />
          ))}
      </div>
    </div>
  );
};

export default TopRatedSales;