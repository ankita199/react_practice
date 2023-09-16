import classes from './Result.module.css'
const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 2,
  maximumFractionDigits: 2
})
export default function Result(props) {
  console.log(props.data)
  return (
    <table className={classes.result} >
      <thead>
        <tr>
          <th>Year</th>
          <th>Total Savings</th>
          <th>Interest (Year)</th>
          <th>Total Interest</th>
          <th>Invested Capital</th>
        </tr>
      </thead>
      <tbody>
        {props.data.map((row) => (
          <tr key={row.year}>
            <td>{row.year}</td>
            <td>{formatter.format(row.savingsEndOfYear)}</td>
            <td>{formatter.format(row.yearlyInterest)}</td>
            <td>{formatter.format(row.savingsEndOfYear - props.initialInvestment - (row.yearlyContribution * row.year))}</td>
            <td>{formatter.format(props.initialInvestment + (row.yearlyContribution * row.year))}</td>
          </tr>
        ))}
      </tbody>
    </table >
  )
}