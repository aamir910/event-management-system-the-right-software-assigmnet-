import React from 'react';
import { Link } from 'react-router-dom';
import { Layout, Menu } from 'antd';

const { Header } = Layout;

const AppHeader = () => {
  return (
    <Header>
      <Menu theme="dark" mode="horizontal" selectable={false}>
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
    </Header>
  );
};

export default AppHeader;
