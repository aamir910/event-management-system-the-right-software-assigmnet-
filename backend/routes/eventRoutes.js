const express = require('express');
const Event = require('../models/Event');
const User = require('../models/User');
const router = express.Router();

// Create a new event
router.post('/', async (req, res) => {
  const { title, description, date, location, createdBy } = req.body;

  const event = new Event({
    title,
    description,
    date,
    location,
    createdBy,
  });

  try {
    const newEvent = await event.save();
    res.status(201).json(newEvent);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get all events
router.get('/', async (req, res) => {
  try {
    const events = await Event.find().populate('createdBy', 'name email');
    res.json(events);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
