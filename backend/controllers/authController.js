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
      
      const token = jwt.sign({ id: user.id }, 'login success', { expiresIn: '1h' });
      res.status(200).json({ message: "Login successful", token });
  } catch (error) {
      res.status(500).json({ message: "Error logging in", error });
  }
};

module.exports = {
  registerUser,loginUser,
};
