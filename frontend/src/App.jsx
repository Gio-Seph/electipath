// src/App.jsx
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import ElectiveRecommendation from "./pages/ElectiveRecommendation";
import ElectiveExploration from "./pages/ElectiveExploration";
import SkillAssessment from "./pages/SkillAssessment";
import AnalyticsPage from "./pages/explore/AnalyticsPage";
import MobilePage from "./pages/explore/MobilePage";
import MultimediaPage from "./pages/explore/MultimediaPage";
import InterestSurveyLanding from "./pages/InterestSurvey/LandingScreen";
import SurveyScreen from "./pages/InterestSurvey/SurveyScreen";
import TieBreakerScreen from "./pages/InterestSurvey/TiebreakerScreen";
import ResultScreen from "./pages/InterestSurvey/ResultScreen";
import { useAuth } from "./context/AuthContext";
import Navbar from "./components/Navbar";

function App() {
  console.log("VITE_API_URL =", import.meta.env.VITE_API_URL);
  const { user } = useAuth(); // ✅ now user is defined

  return (
    <>
      {/* Show Navbar for all pages except login & register */}
      {window.location.pathname !== "/login" && window.location.pathname !== "/register" && user && <Navbar />}
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route
        path="/dashboard"
        element={user ? <Dashboard /> : <Navigate to="/login" />}
      />
      <Route
        path="/recommendation"
        element={user ? <ElectiveRecommendation /> : <Navigate to="/login" />}
      />
      <Route
        path="/exploration"
        element={user ? <ElectiveExploration /> : <Navigate to="/login" />}
      />
      <Route
        path="/assessment"
        element={user ? <SkillAssessment /> : <Navigate to="/login" />}
      />
      <Route
        path="/explore/analytics"
        element={user ? <AnalyticsPage /> : <Navigate to="/login" />}
      />
      <Route
        path="/explore/mobile"
        element={user ? <MobilePage /> : <Navigate to="/login" />}
      />
      <Route
        path="/explore/multimedia"
        element={user ? <MultimediaPage /> : <Navigate to="/login" />}
      />
        <Route path="/interest-survey" element={user ? <InterestSurveyLanding /> : <Navigate to="/login" />} />
        <Route path="/interest-survey/survey" element={user ? <SurveyScreen /> : <Navigate to="/login" />} />
        <Route path="/interest-survey/tie-breaker" element={user ? <TieBreakerScreen /> : <Navigate to="/login" />} />
        <Route path="/interest-survey/result" element={user ? <ResultScreen /> : <Navigate to="/login" />} />
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
    </>
  );
}

export default App;
