import { createBrowserRouter, RouterProvider } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import AdminLogin from "./components/signin/AdminLogin";
import Dashboard from "./components/signin/dashboard/Dashboard";
import AddAdminPage from "./components/signin/dashboard/AddAdminPage";
import AddMentorPage from "./components/signin/dashboard/AddMentorPage";
import AddCoursePage from "./components/signin/dashboard/AddCoursePage";
import MentorsPage from "./components/signin/dashboard/MentorsPage";
import AdminsPage from "./components/signin/dashboard/AdminsPage";




function App() {
const router = createBrowserRouter(
  [
    {
      path: "/",
      element:<AdminLogin/>
    },
    {
      path: "/dashboard",
      element:<Dashboard/>
    },
    {
      path: "/add-admin",
      element:<AddAdminPage/>
    },{
      path: "/add-mentor",
      element:<AddMentorPage/>
    },{
      path: "/add-course",
      element:<AddCoursePage/>
    },
    {
      path: "/mentors",
      element:<MentorsPage/>
    },
    {
      path: "/admins",
      element:<AdminsPage/>
    },
    
   
  ],
);
  return (
    <>
      <RouterProvider router={router}></RouterProvider>
    </>
  );
}

export default App;

