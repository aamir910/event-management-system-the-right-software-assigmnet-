import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Layout, Menu, Switch, Avatar, Typography } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import styles from '../styles/AppHeader.module.css';

const { Header } = Layout;
const { Text } = Typography;

const AppHeader = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const userName = 'Aamir Yasin'; // Replace with dynamic user data

  const handleThemeChange = (checked) => {
    setIsDarkMode(checked);
    document.body.setAttribute('data-theme', checked ? 'dark' : 'light');
  };

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
