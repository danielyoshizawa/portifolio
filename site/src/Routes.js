import { createBrowserRouter } from 'react-router-dom'
import Home from './pages/home/Home';
import Admin from './pages/admin/Admin'
import Description from './components/admin/description/Description'
import Education from './components/admin/education/Education'
import Course from './components/admin/course/Course'

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
        element: <Education />
      },
      {
        path: "course",
        element: <Course />
      }
    ]
  }
])
