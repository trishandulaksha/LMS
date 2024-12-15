import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Dashboard from "./screen/dashboard/DashboardHome";
import GradeScreen from "./screen/grades/GradeScreen";
import LoginScreen from "./screen/loginScreen/loginScreen";
import MyProfile from "./screen/myprofile/MyProfile";
import Layout from "./Layout/Layout";
import PrivateRoute from "./Routes/PrivateRoutes/PrivateRoutes";
import Recosub from "./screen/recosub/recosub";
import StudentProgress from "./screen/StudentProgress/StudentProgress";
import Schedule from "./screen/Schedule/Schedule";
const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <PrivateRoute>
        <Layout />
      </PrivateRoute>
    ),
    children: [
      { index: true, element: <Dashboard /> },
      {
        path: "grades",
        element: (
          <PrivateRoute>
            <GradeScreen />
          </PrivateRoute>
        ),
      },

      {
        path: "Recosub",
        element: (
          <PrivateRoute>
            < Recosub/>
          </PrivateRoute>
        ),
      },
      {
        path: "StudentProgress",
        element: (
          <PrivateRoute>
            <StudentProgress />
          </PrivateRoute>
        ),
      },
      {
        path: "Schedule",
        element: (
          <PrivateRoute>
            < Schedule/>
          </PrivateRoute>
        ),
      },
      {
        path: "myprofile",
        element: (
          <PrivateRoute>
            <MyProfile />
          </PrivateRoute>
        ),
      },
    ],
  },
  { path: "/login", element: <LoginScreen /> },
]);

function App() {
  return (
    <div className="">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
