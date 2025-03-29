import { useState } from 'react'
//import reactLogo from './assets/react.svg'
//import viteLogo from '/vite.svg'



const Header = (props) => <h1>{props.course}</h1>;

const Content = (props) => {
  return (
    <div>
      <Part text={props.ex1} value={props.val1} />
      <Part text={props.ex2} value={props.val2} />
      <Part text={props.ex3} value={props.val3} />
    </div>
  )
}

const Total = (props) => <p>Number of exercises {props.total}</p>;

const Part = (props) => <p>{props.text} {props.value}</p>;


function App() {
  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14

  return (
    <div>
      <Header course={course} />
      <Content ex1={part1} val1={exercises1} ex2={part2} val2={exercises2} ex3={part3} val3={exercises3} />
      <Total total={exercises1 + exercises2 + exercises3} />
    </div>
  )
}

export default App
