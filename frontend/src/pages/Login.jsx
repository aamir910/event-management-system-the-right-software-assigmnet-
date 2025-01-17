import React, { useState } from 'react';
import { Form, Input, Button, Checkbox, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styles from '../styles/Register_login.module.css';  // Keep the styles

const Login = ({ onLogin }) => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (values) => {
    setLoading(true);
    try {
      const response = await axios.post('http://localhost:5000/api/users/login', values);
      const { token } = response.data;
      localStorage.setItem('authToken', token);
      onLogin(token);
      message.success('Login successful!');
      navigate('/dashboard');
    } catch (error) {
      message.error('Login failed. Please try again.');
      setLoading(false);
    }
  };

  return (
    <div className={styles.registerContainer}>
      <h2 className={styles.registerTitle}>Login</h2>
      <Form layout="vertical" name="login" onFinish={handleLogin} className={styles.registerForm}>
        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, message: 'Please input your email!', type: 'email' }]}>
          <Input />
        </Form.Item>
        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: 'Please input your password!' }]}>
          <Input.Password />
        </Form.Item>
        <Form.Item name="remember" valuePropName="checked">
          <Checkbox>Remember me</Checkbox>
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            loading={loading}
            className={styles.registerButton}>
            Log in
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Login;
