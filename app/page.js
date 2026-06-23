"use client";

import LogoSvg from "@/components/logo";
import { fetchProduct } from "@/utils/fetch-product";
import styles from "./page.module.css";
import SearchBox from "@/components/search-box";
import ProductCard from "@/components/product-card";
import Pagination from "@/components/pagination";
import { useEffect, useState } from "react";
import Loading from "./loading";
import ErrorPage from "./error";

const ProductPage = () => {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({
    total: 0,
    skip: 0,
    limit: 10,
  });
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const loadInitialData = async () => {
      try {
        setLoading(true);
        const data = await fetchProduct();
        setProducts(data.products || []);
        setPagination({
          total: data.total || 0,
          skip: data.skip || 0,
          limit: data.limit || 10,
        });
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    const loadCart = () => {
      const savedCarts = localStorage.getItem("carts");
      if (savedCarts) {
        try {
          setCart(JSON.parse(savedCarts));
        } catch (e) {
          console.error("Failed to parse cart from localStorage", e);
        }
      }
    };

    loadInitialData();
    loadCart();
  }, []);

  const onPaginationChange = async (pageNumber) => {
    try {
      setLoading(true);
      const skip = pagination.limit * (pageNumber - 1);
      const data = await fetchProduct({ skip });
      setProducts(data.products || []);
      setPagination({
        total: data.total,
        skip: data.skip,
        limit: data.limit,
      });
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const onSearch = async (q) => {
    try {
      const data = await fetchProduct({ q });
      setProducts(data.products || []);
      setPagination({
        total: data.total,
        skip: data.skip,
        limit: data.limit,
      });
    } catch (error) {
      setError(error);
    }
  };

  const onAddToCart = (product) => {
    setCart((prevCart) => {
      const foundIndex = prevCart.findIndex((item) => item.id === product.id);
      if (foundIndex > -1) {
        const updated = [...prevCart];
        updated[foundIndex] = {
          ...updated[foundIndex],
          quantity: (updated[foundIndex].quantity || 1) + 1,
        };
        return updated;
      } else {
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
    localStorage.setItem("carts", JSON.stringify(cart));
  };

  if (loading) return <Loading />;
  if (error) return <ErrorPage />;

  return (
    <div className={styles.main}>
      {/* navbar */}
      <div className={styles.navbar}>
        <div className={styles.navbarLogo}>
          <LogoSvg fill="#023047" className="size-14" />
          <p className={styles.logoText}>StyleStreet</p>
        </div>
        <SearchBox onChange={(e) => onSearch(e)} cartLength={cart.length} />
      </div>

      <div className={styles.productGrid}>
        {products.map((p) => (
          <ProductCard
            key={p.id || p._id}
            product={p}
            addToCart={() => onAddToCart(p)}
          />
        ))}
      </div>

      {products.length === 0 && (
        <div className={styles.noProductionFound}>No Products Found..!!</div>
      )}

      <Pagination
        currentPage={pagination.skip / pagination.limit + 1}
        totalPages={Math.ceil(pagination.total / pagination.limit) || 1}
        onPageChange={onPaginationChange}
      />
    </div>
  );
};

export default ProductPage;
