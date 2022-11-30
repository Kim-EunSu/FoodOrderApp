import React from "react";

import foodImage from "../../assets/food.jpeg";
import classes from "./Header.module.css";
import HeaderCartButton from "./HeaderCartButton";

function Header(props) {
  return (
    <>
      <header className={classes.header}>
        <h1>ReactMeals</h1>
        <HeaderCartButton />
      </header>
      <div className={classes["main-image"]}>
        <img src={foodImage} alt="food" />
      </div>
    </>
  );
}

export default Header;
