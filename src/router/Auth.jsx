import { Navigate } from "react-router";

const Auth = ({ children }) => {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  if (token && role === "admin") {
    return children;
  }

  return <Navigate to="/login" />;
};

export default Auth;
