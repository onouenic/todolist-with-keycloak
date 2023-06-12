import KeycloakProvider from "@/providers/KeycloakProvider";
import "tailwindcss/tailwind.css";

export default function RootLayout({
  children
} : {
  children: React.ReactNode
}) {
  return (
    <html>
      <body className="h-screen">
        <KeycloakProvider>
          {children}
        </KeycloakProvider>
      </body>
    </html>
  )
}