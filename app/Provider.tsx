"use client";

import React, { useEffect, useState } from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { SessionProvider, useSession } from "next-auth/react";
import axios from "axios";
import { UserDetailContext } from "@/context/UserDetailContext";
import Header from "./_components/Header";

type UserDetail = {
  id: number;
  name: string;
  email: string;
  points: number;
  subscription?: string | null;
};

function InnerProvider({ children }: { children: React.ReactNode }) {
  const { data: session } = useSession();
  const [userDetail, setUserDetail] = useState<UserDetail | null>(null);

  useEffect(() => {
    if (session?.user?.email) {
      loadUser();
    } else {
      setUserDetail(null);
    }
  }, [session]);

  const loadUser = async () => {
    try {
      const result = await axios.post("/api/user", {});
      setUserDetail(result?.data);
    } catch {
      // silently handle
    }
  };

  return (
    <UserDetailContext.Provider value={{ userDetail, setUserDetail }}>
      <Header />
      {children}
    </UserDetailContext.Provider>
  );
}

export default function Provider({
  children,
  ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
  return (
    <SessionProvider>
      <NextThemesProvider {...props}>
        <InnerProvider>{children}</InnerProvider>
      </NextThemesProvider>
    </SessionProvider>
  );
}
