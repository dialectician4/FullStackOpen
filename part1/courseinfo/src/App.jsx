import { useState } from 'react'
//import reactLogo from './assets/react.svg'
//import viteLogo from '/vite.svg'



const Header = (props) => <h1>{props.course}</h1>;

const Content = ({ parts }) => {
  return (
    <div>
      <Part text={parts[0].name} value={parts[0].exercises} />
      <Part text={parts[1].name} value={parts[1].exercises} />
      <Part text={parts[2].name} value={parts[2].exercises} />
    </div>
  )
}

const Total = ({ parts }) => (
  <p>Number of exercises {
    parts[0].exercises + parts[1].exercises + parts[2].exercises
  }</p>
)

const Part = (props) => <p>{props.text} {props.value}</p>;


function App() {
  const course = {
    name: 'Half Stack application development',
    parts: [{
      name: 'Fundamentals of React',
      exercises: 10
    },
    {
      name: 'Using props to pass data',
      exercises: 7
    },
    {
      name: 'State of a component',
      exercises: 14
    }]
  }

  return (
    <div>
      <Header course={course.name} />
      <Content
        parts={course.parts}
      />
      <Total parts={course.parts} />
    </div>
  )
}

export default App
