import React from 'react';
import { Layout } from 'antd';
import styles from '../styles/AppFooter.module.css'; // Import the CSS Module

const { Footer } = Layout;

const AppFooter = ({ isDarkMode }) => {
  return (
    <Footer className={`${styles.footer} ${isDarkMode ? '' : styles.footerLight}`}>
      Event Management System ©2025 Created by Aamir Yasin
    </Footer>
  );
};

export default AppFooter;
