import { useEffect, useState } from "react";
import Card from "../UI/Card";
import MealItem from "./MealsItem/MealIem";
import classes from "./AvailableMeals.module.css";

const AvailableMeals = () => {
  const [meals, setMeals] = useState([]);

  useEffect(() => {
    const fetchMeals = async () => {
      const response = await fetch(
        "https://foodorderapp-cb49d-default-rtdb.firebaseio.com/meals.json"
      );
      const responseData = await response.json();

      const loadMeals = [];

      for (const key in responseData) {
        loadMeals.push({
          id: key,
          name: responseData[key].name,
          description: responseData[key].description,
          price: responseData[key].price,
        });

        setMeals(loadMeals);
      }
    };
    fetchMeals();
  }, []);

  const mealList = meals.map((meal) => (
    <MealItem
      key={meal.id}
      id={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    />
  ));

  return (
    <section className={classes.meals}>
      <Card>
        <ul>{mealList}</ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;
