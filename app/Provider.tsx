"use client";

import React, { useContext, useEffect, useState } from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/configs/firebaseconfig";
import { AuthContext } from "./_context/AuthContext";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";

// Define a User type based on your Convex schema
type AppUser = {
  name: string
  email: string
  pictureURL: string
  credits: number
};

const Provider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<AppUser | null>(null); // Type explicitly

  const CreateUser = useMutation(api.users.CreateNewUser);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        const result = await CreateUser({
         name: firebaseUser.displayName ?? "",
         email: firebaseUser.email ?? "",
         pictureURL: firebaseUser.photoURL ?? "",    
        });
        setUser(result); // Now result must match AppUser type
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user }}>
      <NextThemesProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        {children}
      </NextThemesProvider>
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  return context;
};

export default Provider;
