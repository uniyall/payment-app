import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppLayout from "./pages/AppLayout";
import SignInPage from "./pages/SignInPage";
import DashboardPage from "./pages/DashboardPage";
import HomePage from "./pages/HomePage";
import SignUpPage from "./pages/SignUpPage";
import { ProtectedRoute } from "./pages/ProtectedRoute";
import { UserProvider } from "./store/userStore.jsx";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <UserProvider>
          <Routes>
            <Route path="/" Component={AppLayout}>
              <Route index Component={HomePage} />
              <Route path="signup" Component={SignUpPage} />
              <Route path="signin" Component={SignInPage} />
              <Route
                path="dashboard"
                element={
                  <ProtectedRoute>
                    <DashboardPage />
                  </ProtectedRoute>
                }
              />
            </Route>
          </Routes>
        </UserProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
