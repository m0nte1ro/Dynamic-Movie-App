import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonRow, IonGrid, useIonViewWillEnter, useIonViewDidEnter, IonCol, IonRefresher, IonRefresherContent, IonSearchbar, IonRouterLink } from '@ionic/react';
import { useEffect, useState } from 'react';
import ListaFilmesEncontrados from '../components/filmesEncontradosLista';
import { useParams } from 'react-router';
import './styles.css';
import axios from 'axios';

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

const bm : Rating[] = [];

const badMovie: Filme = {
  Title: "Filme não encontrado",
  Year: "",
  Rated: "",
  Released: "",
  Runtime: "",
  Genre: "",
  Director: "",
  Writer: "",
  Actors: "",
  Plot: "",
  Language: "",
  Country: "",
  Awards: "",
  Poster: "imageNotFound.png",
  Ratings: bm,
  Metascore: "",
  imdbRating: "",
  imdbVotes: "",
  imdbID: "404",
  Type: "",
  DVD: "",
  BoxOffice: "",
  Production: "",
  Website: "",
  Response: "",
}

const FilmesProcurados: React.FC = () => {
  const API_URL = 'http://www.omdbapi.com/?apikey=';
  const API_KEY = 'ec279820';
  const parametros = useParams<{ valorProcura: string }>();
  const [filmesPesquisados, setFilmesPesquisados] = useState<Filme[]>([]);
  const [valorProcura, setValorProcura] = useState('');

  useEffect(()=>{
    axios({
      method:'POST',
      url:API_URL + API_KEY + '&type=movie' + '&s=' + parametros.valorProcura
    }).then(resposta=>{
      console.log(resposta.data.Response)
      if(resposta.data.Response=="False")
      {
        return setFilmesPesquisados(filmesPesquisados=>[...filmesPesquisados, badMovie])
      } 
      else 
      {
        for(const fp of resposta.data.Search){
          axios({
            method:'POST',
            url:API_URL + API_KEY + '&type=movie' + '&i=' + fp.imdbID
          }).then(resposta=>{
            setFilmesPesquisados(filmesPesquisados=>[...filmesPesquisados, resposta.data])
          })
        }
      }
    })
  },[])

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonGrid>
            <IonRow>
              <IonCol><IonRouterLink href="/home"><IonTitle>Era isto que procurava?</IonTitle></IonRouterLink></IonCol>
              <IonCol></IonCol>
              <IonCol>
              <form action={"search/" + valorProcura}>
                  <IonSearchbar 
                    type="search"
                    className="searchBarTB" 
                    value = {valorProcura} 
                    onIonChange={(e)=>setValorProcura(e.detail.value!)} 
                    placeholder = "Que mais quer de mim?">
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
            {filmesPesquisados.map(m => <ListaFilmesEncontrados key={m.imdbID} filmeProp={m} />)}
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default FilmesProcurados;
