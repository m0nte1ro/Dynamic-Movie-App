import { Filme } from '../data/filmes'
import { IonCard, IonSlide } from '@ionic/react';

interface FilmeProps {
  propfilme: Filme | undefined;
}

const FilmeThumbnail: React.FC<FilmeProps> = ({ propfilme }) => {
  return (
    <IonSlide>
      <IonCard className="cardMovieList" routerLink={`/filme/${propfilme?.imdbID}`}>
        <img className="movieThumbnailList" src={propfilme?.Poster} />
        <div className="myOverlay">
          <h4 className="overlayTitle">{propfilme?.Title}</h4> ({propfilme?.Year})
        </div>
      </IonCard>
    </IonSlide>
  );
};

export default FilmeThumbnail;