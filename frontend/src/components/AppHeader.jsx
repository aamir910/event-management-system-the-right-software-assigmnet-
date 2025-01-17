import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Layout, Menu, Switch, Avatar, Typography } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { useSelector, useDispatch } from 'react-redux';
import { toggleTheme } from '../redux/slices/themeSlice'; // Import action
import styles from '../styles/AppHeader.module.css';

const { Header } = Layout;
const { Text } = Typography;

const AppHeader = () => {
  const dispatch = useDispatch();
  const isDarkMode = useSelector((state) => state.theme.isDarkMode); // Get theme from store
  const userName = 'Aamir Yasin'; // Replace with dynamic user data

  // Toggle theme handler
  const handleThemeChange = (checked) => {
    dispatch(toggleTheme()); // Dispatch the action to toggle theme
  };

  // Effect to update the body theme class
  useEffect(() => {
    document.body.setAttribute('data-theme', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  return (
    <Header className={isDarkMode ? styles.darkHeader : styles.lightHeader}>
      <div className={styles.container}>
        <div className={styles.logo}>The Right Software</div>

        <Menu
          theme={isDarkMode ? 'dark' : 'light'}
          mode="horizontal"
          selectable={false}
          className={styles.menu}
        >
          <Menu.Item key="home">
            <Link to="/">Home</Link>
          </Menu.Item>
          <Menu.Item key="login">
            <Link to="/login">Login</Link>
          </Menu.Item>
          <Menu.Item key="register">
            <Link to="/register">Register</Link>
          </Menu.Item>
          <Menu.Item key="dashboard">
            <Link to="/dashboard">Dashboard</Link>
          </Menu.Item>
        </Menu>

        <div className={styles.actions}>
          <Switch
            checked={isDarkMode}
            onChange={handleThemeChange}
            checkedChildren="🌙"
            unCheckedChildren="☀️"
            className={styles.themeSwitch}
          />

          <div className={styles.userProfile}>
            <Avatar size="small" icon={<UserOutlined />} />
            <Text className={styles.userName}>{userName}</Text>
          </div>
        </div>
      </div>
    </Header>
  );
};

export default AppHeader;
