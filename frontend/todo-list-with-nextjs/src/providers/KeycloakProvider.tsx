import { keycloak } from '@/keycloak/Keycloak'
import { ReactKeycloakProvider } from '@react-keycloak/web'

export default function KeycloakProvider({ children }: { children: React.ReactNode }) {

  const initOptions = {
    onLoad: 'check-sso',
    silentCheckSsoRedirectUri: `${process.env.NEXT_PUBLIC_HOST}/silent-check-sso.html`,
    checkLoginIframe: true,
    checkLoginIframeInterval: 300,
  };

  return (
    <ReactKeycloakProvider
      authClient={keycloak}
      initOptions={initOptions}
    >
      {children}
    </ReactKeycloakProvider>
  )
}