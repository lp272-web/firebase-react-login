import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router";
import { Spin } from "antd";

import { AuthProvider, useAuth } from "./authContext";
import ProtectedRoute from "./protectedRoute";
import Login from "./login";
import Dashboard from "./dashboard";
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
  const { loading } = useAuth();

  return (
    <>
      <Spin spinning={loading} fullscreen size="large" styles={{ indicator: {fontsSize: 100, width: 100, height: 100} }} />
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