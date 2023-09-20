"use client";
import React, { ReactNode } from "react";

interface RouteErrorProps {
  children: ReactNode;
}

const NetworkErrorBoundary: React.FC<RouteErrorProps> = ({ children }) => {
  const [hasError, setHasError] = React.useState(false);

  const handleNetworkError = () => {
    setHasError(true);
  };

  React.useEffect(() => {
    window.addEventListener("offline", handleNetworkError);
    window.addEventListener("online", handleNetworkError);

    return () => {
      window.removeEventListener("offline", handleNetworkError);
      window.removeEventListener("online", handleNetworkError);
    };
  }, []);

  if (hasError) {
    return <div>Network Error: Unable to connect.</div>;
  }

  return children;
};

export default NetworkErrorBoundary;
