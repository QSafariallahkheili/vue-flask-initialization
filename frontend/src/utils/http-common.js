import axios from 'axios';

export const HTTP = axios.create({
  baseURL: import.meta.env.VITE_APP_API_BASE_URL
  
})