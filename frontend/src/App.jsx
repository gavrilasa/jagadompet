import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import WelcomeinPage from './pages/WelcomePage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import HomePage from './pages/Home.jsx'
import ViewPage from './pages/view.jsx';
import SignPage from './pages/SignPage.jsx';
import LogoutPage from './pages/LogOut.jsx';
import DashboardPage from './pages/Dashboard.jsx'
import React from 'react';
import EditPage from './pages/EditPage.jsx';
import HistoryPage from './pages/HistroyPage.jsx';
import InputPage from './pages/InputIn.jsx';
import InputexPage from './pages/InputEx.jsx';

function App() {
  return (
    <Router>
      <div className="h-fit font-inter">
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/" element={<WelcomeinPage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/dash" element={<DashboardPage />} />
          <Route path="/view" element={<ViewPage />} />
          <Route path="/sign" element={<SignPage />} />
          <Route path="/edit" element={<EditPage />} />
          <Route path="/logout" element={<LogoutPage />} />
          <Route path="/history" element={<HistoryPage />} />
          <Route path="/incinput" element={<InputPage />} />
          <Route path="/expinput" element={<InputexPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

