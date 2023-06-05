import './App.css';
import Navbar from './components/navbar/Navbar'
import Hero from './components/hero/Hero'
import Description from './components/description/Description'
import WorkExperience from './components/workExperience/WorkExperience'
// Load data
import experienceData from './data/WorkExperience.data.json'

function App() {
  return (
    <>
      <Navbar />
      <Hero />
      <Description />
      <WorkExperience experiences={experienceData.experiences} />
    </>
  );
}

export default App;
