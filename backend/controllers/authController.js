const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { createUser,findUserByEmail } = require('../models/user');

const registerUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);
    const newUser = await createUser(email, passwordHash);

    return res.status(201).json({ message: 'User registered successfully', user: newUser });
  } catch (error) {
    console.error('Error registering user:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  
  try {
      const user = await findUserByEmail(email);
      
      if (!user) {
          return res.status(401).json({ message: "Invalid email or password" });
      }
      
      const isMatch = await bcrypt.compare(password, user.password);
      
      if (!isMatch) {
          return res.status(401).json({ message: "Invalid email or password" });
      }
      
      const token = jwt.sign({ user_id: user.user_id }, 'login success', { expiresIn: '1h' });
      console.log("Generated Token",token);
      res.status(200).json({ message: "Login successful", token });
      
  } catch (error) {
      res.status(500).json({ message: "Error logging in", error });
  }
  
};
const loginAdmin = async (req, res) => {
  const { email, password } = req.body;

  const adminEmail = 'admin@gmail.com';
  const adminPassword = 'Admin123';

  if (email === adminEmail && password === adminPassword) {
    return res.status(200).json({ message: 'Admin login successful' });
  } else {
    return res.status(401).json({ message: 'Invalid admin email or password' });
  }
};

module.exports = {
  registerUser,loginUser,loginAdmin
};
