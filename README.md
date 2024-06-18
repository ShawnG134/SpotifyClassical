# Spotify Classical Player
## Motivation
I was deeply intrigued by the design and functionality of Apple Classical. Specifically, as a fan of Gabriel Fauré, whose piano works I highly recommend, I often found it difficult to locate his recordings. (Clearly not many people appreciate his piano works). Apple Music elegantly resolves this issue, allowing me to enjoy numerous different versions of his compositions.

Unfortunately, Spotify does not natively support a similar feature. As a result, I decided to develop my own Spotify Classical Player using Next.js.

## What's this project for
This project is designed to inspire enthusiasts of classical music to develop similar applications for classical music.
It is aimed at those who appreciate Apple Classical but prefer not to switch to Apple Music.

## Where did I get my dataset?
I acquired the catalogue of classical composers and their pieces 100% legally from the IMSLP database, which provides a comprehensive list of information about the pieces of various composers. After transforming using Pandas, I managed to import this into Supabase, and then retrieve it in my Next.js App.

## Before you clone
Due to the nature of Spotify API, you must have a personal Spotify App account, which requires a client_id and client_secret to run this app.
## Getting Started

To run Spotify Classical locally:

1. Clone the repository:
   ```
   git clone https://github.com/ShawnG134/SpotifyClassical
   ```
2. Install dependencies:
   ```
   npm install
   ```
3. Set up environment variables:
    - Create a `.env.local` file.
    - Add `SPOTIFY_CLIENT_ID` and `SPOTIFY_CLIENT_SECRET` with your Spotify API credentials.
4. Start the development server:
   ```
   npm run dev
   ```
   The application will be available at `http://localhost:3000`.
