import axios from "axios";

export const fetchProduct = async ({
  limit = 10,
  skip = 0,
  select = "title,food,tags,description,category,rating,stock,price,discountPercentage,thumbnail",
  q = null,
} = {}) => {
  const NORMAL_ENDPOINT = "https://dummyjson.com/products";
  const SEARCH_ENDPOINT = "https://dummyjson.com/products/search";
  const url = `${q ? SEARCH_ENDPOINT : NORMAL_ENDPOINT}?limit=${limit}&skip=${skip}&select=${select}${q ? `&q=${q}` : ""}`;
  console.log(url);
  const response = await axios.get(url);
  return response.data;
};
