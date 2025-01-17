const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel'); 

// Register new user
const registerUser = async (req, res) => {
  console.log( req.body ," req.body")
  const { name, email, password } = req.body;
  try {
    console.log(name ,email ,password ,"here are the values there " )
    // Check if user already exists
    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }
    // console.log(name ,email ,password ,"here are the values there " )

    // Hash password before saving
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = new User({ name, email, password: hashedPassword });
    
  //  console.log(name ,email ,password ,"here are the values there " )
    console.log(user  ,"user " )
    await user.save();
    return res.status(201).json({
      message: 'User registered successfully',
      user: { id: user._id, name: user.name, email: user.email },
    });


  } catch (error) {
    console.log("here is the error accour there which i did not understand there " )
    console.error(error );
    res.status(500).json({ message: 'Server error' });
  }
};

// Login user and return JWT token
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Check if password matches
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id, name: user.name, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get user profile (protected route)
const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId); // From authMiddleware
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({ user: { id: user._id, name: user.name, email: user.email } });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  registerUser,
  loginUser,
  getUserProfile,
};
