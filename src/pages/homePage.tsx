import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonRow, IonGrid } from '@ionic/react';
import { useState } from 'react';
import FilmeThumbnail from '../components/filmeThumbnail';
import { Filme } from '../data/filmes';
import './styles.css';

const HomePage: React.FC = () => {
  const [filmes, setFilmes] = useState<Filme[]>([]);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Tab 1</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Bem vindo ao meu Movie APP!</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonGrid>
          <IonRow>
            {filmes.map(m => <FilmeThumbnail key={m.imdbID} filme={m} />)}
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default HomePage;
