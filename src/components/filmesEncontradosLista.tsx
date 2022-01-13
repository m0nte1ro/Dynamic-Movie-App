import {
    IonImg,
    IonItem,
    IonLabel,
    IonNote,
    IonIcon
    } from '@ionic/react';
  import { starOutline } from 'ionicons/icons';
  import { Filme } from '../data/filmes';

  interface FilmeProp {
    filmeProp:Filme;
  }

  
  const ListaFilmesEncontrados: React.FC<FilmeProp> = ({ filmeProp }) => {
    if(filmeProp.Poster=="N/A")
      filmeProp.Poster="imageNotFound.png"
      
    return (
      <>
      {(filmeProp.imdbID!="404")?(
      <IonItem routerLink={`/filme/${filmeProp.imdbID}`} detail={false} className="listaFilmesPesquisados">
        <IonImg className="thumbnailLista" src={filmeProp.Poster}/>
        <IonLabel className="ion-text-wrap">
          <h2>
            {filmeProp.Title} ({filmeProp.Year})
            <span className="date">
              <IonNote>{filmeProp.imdbRating} / 10 <IonIcon icon={starOutline} /></IonNote>
            </span>
          </h2>
          <h3>{filmeProp.Director}</h3>
          <p>
            {filmeProp.Plot}
          </p>
        </IonLabel>
      </IonItem>
      ):(
        <IonItem detail={false} className="listaFilmesPesquisados">
        <IonImg className="thumbnailLista" src={filmeProp.Poster}/>
        <IonLabel className="ion-text-wrap">
          <h2>
            {filmeProp.Title}
          </h2>
          <h3>{filmeProp.Director}</h3>
          <p>
            {filmeProp.Plot}
          </p>
        </IonLabel>
      </IonItem>
      )}
      </>
    );
  };
  export default ListaFilmesEncontrados;