// API Configuration
// Uses environment variable in production, falls back to localhost for development
const API_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000';

export const API_BASE_URL = API_URL;
export default API_BASE_URL;
