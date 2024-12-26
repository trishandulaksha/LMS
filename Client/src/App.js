import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Dashboard from "./screen/dashboard/DashboardHome";
import GradeScreen from "./screen/grades/GradeScreen";
import LoginScreen from "./screen/loginScreen/loginScreen";
import Setting from "./screen/Settings/Setting";
import Layout from "./Layout/Layout";
import PrivateRoute from "./Routes/PrivateRoutes/PrivateRoutes";


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
            <MyProfile/>
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
