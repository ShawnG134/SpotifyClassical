# Spotify Classical Player

## Quick Demo
You can view all the classical works by a specific composer. Here, it shows a list of concertos by Beethoven.
<img width="1259" alt="image" src="https://github.com/ShawnG134/SpotifyClassical/assets/168505455/856c6284-96b9-4cc0-aa16-8ed85078afc9">
When you click on a particular classical composition, you can view all the versions available on Spotify, including the interpreter and the release year.
<img width="1259" alt="image" src="https://github.com/ShawnG134/SpotifyClassical/assets/168505455/bf17a7b9-1836-4689-9fd1-bd3654cfbad3">
You can easily navigate to the album and play any pieces.
<img width="1259" alt="image" src="https://github.com/ShawnG134/SpotifyClassical/assets/168505455/5f9f12fc-8d67-4737-b969-c0f861b1e8e5">




## Motivation

I was deeply intrigued by the design and functionality of Apple Classical. Specifically, as a fan of Gabriel Fauré,
whose piano works I highly recommend, I often found it difficult to locate his recordings. Apple Music elegantly resolves this issue, allowing me to enjoy numerous different versions of his
compositions.

Unfortunately, Spotify does not natively support a similar feature. As a result, I decided to develop my own Spotify
Classical Player using Next.js.

## Functionality

- Discover Different Recordings of the Same Classical Piece: Enables users to explore various recordings of the same
  classical music piece.
- Find a Complete List of Classical Pieces by a Composer: Provides an exhaustive list of all classical compositions from
  a specific composer.
- Filter by Composition Type: Allows users to filter compositions by type (Concerto, Sonata, Symphony) for a specific
  composer.
- To Be Determined: Additional features will be added based on user needs and feedback.

## What's this project for

This project is designed to inspire enthusiasts of classical music to develop similar applications for classical music.
It is aimed at those who appreciate Apple Classical but prefer not to switch to Apple Music.

## Where did I get my dataset?

I acquired the catalogue of classical composers and their pieces 100% legally from the IMSLP database, which provides a
comprehensive list of information about the pieces of various composers. After transforming using Pandas, I managed to
import this into Supabase, and then retrieve it in my Next.js App.

## Before you clone

Due to the nature of Spotify API, you must have a personal Spotify App account, which requires a client_id and
client_secret to run this app.

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
