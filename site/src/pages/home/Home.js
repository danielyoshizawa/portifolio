import './Home.css';
import {useState, useEffect, createContext } from 'react'
import Navbar from '../../components/navbar/Navbar'
import Hero from '../../components/hero/Hero'
import Description from '../../components/description/Description'
import WorkExperience from '../../components/workExperience/WorkExperience'
import Courses from '../../components/courses/Courses'
import Education from '../../components/education/Education'
import Footer from '../../components/footer/Footer'

export const FilterContext = createContext('default')

function Home() {
  const [description, setDescription] = useState([{title: "", description: ""}]);
  const [education, setEducation] = useState({education: [{}]});
  const [course, setCourse] = useState({course: [{}]});
  const [workExperience, setWorkExperience] = useState({workExperience: [{ description: "", tags : []}]});
  const serverAddress = process.env.REACT_APP_SERVER_ADDRESS

  useEffect(() => {
    fetch(serverAddress + "/description")
      .then((response) => response.json())
      .then((json) => {
        setDescription(JSON.parse(json))
      })
      fetch(serverAddress + "/education")
        .then((response) => response.json())
        .then((json) => {
          setEducation(JSON.parse(json))
      })
      fetch(serverAddress + "/course")
        .then((response) => response.json())
        .then((json) => {
          setCourse(JSON.parse(json))
      })
      fetch(serverAddress + "/workExperience")
        .then((response) => response.json())
        .then((json) => {
          setWorkExperience(JSON.parse(json))
      })
  }, [])

  return (
    <>
      <Navbar />
      <Hero />
      <FilterContext.Provider value='default'>
        <Description description={description} />
        <WorkExperience experiences={workExperience.workExperience} />
        <Courses courses={course.course} />
        <Education education={education.education} />
      </FilterContext.Provider>
      <Footer />
    </>
  );
}

export default Home;
