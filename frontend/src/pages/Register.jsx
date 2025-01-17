import React from 'react';
import { Form, Input, Button, message } from 'antd';
import axios from 'axios';
import styles from '../styles/Register.module.css';

const Register = () => {
  const handleRegister = async (values) => {
    try {
      console.log("values here is the value", values);
      await axios.post('http://localhost:5000/api/users/register', values);
      message.success("Registration successful!");
      // Redirect to login after successful registration
    } catch (error) {
      console.error('Registration failed:', error);
      message.error(`Registration failed: ${error.message || "Unknown error"}`);
    }
  };

  return (
    <div className={styles.registerContainer}>
      <h2 className={styles.registerTitle}>Create an Account</h2>
      <Form layout="vertical" onFinish={handleRegister} className={styles.registerForm}>
        <Form.Item label="Name" name="name" rules={[{ required: true, message: 'Please input your name!' }]}> 
          <Input placeholder="Enter your name" />
        </Form.Item>
        <Form.Item label="Email" name="email" rules={[{ required: true, message: 'Please input your email!' }]}> 
          <Input type="email" placeholder="Enter your email" />
        </Form.Item>
        <Form.Item label="Password" name="password" rules={[{ required: true, message: 'Please input your password!' }]}> 
          <Input.Password placeholder="Enter your password" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" className={styles.registerButton}>
            Register
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Register;
