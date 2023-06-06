import { keycloak } from "@/keycloak/Keycloak";

export default function LoginHeader() {

  return (
    <div>
      <button onClick={() => keycloak.login()}>Login</button>
      <button onClick={() => keycloak.logout()}>Logout</button>
    </div>
  )
}