import axios from "axios";

export const TMDB_CONFIG = {
    BASE_URL: 'https://api.themoviedb.org/3',
    API_KEY: process.env.EXPO_PUBLIC_MOVIE_API_KEY,
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.EXPO_PUBLIC_MOVIE_API_KEY}`,
    }
}


export const fetchMovies = async ({query}: { query: string }) => {
    try {

        const urlEndpoint = query ?
            `${TMDB_CONFIG.BASE_URL}/search/movie?query=${encodeURIComponent(query)}`
            :
            `${TMDB_CONFIG.BASE_URL}/discover/movie?sort_by=popularity.desc`;
        const {data} = await axios.get(urlEndpoint, {headers: TMDB_CONFIG.headers});
        if (data && data.length > 0) {
            return data;
        }

    } catch (error) {
        console.log("Fetch Movies Error", error);
    }
}