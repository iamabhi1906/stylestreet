import axios from "axios";

export const fetchProduct = async ({
  limit = 10,
  skip = 0,
  select = "title,food,tags,description,category,rating,stock,price,discountPercentage,thumbnail",
  q = null,
} = {}) => {
  try {
    const NORMAL_ENDPOINT = "https://dummyjson.com/products";
    const SEARCH_ENDPOINT = "https://dummyjson.com/products/search";
    const url = `${q ? SEARCH_ENDPOINT : NORMAL_ENDPOINT}?limit=${limit}&skip=${skip}&select=${select}${q ? `&q=${q}` : ""}`;
    const { data } = await axios.get(url);
    const products = data.products;
    const pagination = {
      total: data.total,
      skip: data.skip,
      limit: data.limit,
    };
    return { products, pagination };
  } catch (error) {
    console.log(error)
    // throw error;
  }
};
