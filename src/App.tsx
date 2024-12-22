import { Route, Routes } from "react-router";
import Header from "./components/Header";
import Dashboard from "./pages/Dashboard";
import ProfilePage from "./pages/ProfilePage";

function App() {
  return (
    <div>
      <Header />

      <Routes>
        <Route index element={<Dashboard />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Routes>
    </div>
  );
}

export default App;
