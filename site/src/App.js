import './App.css';
import Navbar from './components/navbar/Navbar'
import Hero from './components/hero/Hero'
import Description from './components/description/Description'
import WorkExperience from './components/workExperience/WorkExperience'
import Courses from './components/courses/Courses'
import Education from './components/education/Education'
import Social from './components/social/Social'
import Contact from './components/contact/Contact'
// Load data
import experienceData from './data/WorkExperience.data.json'
import coursesData from './data/Courses.data.json'
import educationData from './data/Education.data.json'
import socialData from './data/Social.data.json'
import contactData from './data/Contact.data.json'

function App() {
  return (
    <>
      <Navbar />
      <Hero />
      <Description />
      <WorkExperience experiences={experienceData.experiences} />
      <Courses courses={coursesData.courses} />
      <Education education={educationData.education} />
      <Social social={socialData.social} />
      <Contact contact={contactData.contact} />
    </>
  );
}

export default App;
