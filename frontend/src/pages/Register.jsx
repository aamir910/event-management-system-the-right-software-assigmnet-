import React from 'react';
import { Form, Input, Button } from 'antd';
import axios from 'axios';

const Register = () => {
  const handleRegister = async (values) => {
    try {
      await axios.post('/api/users/register', values);
      // Redirect to login after successful registration
    } catch (error) {
      console.error('Registration failed:', error);
    }
  };

  return (
    <Form layout="vertical" onFinish={handleRegister}>
      <Form.Item label="Name" name="name" rules={[{ required: true, message: 'Please input your name!' }]}>
        <Input />
      </Form.Item>
      <Form.Item label="Email" name="email" rules={[{ required: true, message: 'Please input your email!' }]}>
        <Input type="email" />
      </Form.Item>
      <Form.Item label="Password" name="password" rules={[{ required: true, message: 'Please input your password!' }]}>
        <Input.Password />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Register
        </Button>
      </Form.Item>
    </Form>
  );
};

export default Register;
