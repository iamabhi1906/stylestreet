const loadCart = () => {
  const savedCarts = localStorage.getItem("carts");
  if (savedCarts) {
    return JSON.parse(savedCarts);
  } else {
    return [];
  }
};

const addToCart = (product) => {
  const cart = loadCart();
  let found = false;
  const updatedCart = cart.map((item) => {
    if (item.id === product.id) {
      found = true;
      return { ...item, quantity: item.quantity + 1 };
    }
    return item;
  });
  if (!found) {
    updatedCart.push({ ...product, quantity: 1 });
  }
  localStorage.setItem("carts", JSON.stringify(updatedCart));
  return updatedCart.find((item) => item.id === product.id);
};

const increaseQuantity = (product) => {
  const cart = loadCart();
  const updatedCart = cart.map((item) => {
    if (item.id === product.id) {
      return { ...item, quantity: item.quantity + 1 };
    }
    return item;
  });
  localStorage.setItem("carts", JSON.stringify(updatedCart));
  return updatedCart.find((item) => item.id === product.id);
};

const decreaseQuantity = (product) => {
  const cart = loadCart();
  const updatedCart = cart.map((item) => {
    if (item.id === product.id) {
      return { ...item, quantity: Math.max(1, item.quantity - 1) };
    }
    return item;
  });
  localStorage.setItem("carts", JSON.stringify(updatedCart));
  return updatedCart.find((item) => item.id === product.id);
};

const findProductInCart = (product) => {
  const cart = loadCart();
  return cart.find((item) => item.id === product.id);
};

export {
  loadCart,
  addToCart,
  findProductInCart,
  increaseQuantity,
  decreaseQuantity,
};
