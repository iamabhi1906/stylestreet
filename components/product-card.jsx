"use client";
import Image from "next/image";
import style from "./module-css/product.module.css";
import Link from "next/link";

const ProductCard = ({ product, addToCart }) => {
  return (
    <div className={`${style.productCard}`}>
      <Link href={`/${product.id}`}>
        <Image
          src={product.thumbnail}
          alt={product.title}
          width={250}
          height={200}
          className="w-full "
        />
      </Link>
      <div className={style.productText}>
        <p className={style.productTitle}>{product.title}</p>
        <p className={style.productDescription}>{product.description}</p>
      </div>

      <div className={style.cardActions}>
        <div>
          <p style={{ textTransform: "uppercase", fontSize: "7px" }}>price</p>
          <p>${product.price}</p>
        </div>
        <button
          className={style.cardActionsButton}
          onClick={() => {
            addToCart(product);
          }}
        >
          Add To Card
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
