"use client";

import React, { useEffect, useState } from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { useUser } from "@clerk/nextjs";
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

function Provider({
  children,
  ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
  const { user } = useUser();
  const [userDetail, setUserDetail] = useState<UserDetail | null>(null);

  useEffect(() => {
    if (user) {
      createNewUser();
    }
  }, [user]);

  const createNewUser = async () => {
    const result = await axios.post("/api/user", {});
    setUserDetail(result?.data);
  };

  return (
    <NextThemesProvider {...props}>
      <UserDetailContext.Provider value={{ userDetail, setUserDetail }}>
        <Header />
        {children}
      </UserDetailContext.Provider>
    </NextThemesProvider>
  );
}

export default Provider;
