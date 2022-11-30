import { useRef, useState } from "react";
import Input from "../../UI/input";
import classes from "./MealItemForm.module.css";

const MealsItemForm = (props) => {
  // 에러메세지
  const [amountIsValid, setAmountIsValid] = useState(true);

  const amountInputRef = useRef();

  const submitHandler = (event) => {
    event.preventDefault();

    const enteredAmount = amountInputRef.current.value;
    const enteredAmountNumber = +enteredAmount;

    if (
      enteredAmount.trim().length === 0 ||
      enteredAmountNumber < 1 ||
      enteredAmountNumber > 5
    ) {
      return setAmountIsValid(false);
    }

    // prop을 가져올 함수 호출
    props.onAddToCart(enteredAmountNumber);
  };

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <Input
        ref={amountInputRef}
        label="Amount"
        input={{
          id: "amount",
          type: "number",
          min: 1,
          max: 5,
          step: "1",
          defaultValue: "1",
        }}
      />
      <button>+ ADD</button>
      {!amountIsValid && <p>Please enter a valid amount(1-5)</p>}
    </form>
  );
};

export default MealsItemForm;
