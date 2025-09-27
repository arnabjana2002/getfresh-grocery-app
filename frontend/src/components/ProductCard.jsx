import { ShoppingCartIcon, StarIcon } from "lucide-react";
import { useAppContext } from "../context/AppContext";

const ProductCard = ({ product }) => {
  const { navigate, addToCart, removeFromCart, cartItems } = useAppContext();

  return (
    product && (
      <div
        onClick={() => {
          navigate(
            `/products/${product.category.toLowerCase()}/${product._id}`
          );
          scrollTo(0, 0);
        }}
        className="border border-gray-500/20 rounded-md md:px-4 px-3 py-2 bg-white w-full"
      >
        <div className="group cursor-pointer flex items-center justify-center px-2">
          <img
            className="group-hover:scale-105 transition max-w-26 md:max-w-36"
            src={product.image[0]}
            alt={product.name}
          />
        </div>
        <div className="text-gray-500/60 text-sm">
          <p>{product.category}</p>
          <p className="text-gray-700 font-medium text-lg truncate w-full">
            {product.name}
          </p>

          {/* Product Rating */}
          <div className="flex items-center gap-0.5">
            {Array(5)
              .fill("")
              .map((_, i) => (
                <StarIcon
                  key={i}
                  className={`${
                    product.rating > i ? "" : "opacity-35"
                  } md:size-3.5 size-3 text-primary fill-primary`}
                />
              ))}
            <p>(4)</p>
          </div>
          <div className="flex items-end justify-between mt-3">
            <p className="md:text-xl text-base font-medium text-primary">
              {import.meta.env.VITE_CURRENCY}
              {product.offerPrice}{" "}
              <span className="text-gray-500/60 md:text-sm text-xs line-through">
                {import.meta.env.VITE_CURRENCY}
                {product.price}
              </span>
            </p>
            <div className="text-primary-dull">
              {!cartItems[product._id] ? (
                <button
                  className="flex items-center justify-center gap-1 bg-primary/20 border border-primary-dull/40 md:w-[80px] w-[64px] h-[34px] rounded text-primary-dull font-medium"
                  onClick={(e) => {
                    addToCart(product._id);
                    e.stopPropagation();
                  }}
                >
                  <ShoppingCartIcon className="size-4" />
                  Add
                </button>
              ) : (
                <div className="flex items-center justify-center gap-2 md:w-20 w-16 h-[34px] bg-primary/20 rounded select-none">
                  <button
                    onClick={(e) => {
                      removeFromCart(product._id);
                      e.stopPropagation();
                    }}
                    className="cursor-pointer text-md px-2 h-full"
                  >
                    -
                  </button>
                  <span className="w-5 text-center">
                    {cartItems[product._id]}
                  </span>
                  <button
                    onClick={(e) => {
                      addToCart(product._id);
                      e.stopPropagation();
                    }}
                    className="cursor-pointer text-md px-2 h-full"
                  >
                    +
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default ProductCard;
