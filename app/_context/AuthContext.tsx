"use client"
import { createContext } from "react";

type AppUser = {
  name: string;
  email: string;
  pictureURL: string;
  credits: number;
};

type AuthContextType = {
  user: AppUser | null;
};

export const AuthContext = createContext<AuthContextType>({
  user: null,
});