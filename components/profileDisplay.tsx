"use client";
import { useEffect, useState } from "react";
import { useSpotifyAuth } from "@/context/SpotifyAuthContext";

const UserProfile = () => {
  const { accessToken } = useSpotifyAuth();
  const [profile, setProfile] = useState<any>(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      if (accessToken) {
        const response = await fetch("/api/profile", {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        console.log(accessToken);
        if (response.ok) {
          const data = await response.json();
          setProfile(data);
        } else {
          console.error("Failed to fetch profile");
        }
      }
    };

    fetchUserProfile();
  }, [accessToken]);

  if (!profile) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{profile.display_name}</h1>
      <p>{profile.email}</p>
    </div>
  );
};

export default UserProfile;
