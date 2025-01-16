const express = require('express');
const router = express.Router();
const { createEvent, getAllEvents, updateEvent, deleteEvent } = require('../controllers/eventController');
const authMiddleware = require('../middleware/authMiddleware');

// Create event (Protected route)
router.post('/create', authMiddleware, createEvent);

// Get all events (Anyone can access)
router.get('/all', getAllEvents);

// Update event (Protected route)
router.put('/update/:id', authMiddleware, updateEvent);

// Delete event (Protected route)
router.delete('/delete/:id', authMiddleware, deleteEvent);

module.exports = router;
