import React, { useState } from 'react';
import { Form, Input, Button } from 'antd';
import axios from 'axios';

const LoginForm = ({ onLogin }) => {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      const response = await axios.post('/api/users/login', values);
      onLogin(response.data.token);
    } catch (error) {
      console.error('Login failed:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form layout="vertical" onFinish={handleSubmit}>
      <Form.Item label="Email" name="email" rules={[{ required: true, message: 'Please input your email!' }]}>
        <Input type="email" />
      </Form.Item>
      <Form.Item label="Password" name="password" rules={[{ required: true, message: 'Please input your password!' }]}>
        <Input.Password />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" loading={loading}>
          Login
        </Button>
      </Form.Item>
    </Form>
  );
};

export default LoginForm;
