import Keycloak, { KeycloakConfig } from 'keycloak-js';

const keycloakConfig: KeycloakConfig = {
  clientId: process.env.NEXT_PUBLIC_KEYCLOAK_CLIENT_ID!,
  realm: process.env.NEXT_PUBLIC_KEYCLOAK_REALM!,
  url: process.env.NEXT_PUBLIC_KEYCLOAK_URL,
}

export const keycloak = new Keycloak(keycloakConfig);
