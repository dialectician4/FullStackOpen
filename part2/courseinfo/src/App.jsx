import { useState } from 'react'
//import reactLogo from './assets/react.svg'
//import viteLogo from '/vite.svg'

import Course from './components/Course'


function App() {
  const courses = [{
    id: 1,
    name: 'Half Stack application development',
    parts: [{
      name: 'Fundamentals of React',
      exercises: 10,
      id: 1
    },
    {
      name: 'Using props to pass data',
      exercises: 7,
      id: 2
    },
    {
      name: 'State of a component',
      exercises: 14,
      id: 3
    },
    {
      name: 'Redux',
      exercises: 11,
      id: 4
    }
    ]
  },
  {
    name: 'Node.js',
    id: 2,
    parts: [
      {
        name: 'Routing',
        exercises: 3,
        id: 1
      },
      {
        name: 'Middlewares',
        exercises: 7,
        id: 2
      }
    ]
  }
  ];

  const next_cours = [{
    id: 3,
    name: "Server Side",
    parts: [
      {
        name: 'Routing',
        exercises: 3 + 3,
        id: 1
      },
      {
        name: 'Middlewares',
        exercises: 7 + 3,
        id: 2
      }
    ]
  },
  {
    id: 4,
    name: "Serverless Side",
    parts: [
      {
        name: 'Routing',
        exercises: 3 + 4,
        id: 1
      },
      {
        name: 'Middlewares',
        exercises: 7 + 4,
        id: 2
      }
    ]
  }];
  const courses_full = courses.concat(next_cours);

  return (
    <div>
      {courses.map(course =>
        <Course key={course.id} course={course} />
      )}
    </div>
  )
}

export default App;
