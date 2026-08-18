import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router";
import { Spin } from "antd";

import { AuthProvider, useAuth } from "./authContext";
import ProtectedRoute from "./protectedRoute";
import Login from "./login";
import Dashboard from "./Dashboard";
import OnlyUnauthRoute from "./onlyUnauthRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <OnlyUnauthRoute>
        <Login />
      </OnlyUnauthRoute>
    ),
  },
  {
    path: "/dashboard",
    element: (
      <ProtectedRoute>
        <Dashboard />
      </ProtectedRoute>
    ),
  },
]);

function AppContent() {
  const { spinning } = useAuth();

  return (
    <>
      <Spin spinning={spinning} fullscreen />
      <RouterProvider router={router} />
    </>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  </React.StrictMode>
);