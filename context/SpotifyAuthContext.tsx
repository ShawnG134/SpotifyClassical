import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

interface SpotifyContextProps {
  accessToken: string | null;
  setAccessToken: (token: string) => void;
}

const SpotifyContext = createContext<SpotifyContextProps | undefined>(
  undefined,
);

export const SpotifyProvider = ({ children }: { children: ReactNode }) => {
  const [accessToken, setAccessToken] = useState<string | null>(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("spotify_access_token");
    if (storedToken) {
      setAccessToken(storedToken);
    }
  }, []);

  const handleSetAccessToken = (token: string) => {
    setAccessToken(token);
    localStorage.setItem("spotify_access_token", token);
  };

  return (
    <SpotifyContext.Provider
      value={{ accessToken, setAccessToken: handleSetAccessToken }}
    >
      {children}
    </SpotifyContext.Provider>
  );
};

export const useSpotify = () => {
  const context = useContext(SpotifyContext);
  if (context === undefined) {
    throw new Error("useSpotify must be used within a SpotifyProvider");
  }
  return context;
};
