import CartContext from "./cart-context";

const CartProvider = (props) => {
  const addItemToHandler = (item) => {};

  const removeItemToHandler = (id) => {};

  const cartContext = {
    items: [],
    totalAmount: 0,
    addItem: addItemToHandler,
    removeItem: removeItemToHandler,
  };
  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
