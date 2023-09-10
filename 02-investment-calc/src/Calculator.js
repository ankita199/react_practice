import { useState } from 'react'
const initialUserInput = {
  'current-savings': 10000,
  'yearly-contribution': 1200,
  'expected-return': 7,
  'duration': 10
};

export default function Calculator(props) {
  const [userInput, setUserInput] = useState(initialUserInput);

  const submitHandler = (event) => {
    event.preventDefault();
    props.onCalc(userInput)
  }

  const resetHandler = () => {
    setUserInput(initialUserInput)
  }

  const inputChangeHandler = (input, value) => {
    setUserInput((prevState) => {
      return {
        ...prevState,
        [input]: value
      }
    })
  }


  return (
    <form onSubmit={submitHandler} className="form">
      <div className="input-group">
        <p>
          <label htmlFor="current-savings">Current Savings ($)</label>
          <input value={userInput['current-savings']} onChange={(event) => inputChangeHandler('current-savings', event.target.value)} type="number" id="current-savings" />
        </p>
        <p>
          <label htmlFor="yearly-contribution">Yearly Savings ($)</label>
          <input value={userInput['yearly-contribution']} onChange={(event) => inputChangeHandler('number', event.target.value)} type="number" id="yearly-contribution" />
        </p>
      </div>
      <div className="input-group">
        <p>
          <label htmlFor="expected-return">
            Expected Interest (%, per year)
          </label>
          <input value={userInput['expected-return']} onChange={(event) => inputChangeHandler('expected-return', event.target.value)} type="number" id="expected-return" />
        </p>
        <p>
          <label htmlFor="duration">Investment Duration (years)</label>
          <input value={userInput['duration']} onChange={(event) => inputChangeHandler('duration', event.target.value)} type="number" id="duration" />
        </p>
      </div>
      <p className="actions">
        <button onClick={resetHandler} type="reset" className="buttonAlt">
          Reset
        </button>
        <button type="submit" className="button">
          Calculate
        </button>
      </p>
    </form>
  )
}
