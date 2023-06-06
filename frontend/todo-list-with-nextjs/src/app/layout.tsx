import "tailwindcss/tailwind.css";

export default function RootLayout({
  children
} : {
  children: React.ReactNode
}) {
  return (
    <html>
      <body className="h-screen">
        {children}
      </body>
    </html>
  )
}