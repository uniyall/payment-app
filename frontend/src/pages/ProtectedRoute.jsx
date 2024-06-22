import { Navigate } from "react-router-dom";
import { useUser } from "../store/userStore";

export const ProtectedRoute = ({ children }) => {
  const [{ username }] = useUser();
  //   console.log(user);
  if (!username) {
    // user is not authenticated
    return <Navigate to="/" />;
  }
  return children;
};
