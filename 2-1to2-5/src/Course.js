const Course = (props) => {
  const {courses} = props
  //courses is a list of courses
  const format =  courses.map(course => 
    <div>
      <h2>{course.name}</h2>
        {course.parts.map(part => <p>{part.name}     {part.exercises}</p>)}
      <strong>Total of {course.parts.reduce((total,part) => total + part.exercises,0)} exercises </strong>
    </div>)

  return (
    <>
      {format} 
    </>
  )
}


export default Course

