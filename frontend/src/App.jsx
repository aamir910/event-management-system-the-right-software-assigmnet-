import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Layout } from 'antd';
import AppHeader from './components/AppHeader';
import AppFooter from './components/AppFooter';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import EventForm from './components/EventForm';
import ProtectedRoute from './components/ProtectedRoute';

const { Content } = Layout;

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [token, setToken] = useState(null);

  const handleLogin = (authToken) => {
    setToken(authToken);
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setToken(null);
    setIsAuthenticated(false);
  };

  return (
    <Router>
      <Layout className="layout">
        <AppHeader />
        <Content style={{ padding: '0 50px' }}>
          <div style={{ padding: '24px', minHeight: 280 }}>
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login onLogin={handleLogin} />} />
              <Route path="/register" element={<Register />} />

              {/* Protected Routes */}
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute isAuthenticated={isAuthenticated}>
                    <Dashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/create-event"
                element={
                  <ProtectedRoute isAuthenticated={isAuthenticated}>
                    <EventForm onSuccess={() => alert('Event Created!')} />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/edit-event/:id"
                element={
                  <ProtectedRoute isAuthenticated={isAuthenticated}>
                    <EventForm onSuccess={() => alert('Event Updated!')} />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </div>
        </Content>
        <AppFooter />
      </Layout>
    </Router>
  );
};

export default App;
