import axios from "axios";

const fetchProduct = async (id) => {
  try {
    if (!id) return;
    const { data } = await axios.get(`https://dummyjson.com/products/${id}`);
    if (!data) return;
    return data;
  } catch (error) {
    throw error;
  }
};

export default fetchProduct;
