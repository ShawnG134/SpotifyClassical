import React, { createContext, useContext, useEffect, useState } from "react";
import { SpotifyApi } from "@spotify/web-api-ts-sdk";

// Define the type for your context state
interface SpotifyContextState {
  sdk: SpotifyApi | null;
}

// Create the context
const SpotifyContext = createContext<SpotifyContextState | undefined>(
  undefined,
);

// Export a custom hook to access the Spotify SDK
export const useSpotify = () => {
  const context = useContext(SpotifyContext);
  if (context === undefined) {
    throw new Error("useSpotify must be used within a SpotifyProvider");
  }
  return context.sdk;
};

// Create a Provider component
export const SpotifyProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [sdk, setSdk] = useState<SpotifyApi | null>(null);

  useEffect(() => {
    const spotifySdk = SpotifyApi.withUserAuthorization(
      "5e48a213c83748dab5411b7c481d54dd",
      "https://localhost:3000",
      ["user-read-private", "user-read-email"], // Example scopes
    );
    setSdk(spotifySdk);
  }, []);

  return (
    <SpotifyContext.Provider value={{ sdk }}>
      {children}
    </SpotifyContext.Provider>
  );
};
