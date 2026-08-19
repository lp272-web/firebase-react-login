import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router";
import { Spin } from "antd";

import { AuthProvider, useAuth } from "./hooks/authContext";
import ProtectedRoute from "./middleware/protectedRoute";
import OnlyUnauthRoute from "./middleware/onlyUnauthRoute";
import Login from "./components/login";
import Signup from "./components/signup";
import Dashboard from "./dashboard";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <OnlyUnauthRoute>
        {" "}
        <Login />
      </OnlyUnauthRoute>
    ),
  },

  {
    path: "/signup",
    element: (
      <OnlyUnauthRoute>
        <Signup />
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
      <Spin
        spinning={loading}
        fullscreen
        size="large"
        styles={{ indicator: { fontsSize: 100, width: 100, height: 100 } }}
      />
      <RouterProvider router={router} />
    </>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  </React.StrictMode>,
);
