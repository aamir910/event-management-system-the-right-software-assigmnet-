import React, { useEffect, useState } from 'react';
import { Table, Button, Modal, Form, Input, DatePicker, message } from 'antd';
import moment from 'moment';

const EventPage = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);
  const [form] = Form.useForm();

  const token = localStorage.getItem('authToken');

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    setLoading(true);
    try {
      const res = await fetch('http://localhost:5000/api/events/all', {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error('Failed to fetch');
      const data = await res.json();
      setEvents(data);
    } catch (error) {
      message.error('Failed to fetch events');
    }
    setLoading(false);
  };

  const showModal = (event = null) => {
    setEditingEvent(event);
    setIsModalVisible(true);
    if (event) {
      form.setFieldsValue({
        ...event,
        date: moment(event.date),
      });
    } else {
      form.resetFields();
    }
  };

  const handleOk = async () => {
    try {
      console.log(token ," here is the token there ")
      const values = await form.validateFields();
      const eventData = {
        ...values,
        date: values.date.format('YYYY-MM-DD'),
      };

      const url = editingEvent
        ? `http://localhost:5000/api/events/${editingEvent._id}`
        : 'http://localhost:5000/api/events/create';
      const method = editingEvent ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(eventData),
      });

      if (!res.ok) throw new Error('Operation failed');
      message.success(editingEvent ? 'Event updated successfully' : 'Event created successfully');
      fetchEvents();
      setIsModalVisible(false);
    } catch (error) {
      message.error('Operation failed');
    }
  };

  const handleDelete = async (id) => {
    try {
      const res = await fetch(`http://localhost:5000/api/events/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error('Failed to delete');
      message.success('Event deleted successfully');
      fetchEvents();
    } catch (error) {
      message.error('Failed to delete event');
    }
  };

  const columns = [
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
      render: (text) => moment(text).format('YYYY-MM-DD'),
    },
    {
      title: 'Location',
      dataIndex: 'location',
      key: 'location',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <>
          <Button onClick={() => showModal(record)}>Edit</Button>
          <Button danger onClick={() => handleDelete(record._id)}>Delete</Button>
        </>
      ),
    },
  ];

  return (
    <div>
      <Button type="primary" onClick={() => showModal()}>Create Event</Button>
      <Table columns={columns} dataSource={events} loading={loading} rowKey="_id" />
      <Modal
        title={editingEvent ? 'Edit Event' : 'Create Event'}
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={() => setIsModalVisible(false)}
      >
        <Form form={form} layout="vertical">
          <Form.Item name="title" label="Title" rules={[{ required: true, message: 'Please enter the title' }]}> 
            <Input />
          </Form.Item>
          <Form.Item name="description" label="Description">
            <Input.TextArea />
          </Form.Item>
          <Form.Item name="date" label="Date" rules={[{ required: true, message: 'Please select the date' }]}> 
            <DatePicker />
          </Form.Item>
          <Form.Item name="location" label="Location">
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default EventPage;
