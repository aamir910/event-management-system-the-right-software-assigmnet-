import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Layout, ConfigProvider } from "antd";
import { useDispatch, useSelector } from "react-redux";
import AppHeader from "./components/AppHeader";
import AppFooter from "./components/AppFooter";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import EventForm from "./components/EventForm";
import ProtectedRoute from "./components/ProtectedRoute";
import { toggleTheme } from "./redux/slices/themeSlice"; // Import toggleTheme action
import EventPage from "./pages/EventPage";

const { Content } = Layout;

const App = () => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated); // Keep auth state as it was
  const isDarkMode = useSelector((state) => state.theme.isDarkMode); // Access dark mode from Redux

  const handleLogin = (authToken) => {
    // Simulate setting token and authentication
    dispatch({ type: "auth/login", payload: authToken });
  };

  const handleLogout = () => {
    // Simulate removing token and logging out
    dispatch({ type: "auth/logout" });
  };

  // Set the theme configuration based on the current dark mode state
  const themeConfig = {
    token: {
      colorPrimary: isDarkMode ? "#1890ff" : "#4CAF50",
      colorTextBase: isDarkMode ? "#fff" : "#000",
      colorBackground: isDarkMode ? "#000" : "#fff",
    },
  };

  useEffect(() => {
    // You can persist theme changes in localStorage or other methods if needed
    // localStorage.setItem('isDarkMode', isDarkMode);
  }, [isDarkMode]);

  return (
    <Router>
      <ConfigProvider theme={themeConfig}>
        {" "}
        {/* Wrap the app with ConfigProvider */}
        <Layout
          style={{
            backgroundColor: isDarkMode ? "#000" : "#fff", // Apply the background color based on theme
            color: isDarkMode ? "#fff" : "#000", // Apply text color based on theme
          }}>
          <AppHeader onToggleTheme={() => dispatch(toggleTheme())} />{" "}
          {/* Pass toggleTheme to AppHeader */}
          <Content
            style={{
              padding: "0 50px",
            }}>
            <div style={{ padding: "24px", minHeight: 280 }}>
              <Routes>
                {/* Public Routes */}
                <Route path="/" element={<Home />} />
                <Route
                  path="/login"
                  element={<Login onLogin={handleLogin} />}
                />
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
                  path="/EventPage"
                  element={
                    <ProtectedRoute isAuthenticated={isAuthenticated}>
                      <EventPage />
                    </ProtectedRoute>
                  }
                />

                <Route
                  path="/create-event"
                  element={
                    <ProtectedRoute isAuthenticated={isAuthenticated}>
                      <EventForm onSuccess={() => alert("Event Created!")} />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/edit-event/:id"
                  element={
                    <ProtectedRoute isAuthenticated={isAuthenticated}>
                      <EventForm onSuccess={() => alert("Event Updated!")} />
                    </ProtectedRoute>
                  }
                />
              </Routes>
            </div>
          </Content>
          <AppFooter  isDarkMode={isDarkMode}  />
        </Layout>
      </ConfigProvider>
    </Router>
  );
};

export default App;
