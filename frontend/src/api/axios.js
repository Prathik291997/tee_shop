import axios from 'axios';
import { API_BASE } from '../config';

// Example:
// REACT_APP_API_BASE = http://127.0.0.1:8000
// Final base URL becomes = http://127.0.0.1:8000/api/

const api = axios.create({
  baseURL: `${API_BASE}/api/`,
  headers: {
    "Accept": "application/json",
  },
});

export default api;
