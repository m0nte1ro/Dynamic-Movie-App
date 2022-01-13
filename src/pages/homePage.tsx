import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonRow, IonGrid, IonCol, IonSlides , IonSearchbar, IonButton } from '@ionic/react';
import FilmeThumbnail from '../components/filmeThumbnail';
import React,{ useState, useEffect } from 'react';
import axios from 'axios';
import './styles.css';

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

let tempFilmList : Filme[] = [];

export const filmeRecomendadosID = ["tt0111161", "tt0068646", "tt0167260", "tt0120737", "tt0137523", "tt0109830", "tt0167261", "tt0133093", "tt0099685", "tt0118799", "tt0317248", "tt0120815", "tt0816692", "tt2582802", "tt0071562", "tt1371111"]
export const filmesBilheteiraID = ["tt0468569", "tt0110912", "tt0080684", "tt10872600", "tt0076759", "tt0088763", "tt0110357", "tt1853728", "tt0172495", "tt4154756", "tt4633694", "tt7286456", "tt0114709", "tt0266697", "tt0075314"]

const HomePage: React.FC = () => {
  const API_URL = 'http://www.omdbapi.com/?apikey=';
  const API_KEY = 'ec279820';
  const [filmesRecomendados, setFilmesRecomendados] = useState<Filme[]>([]);
  const [filmesBilheteira, setFilmesBilheteira] = useState<Filme[]>([]);
  const [valorProcura, setValorProcura] = useState('');

  const slideOpts = {
    slidesPerView: 9,
    speed:400,
    coverflowEffect: {
      rotate: 50,
      stretch: 0,
      depth: 100,
      modifier: 1,
      slideShadows: true,
    },
  };

  const getFilme = (movies : string[]) =>{
    for(const id of movies){
      axios({
        method:'GET',
        url: API_URL + API_KEY + '&type=movie' + '&i=' + id
      }).then((res)=>{
        setFilmesRecomendados(filmesRecomendados=>[...filmesRecomendados, res.data])
      })
    }
  }
  const getFilmeBilheteira = (movies : string[]) =>{
    for(const id of movies){
      axios({
        method:'GET',
        url: API_URL + API_KEY + '&type=movie' + '&i=' + id
      }).then((res)=>{
        setFilmesBilheteira(filmesBilheteira=>[...filmesBilheteira, res.data])
      })
    }
  }
  
  React.useEffect(()=>{
    getFilme(filmeRecomendadosID);
    getFilmeBilheteira(filmesBilheteiraID);
  },[])
  
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonGrid>
            <IonRow>
              <IonCol><IonTitle>Bem vindo ao IMDB+</IonTitle></IonCol>
              <IonCol></IonCol>
              <IonCol>
                 <form action={"search/" + valorProcura}>
                  <IonSearchbar 
                    type="search"
                    className="searchBarTB" 
                    value = {valorProcura} 
                    onIonChange={(e)=>setValorProcura(e.detail.value!)} 
                    placeholder = "O que procura?">
                  </IonSearchbar>
                </form> 
              </IonCol>
            </IonRow>
          </IonGrid>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonGrid>
          <IonRow>
            <IonTitle>Recomendações Pessoais 😎😍
              <IonButton href="/filmes_recomendados_box_office">Box Office</IonButton>
              <IonButton href="/filmes_recomendados_ratings">Ratings</IonButton>
            </IonTitle>
            <IonSlides options={slideOpts} scrollbar={true} >
              {(filmesRecomendados==[]) ? "Carregando..." : filmesRecomendados.map(m => <FilmeThumbnail key={m.imdbID} propfilme={m} />)}
            </IonSlides>
          </IonRow>
          <IonRow>
            <IonTitle>Sucessos de bilheteira 🤯🤑
              <IonButton href="/filmes_bilheteira_box_office">Box Office</IonButton>
              <IonButton href="/filmes_bilheteira_ratings">Ratings</IonButton>
            </IonTitle>
            <IonSlides options={slideOpts} scrollbar={true} >
              {(filmesBilheteira==[]) ? "Carregando..." : filmesBilheteira.map(m => <FilmeThumbnail key={m.imdbID} propfilme={m} />)}
            </IonSlides>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default HomePage;
