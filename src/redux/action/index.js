// For add item to cart
export const addCart = (Product) => {
  return {
    type: "AddITEM",
    payload: Product,
  };
};

// For del item to cart
export const delCart = (Product) => {
  return {
    type: "DELITEM",
    payload: Product,
  };
};
