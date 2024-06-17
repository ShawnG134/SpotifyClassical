"use client";
import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";

interface AccessTokenContextType {
  accessToken: string | null;
  setAccessToken: (token: string) => void;
}

const AccessTokenContext = createContext<AccessTokenContextType | undefined>(
  undefined,
);

export const AccessTokenProvider = ({ children }: { children: ReactNode }) => {
  const [accessToken, setAccessToken] = useState<string | null>(null);

  useEffect(() => {
    // Fetch the token from your API or session storage if already available
    // For example, if using session storage:
    const token = sessionStorage.getItem("access_token");
    if (token) {
      setAccessToken(token);
    }
  }, []);

  return (
    <AccessTokenContext.Provider value={{ accessToken, setAccessToken }}>
      {children}
    </AccessTokenContext.Provider>
  );
};

export const useAccessToken = () => {
  const context = useContext(AccessTokenContext);
  if (context === undefined) {
    throw new Error(
      "useAccessToken must be used within an AccessTokenProvider",
    );
  }
  return context;
};
