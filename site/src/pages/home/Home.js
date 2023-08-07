import './Home.css';
import Navbar from '../../components/navbar/Navbar'
import Hero from '../../components/hero/Hero'
import Description from '../../components/description/Description'
import WorkExperience from '../../components/workExperience/WorkExperience'
import Courses from '../../components/courses/Courses'
import Education from '../../components/education/Education'
import Footer from '../../components/footer/Footer'
import {useState, useEffect } from 'react'

function Home() {
  const [description, setDescription] = useState({title: "", description: ""});
  const [education, setEducation] = useState({education: [{}]});
  const [course, setCourse] = useState({course: [{}]});
  const [workExperience, setWorkExperience] = useState({workExperience: [{ description: "", techs : []}]});
  useEffect(() => {
    fetch("http://localhost:3001/description")
      .then((response) => response.json())
      .then((json) => {
        setDescription(JSON.parse(json))
      })
      fetch("http://localhost:3001/education")
        .then((response) => response.json())
        .then((json) => {
          setEducation(JSON.parse(json))
      })
      fetch("http://localhost:3001/course")
        .then((response) => response.json())
        .then((json) => {
          setCourse(JSON.parse(json))
      })
      fetch("http://localhost:3001/workExperience")
        .then((response) => response.json())
        .then((json) => {
          setWorkExperience(JSON.parse(json))
      })
  }, [])
console.log("HOME")
console.log(JSON.stringify(workExperience))
  return (
    <>
      <Navbar />
      <Hero />
      <Description description={description} />
      <WorkExperience experiences={workExperience.workExperience} />
      <Courses courses={course.course} />
      <Education education={education.education} />
      <Footer />
    </>
  );
}

export default Home;
