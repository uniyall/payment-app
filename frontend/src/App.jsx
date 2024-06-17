import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppLayout from "./pages/AppLayout";
import SignInPage from "./pages/SignInPage";
import DashboardPage from "./pages/DashboardPage";
import SendPage from "./pages/SendPage";
import HomePage from "./pages/HomePage";
import SignUpPage from "./pages/SignUpPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" Component={AppLayout}>
          <Route index Component={HomePage} />
          <Route path="signup" Component={SignUpPage} />
          <Route path="signin" Component={SignInPage} />
          <Route path="dashboard" Component={DashboardPage} />
          <Route path="send" Component={SendPage} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
