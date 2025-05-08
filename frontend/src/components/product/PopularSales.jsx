import { useSelector } from "react-redux";
import PopularCard from "./PopularCard";

const PopularSales = () => {
  const { products } = useSelector((state) => state.productsState);
 console.log('products',products);
  return (
    <div className="shoes-container px-4 ">
      <div className="grid items-center">
        <h1 className="text-5xl lg:text-4xl md:text-3xl font-bold text-slate-900 filter drop-shadow-lg">
          Popular Sales
        </h1>
      </div>
      <div className="grid items-center justify-items-center gap-7 lg:gap-5 mt-7 grid-cols-3 xl:grid-cols-2 sm:grid-cols-1 ">
        {products &&
          products.slice(0, 3).map((product, index) => (
            <PopularCard key={index} product={product}  />
          ))}
      </div>
    </div>
  );
};

export default PopularSales;