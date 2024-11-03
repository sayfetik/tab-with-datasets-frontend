import axios from 'axios';
import { keycloak } from '@/keycloak'; // Убедитесь, что путь к вашему модулю правильный

const API_BASEURL = process.env.REACT_APP_API_URL; // Используем переменные окружения

const axiosClient = axios.create({
  baseURL: API_BASEURL,
});

axiosClient.interceptors.request.use(async (config) => {
  if (!keycloak.didInitialize || !keycloak.authenticated) {
    return config;
  }

  if (keycloak.isTokenExpired()) {
    const tokenRefreshed = await keycloak.updateToken();
    if (!tokenRefreshed) {
      keycloak.logout();
      window.location.replace('/');
    }
  }

  const authHeader = keycloak.token ? { Authorization: `Bearer ${keycloak.token}` } : {};
  config.headers.Authorization = authHeader.Authorization;

  return config;
});

export default axiosClient;