// import { useEffect, useState } from "react";
// import { useSpotify } from "@/providers/SpotifyClientProvider";
// import { Composer } from "@/types";
// import { SpotifyApi } from "@spotify/web-api-ts-sdk";
//
// // Custom hook that encapsulates data fetching logic
// export const useComposerPieces = () => {
//   const [composers, setComposers] = useState<Composer[]>([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState<Error | null>(null);
//   const sdk = useSpotify();
//
//   useEffect(() => {
//     if (!sdk) return;
//
//     const fetchComposerPieces = async () => {
//       setLoading(true);
//       setError(null);
//       try {
//         // Replace this with actual API call logic using sdk
//         const data = await getComposerPiecesFromSpotify(sdk);
//         setComposers(data);
//       } catch (error) {
//         setError(error as Error);
//       } finally {
//         setLoading(false);
//       }
//     };
//
//     fetchComposerPieces();
//   }, [sdk]);
//
//   return { composers, loading, error };
// };
//
// // Example utility function to simulate fetching data using the Spotify SDK
// async function getComposerPiecesFromSpotify(
//   sdk: SpotifyApi,
// ): Promise<Composer[]> {
//   // Simulate API call
//   return new Promise((resolve) => {
//     setTimeout(() => {
//       resolve([{ name: "Johann Sebastian Bach", id: "1" }]); // Example data
//     }, 1000);
//   });
// }
