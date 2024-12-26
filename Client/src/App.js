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
import { MarksAndGradesProvider } from "./ContextAPI/getMarksAndGradeContext";
import RoleBasedRoute from "./Routes/RoleBasedRoute/RoleBasedRoute";
import SubjectRecomendationScreen from "./screen/subjectRecomendationScreen/SubjectRecomendationScreen";
import Setting from "./screen/setting/Setting";
import Schedule from "./screen/shedule/Shedule";
import StudentProgress from "./screen/studentProgress/StudentProgress";


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
        path: "StudentProgress",
        element: (
          <PrivateRoute>
            <StudentProgress />
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
        path: "recomendedSubjects",
        element: (
          <PrivateRoute>
            <SubjectRecomendationScreen />
          </PrivateRoute>
        ),
      },
      {
        path: "schedule",
        element: (
          <PrivateRoute>
            <Schedule />
          </PrivateRoute>
        ),
      },
      {
        path: "setting",
        element: (
          <PrivateRoute>
            <Setting />
          </PrivateRoute>
        ),
      },
      {
        path: "lecturerDashboard",
        element: (
          <RoleBasedRoute allowedRoles={["LECTURER"]}>
            <LecturerDashboard />
          </RoleBasedRoute>
        ),
      },
    ],
  },
  { path: "/login", element: <LoginScreen /> },
]);

function App() {
  return (
    <GlobalProvider>
      <MarksAndGradesProvider>
        <div className="">
          <RouterProvider router={router} />
        </div>
      </MarksAndGradesProvider>
    </GlobalProvider>
  );
}

export default App;