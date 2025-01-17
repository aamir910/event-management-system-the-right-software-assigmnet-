import React from 'react';
import { Layout } from 'antd';
import './AppFooter.css'; // Import the CSS file

const { Footer } = Layout;

const AppFooter = ({ isDarkMode }) => {
  return (
    <Footer className={`footer ${isDarkMode ? '' : 'footer-light'}`}>
      Event Management System ©2025 Created by Aamir Yasin
    </Footer>
  );
};

export default AppFooter;
