import axios from 'axios';

const API_URL = 'http://www.omdbapi.com/?apikey=';
const API_KEY = 'ec279820';

export interface Rating {
    Source: string;
    Value: string;
}

export interface Filme {
    Title: string;
    Year: string;
    Rated: string;
    Released: string;
    Runtime: string;
    Genre: string;
    Director: string;
    Writer: string;
    Actors: string;
    Plot: string;
    Language: string;
    Country: string;
    Awards: string;
    Poster: string;
    Ratings: Rating[];
    Metascore: string;
    imdbRating: string;
    imdbVotes: string;
    imdbID: string;
    Type: string;
    DVD: string;
    BoxOffice: string;
    Production: string;
    Website: string;
    Response: string;
}

export interface FilmePesquisado {
    Title: string;
    Year: string;
    imdbID: string;
    Type: string;
    Poster: string;
}