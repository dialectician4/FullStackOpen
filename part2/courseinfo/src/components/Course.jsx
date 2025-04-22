

const Header = (props) => <h1>{props.course}</h1>;

const Content = ({ parts }) => {
  return (
    <div>
      {parts.map(part =>
        <Part key={part.id} text={part.name} value={part.exercises} />
      )}
    </div>
  )
}

const Total = ({ parts }) => (
  <p>Number of exercises {
    parts.reduce((acc, elt) => acc + elt.exercises, 0)
  }</p>
)

const Part = (props) => <p>{props.text} {props.value}</p>;

const Course = ({ course }) => (
  <div>
    <Header course={course.name} />
    <Content
      parts={course.parts}
    />
    <Total parts={course.parts} />
  </div>
)

export default Course;
