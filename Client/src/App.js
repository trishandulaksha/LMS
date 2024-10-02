import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Dashboard from "./screen/dashboard/DashboardHome";
import GradeScreen from "./screen/grades/GradeScreen";

import MyProfile from "./screen/myprofile/MyProfile";
import Layout from "./Layout/Layout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "dashboard", element: <Dashboard /> },
      { path: "grades", element: <GradeScreen /> },
      { path: "myprofile", element: <MyProfile /> },
    ],
  },
]);
function App() {
  return (
    <div className="">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
