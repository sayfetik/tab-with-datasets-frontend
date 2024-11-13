import React from "react";
import "./App.css";
import AppContent from "./AppContent";
import { NotificationProvider } from "./components";
import { MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";
import { keycloak, KeycloakProvider } from "./keycloak";

const App = () => {
  return (
    <MantineProvider withGlobalStyles withNormalCSS>
      <KeycloakProvider authClient={keycloak}>
        <NotificationProvider>
          <AppContent />
        </NotificationProvider>
      </KeycloakProvider>
    </MantineProvider>
  );
};

export default App;
