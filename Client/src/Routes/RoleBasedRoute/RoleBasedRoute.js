import { Navigate } from "react-router-dom";
import { UseDataContexts } from "../../ContextAPI/LoginAndMarksContext";

const RoleBasedRoute = ({ allowedRoles, children }) => {
  const { user } = UseDataContexts(); // Get the user from context
  const userRole = user?.success?.user?.role || "STUDENT"; // Default to "STUDENT"

  // Check if the user role matches any of the allowed roles
  if (allowedRoles && !allowedRoles.includes(userRole)) {
    return <Navigate to="/" />; // Redirect to the student dashboard if not a lecturer
  }

  return children;
};

export default RoleBasedRoute;
