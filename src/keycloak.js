import Keycloak from 'keycloak-js';

const configKeycloak = {
  url: process.env.REACT_APP_KEYCLOAK_URL,
  realm: process.env.REACT_APP_KEYCLOAK_REALM,
  clientId: process.env.REACT_APP_KEYCLOAK_CLIENT_ID,
};

// Проверка наличия необходимых переменных окружения
if (!configKeycloak.url || !configKeycloak.realm || !configKeycloak.clientId) {
  throw new Error('Missing Keycloak configuration in environment variables.');
}

const keycloak = new Keycloak(configKeycloak);

// Инициализация Keycloak
const initKeycloak = async () => {
  try {
    await keycloak.init({
      onLoad: 'check-sso', // или 'login-required' в зависимости от ваших нужд
      silentCheckSsoRedirectUri: `index.html`, // Убедитесь, что этот путь доступен
    });
  } catch (error) {
    console.error('Failed to initialize Keycloak', error);
  }
};

export { keycloak, initKeycloak };