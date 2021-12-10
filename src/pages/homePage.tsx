import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonRow, IonGrid, useIonViewWillEnter, useIonViewDidEnter, IonCol, IonRefresher, IonRefresherContent, IonSearchbar } from '@ionic/react';
import { useState } from 'react';
import FilmeThumbnail from '../components/filmeThumbnail';
import { Filme, getAllFilmes, API_getFilme, API_procuraFilme } from '../data/filmes';
import './styles.css';

API_getFilme('tt0111161', false);
API_getFilme('tt0068646', false);
API_getFilme('tt0167260', false);
API_getFilme('tt0468569', false);
API_getFilme('tt0108052', false);

const HomePage: React.FC = () => {
  const [filmes, setFilmes] = useState<Filme[]>([]);
  const [valorProcura, setValorProcura] = useState('');

  useIonViewWillEnter(()=>{
    setFilmes(getAllFilmes());
  })

  const refresh = (e: CustomEvent) => {
    setTimeout(() => {
      e.detail.complete();
    }, 3000);
  };
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
        <IonRefresher slot="fixed" onIonRefresh={refresh}>
          <IonRefresherContent></IonRefresherContent>
        </IonRefresher>
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
