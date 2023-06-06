'use client'

import LoginHeader from "@/components/LoginHeader";
import NicHeader from "@/components/NicHeader";
import KeycloakProvider from "@/providers/KeycloakProvider";
import React from "react";

import "tailwindcss/tailwind.css";

export default function TaskListLayout({ children }: { children: React.ReactNode}) {

  return (
    <div className="mx-auto my-0 flex flex-col items-center border shadow-md h-full w-[65%] overflow-auto">
      <NicHeader />
      <LoginHeader />
      <KeycloakProvider>
        {children}
      </KeycloakProvider>
    </div>
  )
}

/* function parseCookies(req) {
  if (!req || !req.headers) {
    return {}
  }
  return cookie.parse(req.headers.cookie || '');
}

TaskListLayout.getInitialProps = async (context) => {
  return {
    cookies: parseCookies(context?.ctx?.req),
  }
}
 */