import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../pages/Home/Home/Home";
import Login from "../pages/Shared/Login/Login";
import SignUp from "../pages/Shared/SignUp/SignUp";
import Dashboard from "../Layout/Dashboard";
import PrivateRoute from "./PrivateRoute";
import StudentHome from "../pages/Dashboard/Student/StudentHome";
import AdminHome from "../pages/Dashboard/Admin/AdminHome";
import AdminRoute from "./AdminRoute";
import AllUsers from "../pages/Dashboard/Admin/AllUsers";
import InstructorRoute from "./InstructorRoute";
import InstructorHome from "../pages/Dashboard/Instructor/InstructorHome";
import StudentRoute from "./StudentRoute";
import AddClass from "../pages/Dashboard/Instructor/AddClass";
import ManageClasses from "../pages/Dashboard/Admin/ManageClasses";
import Classes from "../pages/Classes/Classes";
import MySelectedClasses from "../pages/Dashboard/Student/MySelectedClasses";
import Payment from "../pages/Dashboard/Student/Payment";
import MyEnrolledClasses from "../pages/Dashboard/Student/MyEnrolledClasses";
import PaymentHistory from "../pages/Dashboard/Student/PaymentHistory";
import InstructorClasses from "../pages/Dashboard/Instructor/InstructorClasses";
import AllInstructors from "../pages/Instructors/AllInstructors";
import NotFoundPage from "../pages/Shared/NotFoundPage";
import Problems2 from "../pages/Problems2/Problems2";
import AddProblem from "../pages/AddProblem/AddProblem";
import Problems from "../pages/Problems/Problems";
import SingleProblem from "../pages/Problems/SingleProblem";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "classes",
        element: <Classes></Classes>,
      },
      {
        path: "problems2",
        element: <Problems2></Problems2>,
      },
      {
        path: "problems",
        element: <Problems></Problems>,
      },
      {
        path: "singleProblem/:id",
        element: <SingleProblem></SingleProblem>,
        loader: ({ params }) =>
          fetch(`http://localhost:5000/singleProblemData/${params.id}`),
      },
      {
        path: "addProblem",
        element: <AddProblem></AddProblem>,
      },
      {
        path: "allInstructors",
        element: <AllInstructors></AllInstructors>,
      },
      {
        path: "login",
        element: <Login></Login>,
      },
      {
        path: "signup",
        element: <SignUp></SignUp>,
      },
      {
        path: "dashboard",
        element: (
          <PrivateRoute>
            <Dashboard></Dashboard>
          </PrivateRoute>
        ),
        children: [
          {
            path: "adminhome",
            element: (
              <AdminRoute>
                <AdminHome></AdminHome>
              </AdminRoute>
            ),
          },
          {
            path: "manageClasses",
            element: (
              <AdminRoute>
                <ManageClasses></ManageClasses>
              </AdminRoute>
            ),
          },
          {
            path: "allusers",
            element: (
              <AdminRoute>
                <AllUsers></AllUsers>
              </AdminRoute>
            ),
          },
          {
            path: "instructorhome",
            element: (
              <InstructorRoute>
                <InstructorHome></InstructorHome>
              </InstructorRoute>
            ),
          },
          {
            path: "addclass",
            element: (
              <InstructorRoute>
                <AddClass></AddClass>
              </InstructorRoute>
            ),
          },
          {
            path: "instructorClasses",
            element: (
              <InstructorRoute>
                <InstructorClasses></InstructorClasses>
              </InstructorRoute>
            ),
          },
          {
            path: "studenthome",
            element: (
              <StudentRoute>
                <StudentHome></StudentHome>
              </StudentRoute>
            ),
          },
          {
            path: "mySelectedClasses",
            element: (
              <StudentRoute>
                <MySelectedClasses></MySelectedClasses>
              </StudentRoute>
            ),
          },
          {
            path: "myEnrolledClasses",
            element: (
              <StudentRoute>
                <MyEnrolledClasses></MyEnrolledClasses>
              </StudentRoute>
            ),
          },
          {
            path: "paymentHistory",
            element: (
              <StudentRoute>
                <PaymentHistory></PaymentHistory>
              </StudentRoute>
            ),
          },
          {
            path: "payment/:id",
            element: (
              <StudentRoute>
                <Payment></Payment>
              </StudentRoute>
            ),
            loader: ({ params }) =>
              fetch(`http://localhost:5000/mySelectClass/${params.id}`),
          },
        ],
      },
    ],
  },
  {
    path: "/*",
    element: <NotFoundPage></NotFoundPage>,
  },
]);

export default router;
