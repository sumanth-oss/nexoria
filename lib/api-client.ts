import axios, { AxiosError } from 'axios';

const apiClient = axios.create({
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error.response?.status === 429) {
      return Promise.reject(new Error('Rate limit exceeded. Please try again later.'));
    }
    if (error.response?.status === 401) {
      return Promise.reject(new Error('Authentication required. Please sign in.'));
    }
    if (error.response?.status >= 500) {
      return Promise.reject(new Error('Server error. Please try again later.'));
    }
    return Promise.reject(error);
  }
);

export default apiClient;

