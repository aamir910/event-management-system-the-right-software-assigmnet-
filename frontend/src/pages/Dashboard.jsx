import React, { useEffect, useState } from 'react';
import { Button, Row, Col } from 'antd';
import EventCard from '../components/EventCard';
import axios from 'axios';

const Dashboard = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    // Fetch events from API
    const fetchEvents = async () => {
      const response = await axios.get('/api/events');
      setEvents(response.data);
    };

    fetchEvents();
  }, []);

  const handleDeleteEvent = async (id) => {
    try {
      await axios.delete(`/api/events/delete/${id}`);
      setEvents(events.filter(event => event._id !== id));
    } catch (error) {
      console.error('Error deleting event:', error);
    }
  };

  return (
    <div>
      <Row gutter={[16, 16]}>
        {events.map((event) => (
          <Col span={8} key={event._id}>
            <EventCard event={event} onDelete={handleDeleteEvent} />
          </Col>
        ))}
      </Row>
      <Button type="primary" href="/create-event">
        Create Event
      </Button>
    </div>
  );
};

export default Dashboard;
