import { createBrowserRouter } from 'react-router-dom'
import App from './App';
import Admin from './pages/admin/Admin'

export const routes = createBrowserRouter([
  {
    path: "/",
    element: <App />
  },
  {
    path: "/admin",
    element: <Admin />
  }
])
