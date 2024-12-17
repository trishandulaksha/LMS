import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Dashboard from "./screen/dashboard/DashboardHome";
import GradeScreen from "./screen/grades/GradeScreen";
import LoginScreen from "./screen/loginScreen/loginScreen";
import MyProfile from "./screen/myprofile/MyProfile";
import Layout from "./Layout/Layout";
import PrivateRoute from "./Routes/PrivateRoutes/PrivateRoutes";
import LecturerDashboard from "./screen/Lecturer/LecturerMarks/LecturerMarksScreen";
import {
  GlobalProvider,
  UseDataContexts,
} from "./ContextAPI/LoginAndMarksContext";

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
        path: "myprofile",
        element: (
          <PrivateRoute>
            <MyProfile />
          </PrivateRoute>
        ),
      },
      {
        path: "lecturerDashboard",
        element: (
          <PrivateRoute>
            <LecturerDashboard />
          </PrivateRoute>
        ),
      },
    ],
  },
  { path: "/login", element: <LoginScreen /> },
]);

function App() {
  return (
    <GlobalProvider>
      <div className="">
        <RouterProvider router={router} />
      </div>
    </GlobalProvider>
  );
}

export default App;
