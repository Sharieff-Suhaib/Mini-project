import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000',
});
export const getConversations = async (userId) => {
  try {
    const response = await api.get(`/api/conversations/user/${userId}`);
    return response.data;
  } catch (error) {
    console.error("Failed to get conversations");
    throw error;
  }
};

export const getConversation = async (userId1, userId2) => {
  try {
    const response = await api.get(`/api/conversations/${userId1}/${userId2}`);
    return response.data;
  } catch (error) {
    console.error("Failed to get conversation");
    throw error;
  }
};

export const sendMessage = async (messageData) => {
  try {
    const response = await api.post(`/api/conversations/send`, messageData);
    return response.data;
  } catch (error) {
    console.error("Failed to send message");
    throw error;
  }
};
export const getPosts = async () =>{
    try{
        const response = await api.get("/api/posts/posts");
        return response.data;
    }
    catch(error){
        console.error("Failed to get posts");
        throw error;
    }
}
export const createPost = async (formData) => {
    try {
      const response = await api.post("/api/posts/create", formData);
      return response.data;
    } catch (error) {
      console.error("Failed to create post");
      throw error;
    }
  };
export const registerUser = (data) => api.post('/api/auth/register', data);
export const loginUser = async (email, password) => {
  try {
      const response = await fetch(`http://localhost:5000/api/auth/login`, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, password }),
      });
      
      if (!response.ok) {
          throw new Error('Login failed');
      }
      
      const data = await response.json();
      return data; 
  } catch (error) {
      console.error("Login error:", error);
      throw error;
  }
};
export default api;
