import { useSelector, useDispatch } from "react-redux";
import classes from "./Counter.module.css";
const Counter = () => {
  const dispatch = useDispatch();
  const counter = useSelector((state) => state.counter);
  const toggleCounterHandler = () => {
    // console.log(counterReducer.dispatch({ type: "increment" }));
  };

  const incrementCounter = () => {
    dispatch({ type: "increment" });
  };
  const decrementCounter = () => {
    dispatch({ type: "decrement" });
  };
  return (
    <main className={classes.counter}>
      <h1>Redux Counter</h1>
      <div className={classes.value}>{counter}</div>
      <button onClick={incrementCounter}>Increment Counter</button>
      <button onClick={decrementCounter}>Decrement Counter</button>

      <button onClick={toggleCounterHandler}>Toggle Counter</button>
    </main>
  );
};

export default Counter;
