import {
    IonImg,
    IonItem,
    IonLabel,
    IonNote,
    IonIcon
    } from '@ionic/react';
  import { starOutline } from 'ionicons/icons';
  import { Filme, API_getFilme } from '../data/filmes';

  interface FilmeProp {
    filme:Filme;
  }

  
  const ListaFilmesEncontrados: React.FC<FilmeProp> = ({ filme }) => {
    if(filme.Poster=="N/A")
      filme.Poster="imageNotFound.png"
    return (
      <IonItem routerLink={`/filme/${filme.imdbID}`} detail={false} className="listaFilmesPesquisados">
        <IonImg className="thumbnailLista" src={filme.Poster}/>
        <IonLabel className="ion-text-wrap">
          <h2>
            {filme.Title} ({filme.Year})
            <span className="date">
              <IonNote>{filme.imdbRating} / 10 <IonIcon icon={starOutline} /></IonNote>
            </span>
          </h2>
          {/* <h3>Directed by: {filme.Director}. Starring: {filme.Actors}</h3> */}
          <h3>{filme.Director}</h3>
          <p>
            {filme.Plot}
          </p>
        </IonLabel>
      </IonItem>
    );
  };
  export default ListaFilmesEncontrados;