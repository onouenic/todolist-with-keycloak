'use client'

import { useKeycloak } from "@react-keycloak/web";

export default function LoginHeader() {

  const { keycloak } = useKeycloak();

  return (
    <div>
      <button onClick={() => keycloak.login()}>Login</button>
      <button onClick={() => keycloak.logout()}>Logout</button>
    </div>
  )
}