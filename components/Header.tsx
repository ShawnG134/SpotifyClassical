"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { twMerge } from "tailwind-merge";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { RxCaretLeft, RxCaretRight } from "react-icons/rx";
import { HiHome } from "react-icons/hi";
import { BiSearch } from "react-icons/bi";
import { FaUserAlt } from "react-icons/fa";
import toast from "react-hot-toast";

import Button from "./Button";
import useAuthModal from "@/hooks/useAuthModal";

import usePlayer from "@/hooks/usePlayer";
import { useSpotifyAuth } from "@/context/SpotifyAuthContext";

interface HeaderProps {
  children: React.ReactNode;
  className?: string;
}

const Header: React.FC<HeaderProps> = ({ children, className }) => {
  const player = usePlayer();
  const router = useRouter();
  const searchParams = useSearchParams();
  const supabaseClient = useSupabaseClient();
  const { setAccessToken } = useSpotifyAuth();

  useEffect(() => {
    // @ts-ignore
    const code = searchParams.get("code");
    // @ts-ignore
    const state = searchParams.get("state");
    if (code) {
      fetchAccessToken(code);
    }
  }, [searchParams]);

  const fetchAccessToken = async (code: string) => {
    try {
      const response = await fetch("/api/getAccessCode", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ code }),
      });

      if (response.ok) {
        const data = await response.json();
        setAccessToken(data.access_token);
        console.log("Access Token:", data.access_token);
        toast.success("Successfully logged in with Spotify!");
        router.push("/");
      } else {
        toast.error("Failed to log in with Spotify.");
      }
    } catch (error) {
      console.error("Error fetching access token:", error);
      toast.error("An error occurred.");
    }
  };

  const handleLogout = async () => {
    const { error } = await supabaseClient.auth.signOut();
    player.reset();
    router.refresh();
    if (error) {
      toast.error(error.message);
    } else {
      toast.success("Logged out!");
    }
  };

  const login = () => {
    window.location.href = "/api/login";
  };

  return (
    <div
      className={twMerge(
        `h-fit bg-gradient-to-b from-emerald-800 p-6`,
        className,
      )}
    >
      <div className="w-full mb-4 flex justify-between items-center">
        <div className="hidden md:flex gap-x-2 items-center">
          <button
            className="rounded-full bg-black flex justify-center items-center hover:opacity-75 transition"
            onClick={() => router.back()}
          >
            <RxCaretLeft className="text-white" size={35} />
          </button>
          <button
            className="rounded-full bg-black flex justify-center items-center hover:opacity-75 transition"
            onClick={() => router.forward()}
          >
            <RxCaretRight className="text-white" size={35} />
          </button>
        </div>
        <div className="flex md:hidden gap-x-2 items-center">
          <button className="rounded-full p-2 bg-white flex items-center jusitfy-center hover:opacity-75 transition">
            <HiHome className="text-black" size={20} />
          </button>
          <button className="rounded-full p-2 bg-white flex items-center jusitfy-center hover:opacity-75 transition">
            <BiSearch className="text-black" size={20} />
          </button>
        </div>
        <div className="flex justufy-between items-center gap-x-4">
          <>
            <div>
              <Button className="bg-white px-6 py-2" onClick={login}>
                Log in
              </Button>
            </div>
          </>
        </div>
      </div>
      {children}
    </div>
  );
};

export default Header;
