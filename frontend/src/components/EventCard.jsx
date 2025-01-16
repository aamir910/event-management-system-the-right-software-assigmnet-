import React from 'react';
import { Card, Button } from 'antd';

const EventCard = ({ event, onDelete }) => {
  return (
    <Card title={event.title} extra={<span>{event.date}</span>} style={{ margin: '16px' }}>
      <p>{event.description}</p>
      <p>Created by: {event.createdBy}</p>
      <Button type="primary" style={{ marginRight: '8px' }}>
        Edit
      </Button>
      <Button type="danger" onClick={() => onDelete(event._id)}>
        Delete
      </Button>
    </Card>
  );
};

export default EventCard;
