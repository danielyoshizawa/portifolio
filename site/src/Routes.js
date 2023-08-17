import { createBrowserRouter } from 'react-router-dom'
import Home from './pages/home/Home';
import Admin from './pages/admin/Admin'
import Description from './components/admin/description/Description'
import Education from './components/admin/education/Education'
import EducationEdit from './components/admin/education/EducationEdit'
import EducationDelete from './components/admin/education/EducationDelete'
import Course from './components/admin/course/Course'
import CourseDelete from './components/admin/course/CourseDelete'
import WorkExperience from './components/admin/workExperience/WorkExperience'
// Will probably change that in the future
import Login from './pages/admin/login/Login'

export const routes = createBrowserRouter([
  {
    path: "/",
    element: <Home />
  },
  {
    path: "/admin",
    element: <Admin />,
    children : [
      {
        path: "description",
        element: <Description />
      },
      {
        path: "education",
        element: <Education />,
      },
      {
        path: "education/:id/edit",
        element: <EducationEdit action="edit"/>
      },
      {
        path: "education/:id/delete",
        element: <EducationDelete />
      },
      {
        path: "education/new",
        element: <EducationEdit action="new" />
      },
      {
        path: "course",
        element: <Course />
      },
      {
        path: "course/:id/delete",
        element: <CourseDelete />
      },
      {
        path: "workExperience",
        element: <WorkExperience />
      }
    ]
  },
  {
    path: "login",
    element: <Login />
  }
])
