import { useState } from 'react'

const Button = ({ handleClick, text }) => <button onClick={handleClick}> {text} </button>

const StatisticsLine = ({ text, value }) => (
  <tr>
    <td>{text}</td>
    <td>{value}</td>
  </tr>)

const Statistics = ({ good, neutral, bad }) => {
  const total = good.val + neutral.val + bad.val;
  if (total != 0) {
    return (<div>
      <table>
        <tbody>
          <StatisticsLine text={good.text} value={good.val} />
          <StatisticsLine text={neutral.text} value={neutral.val} />
          <StatisticsLine text={bad.text} value={bad.val} />
          <StatisticsLine text={"all"} value={good.val + neutral.val + bad.val} />
          <StatisticsLine text={"average"} value={(good.val - bad.val) / total} />
          <StatisticsLine text={"positive"} value={(100 * good.val / total) + "%"} />
        </tbody>
      </table>
    </div>)
  }
  return <p>No feedback given</p>
}

const App = () => {
  const [good, setGood] = useState(0)
  const incrementGood = () => setGood(good + 1)
  const [neutral, setNeutral] = useState(0)
  const incrementNeutral = () => setNeutral(neutral + 1)
  const [bad, setBad] = useState(0)
  const incrementBad = () => setBad(bad + 1)
  const good_struct = { text: "good", val: good }
  const neutral_struct = { text: "neutral", val: neutral }
  const bad_struct = { text: "bad", val: bad }
  const all_args = {
    good: good_struct,
    neutral: neutral_struct,
    bad: bad_struct,
  }


  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={incrementGood} text="good" />
      <Button handleClick={incrementNeutral} text="neutral" />
      <Button handleClick={incrementBad} text="bad" />
      <h1>statistics</h1>
      <Statistics {...all_args} />
    </div>
  )
}

export default App
