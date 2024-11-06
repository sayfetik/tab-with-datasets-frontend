import { useEffect, useState } from "react";
import { useKeycloak } from "./keycloak";

export function useUserProfile() {
  const { keycloak, initialized } = useKeycloak();
  const [userProfile, setUserProfile] = useState(keycloak?.profile);

  useEffect(() => {
    console.log(keycloak.authenticated);

    // Only load user profile if Keycloak is initialized and authenticated
    if (!initialized || !keycloak.authenticated || userProfile) return;

    keycloak.loadUserProfile().then((profile) => {
      setUserProfile(profile);
    });
  }, [keycloak, initialized]); // Dependency array to re-run effect when keycloak or initialized changes

  return userProfile;
}
