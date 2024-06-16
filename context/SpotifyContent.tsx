import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
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
    const fetchAccessToken = async () => {
      const response = await fetch("/api/token");
      if (response.ok) {
        const data = await response.json();
        setAccessToken(data.access_token);
      }
    };
    fetchAccessToken();
  }, []);

  return (
    <SpotifyContext.Provider value={{ accessToken, setAccessToken }}>
      {children}
    </SpotifyContext.Provider>
  );
};

export const useSpotify = () => {
  const context = useContext(SpotifyContext);
  if (!context) {
    throw new Error("useSpotify must be used within a SpotifyProvider");
  }
  return context;
};
