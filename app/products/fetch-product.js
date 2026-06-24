import axios from "axios";

export const fetchProduct = async ({
  limit = 10,
  skip = 0,
  select = "title,food,tags,description,category,rating,stock,price,discountPercentage,thumbnail",
  q = null,
  category,
} = {}) => {
  try {
    const NORMAL_ENDPOINT = "https://dummyjson.com/products";
    const SEARCH_ENDPOINT = "https://dummyjson.com/products/search";
    const CATEGORY_ENDPOINT = "https://dummyjson.com/products/category";
    let url;
    if (q) {
      url = `${SEARCH_ENDPOINT}?limit=${limit}&skip=${skip}&select=${select}&q=${q}`;
    } else if (category) {
      url = `${CATEGORY_ENDPOINT}/${category}?limit=${limit}&skip=${skip}&select=${select}${q ? `&q=${q}` : ""}`;
    } else {
      url = `${NORMAL_ENDPOINT}?limit=${limit}&skip=${skip}&select=${select}`;
    }
    const { data } = await axios.get(url);
    const products = data.products;
    const pagination = {
      total: data.total,
      skip: data.skip,
      limit: data.limit,
    };
    return { products, pagination };
  } catch (error) {
    console.log(error);
  }
};
