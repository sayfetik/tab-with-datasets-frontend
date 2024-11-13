import Keycloak from "keycloak-js";
import { createContext, useContext, useEffect, useState } from "react";

const configKeycloak = {
  url: process.env.REACT_APP_KEYCLOAK_URL,
  realm: process.env.REACT_APP_KEYCLOAK_REALM,
  clientId: process.env.REACT_APP_KEYCLOAK_CLIENT_ID,
};

if (!configKeycloak.url || !configKeycloak.realm || !configKeycloak.clientId) {
  throw new Error("Missing Keycloak configuration in environment variables.");
}

export let keycloak = new Keycloak(configKeycloak);

const KeycloakContext = createContext({ keycloak, initialized: false });

export const useKeycloak = () => {
  const { keycloak, initialized } = useContext(KeycloakContext);
  return { keycloak, initialized };
};

export const KeycloakProvider = ({ children }) => {
  const [localKeycloak, setLocalKeycloak] = useState(keycloak);
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    if (initialized) return;
    try {
      localKeycloak.init({ onLoad: "check-sso" }).then(() => {
        setInitialized(true);
      });
    } catch {
      keycloak = new Keycloak(configKeycloak);
      keycloak.init({ onLoad: "check-sso" }).then(() => {
        setInitialized(true);
      });
      setLocalKeycloak(keycloak);
    }
  }, []);

  return (
    <KeycloakContext.Provider
      value={{
        keycloak: localKeycloak,
        initialized,
      }}
    >
      {children}
    </KeycloakContext.Provider>
  );
};
