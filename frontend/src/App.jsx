import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import WelcomeinPage from "./pages/WelcomePage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import ViewPage from "./pages/view.jsx";
import SignPage from "./pages/SignPage.jsx";
import LogoutPage from "./pages/LogOut.jsx";
import DashboardPage from "./pages/Dashboard.jsx";
import EditPage from "./pages/EditPage.jsx";
import HistoryPage from "./pages/HistroyPage.jsx";
import InputPage from "./pages/InputIn.jsx";
import InputexPage from "./pages/InputEx.jsx";
import ListPage from "./pages/List.jsx"
import React, { useEffect, useState } from "react";
import { apiClient } from "../src/utils/apiClient.jsx";

function App() {
  const [slowNetwork, setSlowNetwork] = useState(false);
  const [error, setError] = useState(false);
  useEffect(() => {
    let isMounted = true;

    (async () => {
      const { error: err, slowNetwork: isSlow } = await apiClient(
        "/api/auth/session",
        // "http://localhost:5000/wrong-url",
        { method: "GET" },
        1000
      );

      if (!isMounted) return;
      if (!navigator.onLine) {
        setError(true);
        setSlowNetwork(false);
        return;
      }

      // 2) Else if it timed out, mark slow network
      if (isSlow) {
        setSlowNetwork(true);
        setError(false);
        return;
      }

      // 3) Any other fetch error (e.g. CORS, DNS)
      if (err) {
        setError(true);
        setSlowNetwork(false);
        return;
      }

      // 4) Otherwise, clear both flags
      setError(false);
      setSlowNetwork(false);
    })();

    return () => {
      isMounted = false;
    };
  }, []);
  return (
    <Router>
      <div className="h-fit font-inter">
        {slowNetwork && (
        <div className="fixed inset-0 bg-opacity-50 flex h-25 justify-center z-50">
          <div className="bg-white rounded-2xl p-6 max-w-xs text-center shadow-xl">
            <p className="text-yellow-800 font-semibold mb-2">
              ⚠️ Slow Network Detected
            </p>
            <p className="text-gray-600 text-sm">
              Some features may not load optimally until your connection improves.
            </p>
          </div>
        </div>
      )}
      
      {error && !slowNetwork && (
        <div className="fixed top-0 text font-bold left-0 w-full h-full flex justify-center items-center bg-[#FA2F34] text-white py-2 text-center z-50">
          🚫 You appear to be offline or the server is unreachable.
        </div>
      )}
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/" element={<WelcomeinPage />} />
          <Route path="/dash" element={<DashboardPage />} />
          <Route path="/view" element={<ViewPage />} />
          <Route path="/sign" element={<SignPage />} />
          <Route path="/edit" element={<EditPage />} />
          <Route path="/logout" element={<LogoutPage />} />
          <Route path="/history" element={<HistoryPage />} />
          <Route path="/list" element={<ListPage />} />
          <Route path="/incinput" element={<InputPage />} />
          <Route path="/expinput" element={<InputexPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
