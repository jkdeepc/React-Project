# react-movie-labs
# Assignment 1 - ReactJS app.

Name: [Wentao Lin]

## Overview.

This repository contains a Movies Fan app developed using ReactJS. The app allows users to discover new movies, view detailed information, add movies to a favorites list, and create a watchlist for future viewing. It uses The Movie Database (TMDB) API to fetch movie data.

### Features.

- Added "Watchlist" feature: Users can add movies to their watchlist for future viewing.
- Pagination for movie lists: Implemented pagination to easily navigate through long lists of movies.
- Search and Filter: Users can search for movies by title and filter by genre.
- Movie Recommendations: Display movie recommendations on the movie details page.
- Actor Information: Display actor details for each movie.

## Setup requirements.

To run the app locally after cloning the repository, follow these steps:

1. Install dependencies:

   ```bash
   npm install
   ```

2. Set up the environment variable for TMDB API key. Create a `.env` file in the root directory with the following content:

   ```
   REACT_APP_TMDB_KEY=YOUR_TMDB_API_KEY
   ```

   Replace `YOUR_TMDB_API_KEY` with your actual API key from [The Movie Database (TMDB)](https://www.themoviedb.org/).

3. Start the development server:

   ```bash
   npm start
   ```

## API endpoints.

- Discover list of movies - `discover/movie`
- Movie details - `movie/:id`
- Movie genres - `/genre/movie/list`
- Upcoming movies - `/movie/upcoming`
- Now playing movies - `/movie/now_playing`
- TV popular shows - `/tv/popular`
- TV show details - `/tv/:id`
- Movie recommendations - `/movie/:id/recommendations`
- Movie credits (actors) - `/movie/:id/credits`

## Routing.

- `/` - Home page displaying a list of discoverable movies.
- `/movies/favorites` - Displays the user's favorite movies.
- `/movies/:id` - Displays details of a particular movie.
- `/reviews/:id` - Displays a review for a specific movie.
- `/now-playing` - Displays a list of now-playing movies.
- `/movies/upcoming` - Displays a list of upcoming movies.
- `/tv` - Displays a list of popular TV shows.
- `/watchlist` - Displays the user's movie watchlist.

All routes are public; there are currently no protected routes requiring authentication.

## Independent learning (If relevant).

- **React Query for Data Fetching and Caching**: Adopted React Query to handle API calls and caching, providing a smoother user experience by reducing redundant network requests. Implemented in multiple components such as `WatchlistPage.js` and `UpcomingMoviesPage.js`. 
- **Pagination Implementation**: Implemented pagination for movie lists to improve navigation. Example code can be found in `MovieListPageTemplate.js`. 
