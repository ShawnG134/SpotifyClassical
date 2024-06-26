import { useEffect, useMemo, useState } from "react"
import { toast } from "react-hot-toast"
import { Song } from "@/types"
import {getSongByID} from "@/action/getSongByID";

const useSongById = (id?: string) => {
  const [isLoading, setIsLoading] = useState(false)
  const [song, setSong] = useState<Song | undefined>(undefined)

  useEffect(() => {
    if (!id) {
      return
    }

    setIsLoading(true)

    const fetchSong = async () => {
      const Song = await getSongByID(id);
	  setSong(Song)
      setIsLoading(false)
    }

    fetchSong()
  }, [id])

  return useMemo(
    () => ({
      isLoading,
      song,
    }),
    [isLoading, song],
  )
}

export default useSongById
