import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonRow, IonGrid, useIonViewWillEnter, useIonViewDidEnter, IonCol, IonRefresher, IonRefresherContent, IonSearchbar } from '@ionic/react';
import { useState } from 'react';
import ListaFilmesEncontrados from '../components/filmesEncontradosLista';
import { Filme, getAllFilmes, API_getFilme, API_procuraFilme, getFilmesPesquisados, FilmePesquisado } from '../data/filmes';
import { useParams } from 'react-router';
import './styles.css';

const FilmesProcurados: React.FC = () => {
  const parametros = useParams<{ valorProcura: string }>();
  const [filmesPesquisados, setGilmesPesquisados] = useState<FilmePesquisado[]>([]);
  const [valorProcura, setValorProcura] = useState('');

  API_procuraFilme(parametros.valorProcura);

  useIonViewWillEnter(()=>{
    setGilmesPesquisados(getFilmesPesquisados());
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
              <IonCol><IonTitle>Era isto que procurava?</IonTitle></IonCol>
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
        <IonRefresher slot="fixed" onIonRefresh={refresh}>
          <IonRefresherContent></IonRefresherContent>
        </IonRefresher>
        <IonGrid>
          <IonRow>
            {filmesPesquisados.map(m => <ListaFilmesEncontrados key={m.imdbID} filme={m} />)}
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default FilmesProcurados;
