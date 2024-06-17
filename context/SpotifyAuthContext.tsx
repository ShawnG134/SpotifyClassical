"use client";
import React, { createContext, useState, useContext, ReactNode } from "react";

interface SpotifyAuthContextType {
  accessToken: string | null;
  setAccessToken: (token: string) => void;
}

const SpotifyAuthContext = createContext<SpotifyAuthContextType | undefined>(
  undefined,
);

export const SpotifyAuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [accessToken, setAccessToken] = useState<string | null>(null);

  return (
    <SpotifyAuthContext.Provider value={{ accessToken, setAccessToken }}>
      {children}
    </SpotifyAuthContext.Provider>
  );
};

export const useSpotifyAuth = (): SpotifyAuthContextType => {
  const context = useContext(SpotifyAuthContext);
  if (!context) {
    throw new Error("useSpotifyAuth must be used within a SpotifyAuthProvider");
  }
  return context;
};
