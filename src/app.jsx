import { Routes, Route } from "react-router";
import Login from "./login";
import Dashboard from "./Dashboard";
import "./App.css";
import { AuthProvider } from "./authContext";
import ProtectedRoute from "./protectedRoute";

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </AuthProvider>
  );
}

export default App;
