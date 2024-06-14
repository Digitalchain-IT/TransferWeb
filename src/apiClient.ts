import axios from 'axios';

// Create an Axios instance
const apiClient = axios.create({
  baseURL: 'http://127.0.0.1:1336', // Port-forwarded address
  headers: {
    'Content-Type': 'application/json',
  },
});

export default apiClient;