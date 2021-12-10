import {
    IonImg,
    IonItem,
    IonLabel,
    IonNote
    } from '@ionic/react';
  import { FilmePesquisado } from '../data/filmes';
  
  interface FilmeEncontradoProp {
    filme: FilmePesquisado;
  }
  
  const ListaFilmesEncontrados: React.FC<FilmeEncontradoProp> = ({ filme }) => {
    return (
      <IonItem routerLink={`/filme/${filme.imdbID}`} detail={false}>
        <IonImg className="thumbnailLista" src={filme.Poster}/>
        <IonLabel className="ion-text-wrap">
          <h2>
            {filme.Title} ({filme.Year})
            <span className="date">
              <IonNote>{filme.Year}</IonNote>
            </span>
          </h2>
          <h3>{filme.Type}</h3>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          </p>
        </IonLabel>
      </IonItem>
    );
  };
  
  export default ListaFilmesEncontrados;