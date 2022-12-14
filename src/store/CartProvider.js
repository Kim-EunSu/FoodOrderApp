import { useReducer } from "react";
import CartContext from "./cart-context";

const defaultCartState = {
  items: [],
  totalAmount: 0,
};

const cartReducer = (state, action) => {
  if (action.type === "ADD") {
    const updatedTotalAmount =
      state.totalAmount + action.item.price * action.item.amount;

    // 항목이 있는지 장바구니에 들어있는지 확인하는 함수
    const existiingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.item.id
    );

    // 해당 항목이 존재하는 index를 돌려줌(해당 항목이 있는 경우에만 작동)
    const existingCartItem = state.items[existiingCartItemIndex];

    let updatedItems;

    if (existingCartItem) {
      const updatedItem = {
        ...existingCartItem,
        amount: existingCartItem.amount + action.item.amount,
      };
      // updatedItems에 기존항목을 복사한것 => 변경 불가능하게 업데이트
      updatedItems = [...state.items];
      //  updatedItem으로 덮어쓰임 => CartItems배열에서 식별한 오래된 항목을 선택하여 updatedItem으로 덮어쓰임
      updatedItems[existiingCartItemIndex] = updatedItem;
    } else {
      // 항목이 CartItems배열에 처음으로 추가되는 경우
      updatedItems = state.items.concat(action.item);
    }

    // // 항목을 꺼내는 함수
    // const updatedItems = state.items.concat(action.item);

    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount,
    };
  }
  if (action.type === "REMOVE") {
    // 항목이 있는지 장바구니에 들어있는지 확인하는 함수
    const existiingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.id
    );

    //  항목자체를 가져오는 함수
    const existingItem = state.items[existiingCartItemIndex];
    const updatedTotalAmount = state.totalAmount - existingItem.price;

    let updatedItems;
    if (existingItem.amount === 1) {
      updatedItems = state.items.filter((item) => item.id !== action.id);
    } else {
      const updatedItem = { ...existingItem, amount: existingItem.amount - 1 };
      updatedItems = [...state.items];
      updatedItems[existiingCartItemIndex] = updatedItem;
    }
    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount,
    };
  }

  if (action.type === "CLEAR") {
    return defaultCartState;
  }

  return defaultCartState;
};

const CartProvider = (props) => {
  const [carState, dispatchCartAction] = useReducer(
    cartReducer,
    defaultCartState
  );

  const addItemToHandler = (item) => {
    dispatchCartAction({ type: "ADD", item: item });
  };

  const removeItemToHandler = (id) => {
    dispatchCartAction({ type: "REMOVE", id: id });
  };

  const clearCartHandler = () => {
    dispatchCartAction({ type: "CLEAR" });
  };

  const cartContext = {
    items: carState.items,
    totalAmount: carState.totalAmount,
    addItem: addItemToHandler,
    removeItem: removeItemToHandler,
    clearCart: clearCartHandler,
  };
  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
