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
    const status = error.response?.status;
    if (status === 429) {
      return Promise.reject(new Error('Rate limit exceeded. Please try again later.'));
    }
    if (status === 401) {
      return Promise.reject(new Error('Authentication required. Please sign in.'));
    }
    if (status && status >= 500) {
      return Promise.reject(new Error('Server error. Please try again later.'));
    }
    return Promise.reject(error);
  }
);

export default apiClient;

