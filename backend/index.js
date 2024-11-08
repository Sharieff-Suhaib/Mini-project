const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const postRoutes = require('./routes/postRoutes');
const messageRoutes = require('./routes/messageRoutes'); 
const profileRoutes = require('./routes/profileRoutes');
const friendRoutes = require('./routes/friendRoutes');
const commentRoutes = require('./routes/commentRoutes');
const likeRoutes = require('./routes/likeRoutes');

const app = express();

app.use(cors({
  origin: 'http://localhost:3000'
}));
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/posts', postRoutes);
app.use('/uploads', express.static('uploads'));
app.use('/api/messages', messageRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/friends",friendRoutes);
app.use("/api/comments",commentRoutes);
app.use("/api/likes",likeRoutes);

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
