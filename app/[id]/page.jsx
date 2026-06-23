"use client";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Loading from "../loading";
import ErrorPage from "../error";
import Image from "next/image";
import { ArrowBack, Star } from "@mui/icons-material";
import { Button } from "@mui/material";

const ProductViewPage = () => {
  const router = useRouter();
  const params = useParams();
  const [sImage, setSImage] = useState(0);
  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState();
  const [error, setError] = useState(false);
  const fetchProduct = async (id) => {
    try {
      setLoading(true);
      const response = (await axios.get(`https://dummyjson.com/products/${id}`))
        .data;
      setProduct(response);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProduct(params.id);
  }, [params.id]);

  if (loading) return <Loading />;
  if (error) return <ErrorPage />;

  return (
    <div className="min-h-dvh p-10 px-36">
      <Button onClick={() => router.back()} startIcon={<ArrowBack />}>
        Go Back
      </Button>
      <p>Product Details</p>
      {/* top section */}
      <div className="mt-10 flex space-x-8 h-full w-full">
        {/* image */}
        <div className="flex space-x-10">
          <div className="flex flex-col h-full space-y-5">
            {product.images.map((image, index) => (
              <Image
                key={`${image}+${index}`}
                src={image}
                width={100}
                height={100}
                alt={`${image}+${index}`}
                className={`bg-slate-500 rounded-xl cursor-pointer ${index == sImage && "border-2 border-black"}`}
                onClick={() => {
                  setSImage(index);
                }}
              />
            ))}
          </div>
          <div className="border-2 border-black rounded-xl w-fit">
            <Image
              src={product.images[sImage]}
              width={400}
              height={400}
              alt={product.title}
            />
          </div>
        </div>

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
          <div className="flex justify-between gap-4">
            <Button variant="contained" sx={{ width: "100%" }}>
              Buy Now
            </Button>
            <Button variant="outlined" sx={{ width: "100%" }}>
              Add to cart
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductViewPage;
