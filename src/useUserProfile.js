import { useEffect, useState } from "react";
import { useKeycloak } from "./keycloak";

export function useUserProfile() {
  const { keycloak, initialized } = useKeycloak();
  const [userProfile, setUserProfile] = useState(keycloak?.profile);

  useEffect(() => {
    if (!initialized || !keycloak.authenticated || userProfile) return;

    keycloak.loadUserProfile().then((profile) => {
      setUserProfile(profile);
    });
  }, [keycloak, initialized]);

  return userProfile;
}
