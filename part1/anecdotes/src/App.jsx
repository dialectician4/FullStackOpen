import { useState } from 'react'

function InitializeMap(n) {
  let map = {}
  for (let i = 0; i < n; i++) {
    map[i] = 0
  }

  return map
}

function FoldMapMax(target_map) {
  let output = { index: null, max: -1 }
  for (let [key, value] of Object.entries(target_map)) {
    if (value > output.max) {
      output.index = key
      output.max = value
    }
  }
  return output
}

const GenerateRandInt = (ceiling) => Math.floor(Math.random() * ceiling)

const Button = ({ handleClick, text }) => <button onClick={handleClick}>{text}</button>
const HighestVotes = ({ state_map, quotes_array }) => {
  const max_data = FoldMapMax(state_map)
  const most_voted = quotes_array[max_data.index]
  return <div><h1>Anecdote with most votes</h1><p>{most_voted}</p></div>
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
  const vote_tracker = InitializeMap(anecdotes.length)

  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(vote_tracker)
  const incrementVotes = (votes_map, index) => {
    const current_votes = votes_map[index]
    const new_votes = current_votes + 1
    const output = { ...votes_map, [index]: new_votes }
    return output
  }

  return (
    <div>
      <p>{anecdotes[selected]}</p>
      <p>has {votes[selected]} votes</p>
      <Button handleClick={() => setVotes(incrementVotes(votes, selected))} text={"vote"} />
      <Button handleClick={() => setSelected(GenerateRandInt(anecdotes.length))} text={"next anecdote"} />
      <HighestVotes state_map={votes} quotes_array={anecdotes} />
    </div>
  )
}

export default App
