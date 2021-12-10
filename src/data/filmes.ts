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

const listaFilmes: Filme[] = [];

const listaFilmesEcontrados: FilmePesquisado[] = [];

export const API_getFilme = (id: string) =>{
    return axios({
        url: API_URL + API_KEY + '&type=movie' + '&i=' + id, 
        method: 'get'
    }).then(resposta =>{
        if(resposta.data==null) return;
        if(listaFilmes.filter(e => e.imdbID === resposta.data.imdbID).length==0){
            listaFilmes.push(resposta.data);
        }
    })
}

export const API_procuraFilme = (titleInput: string) => {
    return axios({
      url: API_URL + API_KEY + '&type=movie' + '&s=' + titleInput,
      method: 'get'
    }).then(search => {
        if(search.data.Search == null) return;
        for (let m of Object(search.data.Search)) {
            if(listaFilmesEcontrados.length<search.data.Search.length)
                listaFilmesEcontrados.push(m);
        }
    })
  };

export const getFilme = (id: string) => listaFilmes.find(m => m.imdbID === id);

export const getAllFilmes = () => listaFilmes;

export const getFilmesPesquisados = () => listaFilmesEcontrados;