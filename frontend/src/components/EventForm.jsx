import React, { useState } from 'react';
import { Form, Input, Button } from 'antd';
import axios from 'axios';

const EventForm = ({ event, onSuccess }) => {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      if (event) {
        // Update existing event
        await axios.put(`/api/events/${event._id}`, values);
      } else {
        // Create new event
        await axios.post('/api/events', values);
      }
      onSuccess();
    } catch (error) {
      console.error('Event operation failed:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form layout="vertical" onFinish={handleSubmit} initialValues={event}>
      <Form.Item label="Title" name="title" rules={[{ required: true, message: 'Please input the event title!' }]}>
        <Input />
      </Form.Item>
      <Form.Item label="Description" name="description" rules={[{ required: true, message: 'Please input the event description!' }]}>
        <Input.TextArea rows={4} />
      </Form.Item>
      <Form.Item label="Date" name="date" rules={[{ required: true, message: 'Please input the event date!' }]}>
        <Input type="date" />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" loading={loading}>
          {event ? 'Update Event' : 'Create Event'}
        </Button>
      </Form.Item>
    </Form>
  );
};

export default EventForm;
