import { createBrowserRouter } from 'react-router-dom'
import Home from './pages/home/Home';
import Admin from './pages/admin/Admin'

export const routes = createBrowserRouter([
  {
    path: "/",
    element: <Home />
  },
  {
    path: "/admin",
    element: <Admin />
  }
])
