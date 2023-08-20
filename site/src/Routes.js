import { createBrowserRouter } from 'react-router-dom'
import Home from './pages/home/Home';
import Admin from './pages/admin/Admin'
import Description from './components/admin/description/Description'
import Education from './components/admin/education/Education'
import EducationEdit from './components/admin/education/EducationEdit'
import EducationDelete from './components/admin/education/EducationDelete'
import Course from './components/admin/course/Course'
import CourseDelete from './components/admin/course/CourseDelete'
import CourseEdit from './components/admin/course/CourseEdit'
import WorkExperience from './components/admin/workExperience/WorkExperience'
import WorkExperienceEdit from './components/admin/workExperience/WorkExperienceEdit'
import WorkExperienceDelete from './components/admin/workExperience/WorkExperienceDelete'
import Tags from './components/admin/tags/Tags'
import TagsDelete from './components/admin/tags/TagsDelete'
import TagsEdit from './components/admin/tags/TagsEdit'
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
        path: "course/:id/edit",
        element: <CourseEdit action="edit"/>
      },
      {
        path: "course/:id/delete",
        element: <CourseDelete />
      },
      {
        path: "course/new",
        element: <CourseEdit action="new" />
      },
      {
        path: "workExperience",
        element: <WorkExperience />
      },
      {
        path: "workExperience/:id/edit",
        element: <WorkExperienceEdit action="edit"/>
      },
      {
        path: "workExperience/:id/delete",
        element: <WorkExperienceDelete />
      },
      {
        path: "workExperience/new",
        element: <WorkExperienceEdit action="new" />
      },
      {
        path: "tags",
        element: <Tags />
      },
      {
        path: "tags/:id/edit",
        element: <TagsEdit action="edit"/>
      },
      {
        path: "tags/:id/delete",
        element: <TagsDelete />
      },
      {
        path: "tags/new",
        element: <TagsEdit action="new" />
      },
    ]
  },
  {
    path: "login",
    element: <Login />
  }
])
