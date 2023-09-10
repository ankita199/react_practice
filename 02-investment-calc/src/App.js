import Header from './Header'
import Calculator from './Calculator'
import Result from './Result'
import { useState } from 'react'

function App() {
  const yearlyData = [];
  const [userInput, setUserInput] = useState(null);
  const calculateHandler = (userInput) => {
    setUserInput(userInput)
  }

  if(userInput){
    let currentSavings = +userInput['current-savings'];
    const yearlyContribution = +userInput['yearly-contribution'];
    const expectedReturn = +userInput['expected-return'] / 100;
    const duration = +userInput['duration'];

    for (let i = 0; i < duration; i++) {
      const yearlyInterest = currentSavings * expectedReturn;
      currentSavings += yearlyInterest + yearlyContribution;
      yearlyData.push({
        year: i + 1,
        yearlyInterest: yearlyInterest,
        savingsEndOfYear: currentSavings,
        yearlyContribution: yearlyContribution,
      });
    }
  }
  return (
    <div>
      <Header />
      <Calculator onCalc={calculateHandler} />
      {!userInput && <p>No Investment Found!!</p>}
      {userInput && <Result data={yearlyData} initialInvestment={userInput['current-savings']} />}
    </div>
  );
}

export default App;
