import { Filme } from '../data/filmes'
import { IonCard } from '@ionic/react';

interface FilmeProps {
  filme: Filme;
}

const FilmeThumbnail: React.FC<FilmeProps> = ({ filme }) => {
  return (
    <IonCard className="cardMovieList" routerLink={`/movie/${filme.imdbID}`}>
      <img className="movieThumbnailList" src={filme.Poster} />
      <div className="myOverlay">
        <h4 className="overlayTitle">{filme.Title}</h4> ({filme.Year})
      </div>
    </IonCard>
  );
};

export default FilmeThumbnail;