import { Routes, Route } from "react-router";
import Login from "./login";
import Dashboard from "./dashboard";
import "./App.css";
import { AuthProvider } from "./authContext";
import ProtectedRoute from "./middleware/protectedRoute";

function App() {
  const a = 1;
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
