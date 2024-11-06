import React from "react";
import { Navigate } from "react-router-dom";
import { useKeycloak } from "./keycloak";

const ProtectedRoute = ({ element: Component, ...rest }) => {
  const { keycloak } = useKeycloak();

  if (!keycloak || !keycloak.authenticated) {
    return <Navigate to="/" />;
  }

  return <Component {...rest} />;
};

export default ProtectedRoute;
