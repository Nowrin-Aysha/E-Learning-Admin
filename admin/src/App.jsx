import { createBrowserRouter, RouterProvider } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

import Dashboard from "./components/signin/dashboard/Dashboard";
import AddAdminPage from "./components/signin/dashboard/AddAdminPage";
import AddMentorPage from "./components/signin/dashboard/AddMentorPage";
import AddCoursePage from "./components/signin/dashboard/AddCoursePage";
import MentorsPage from "./components/signin/dashboard/MentorsPage";
import MentorDetailsPage from "./components/signin/dashboard/mentorDetails";
import AdminsPage from "./components/signin/dashboard/AdminsPage";
import Login from "./components/signin/AdminLogin";
import Register from "./components/signin/MentorRegister";
import MentorLogin from "./components/signin/MentorLogin";
import MentorRegister from "./components/signin/MentorRegister";
import Profile from "./components/signin/dashboard/profile";


function App() {
  const router = createBrowserRouter(
    [
      {
        path: "/",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/mentorLogin",
        element: <MentorLogin />,
      },
      {
        path: "/mentorRegister",
        element: <MentorRegister />,
      },
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
      {
        path: "/profile",
        element: <Profile />,
      },
      {
        path: "/add-admin",
        element: <AddAdminPage />,
      },
      {
        path: "/add-mentor",
        element: <AddMentorPage />,
      },
      {
        path: "/add-course",
        element: <AddCoursePage />,
      },
      {
        path: "/mentors",
        element: <MentorsPage />,
      },
      {
        path: "/mentor-details/:mentorId",
        element: <MentorDetailsPage />,
      },
      {
        path: "/admins",
        element: <AdminsPage />,
      },
      {
        path: "*",
        element: <div>Page Not Found</div>,
      },
    ]
  );

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
