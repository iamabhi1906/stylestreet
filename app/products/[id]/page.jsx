import { Star } from "@mui/icons-material";
import fetchProduct from "./fetch-product";
import ProductCarousel from "./components/product-carousel";
import GoBackButton from "@/components/go-back-button";
import ActionButton from "./components/action-button";

const ProductViewPage = async ({ params }) => {
  const { id } = await params;
  const product = await fetchProduct(id);

  return (
    <div className="p-10 px-36">
      <GoBackButton />
      <p>Product Details</p>
      {/* top section */}
      <div className="mt-10 flex space-x-8 h-full w-full">
        {product && <ProductCarousel images={product.images} />}
        {/* info */}
        <div className="flex flex-col justify-between">
          <div className="h-full flex flex-col space-y-5">
            <p>{product.brand}</p>
            <p className="text-3xl font-semibold">{product.title}</p>
            <p>{product.description}</p>
            <div className="flex w-full justify-between">
              <div className="flex text-4xl space-x-5 items-center">
                <p>Price:</p>
                <p className="font-semibold">${product.price}</p>
                <p className="text-xl text-green-800">
                  -{product.discountPercentage}%
                </p>
              </div>
              <p className="flex">
                {product.rating}
                <Star />
              </p>
            </div>
          </div>
        </div>
        <ActionButton product={product} />
      </div>
    </div>
  );
};

export default ProductViewPage;
