import { useState } from 'react';
import { Filme, getFilme, API_getFilme, getAllFilmes} from '../data/filmes';
import {
    IonBackButton,
    IonButtons,
    IonContent,
    IonHeader,
    IonIcon,
    IonItem,
    IonLabel,
    IonNote,
    IonPage,
    IonRouterLink,
    IonToolbar,
    useIonViewWillEnter,
    IonRefresher,
    IonRefresherContent
  } from '@ionic/react';
import { starOutline } from 'ionicons/icons';
import { useParams } from 'react-router';

function VerFilme(){
    const parametros = useParams<{ id: string }>();
    const [filme, setFilme] = useState<Filme>();

    useIonViewWillEnter(()=>{
        API_getFilme(parametros.id, false);
        setFilme(getFilme(parametros.id));
    });
    
    const refresh = (e: CustomEvent) => {
        setTimeout(() => {
          e.detail.complete();
        }, 3000);
    };
    return(
        <IonPage id="view-Movie-page">
            <IonHeader translucent>
                <IonToolbar>
                <IonButtons slot="start">
                    <IonBackButton text="Voltar" defaultHref="/home"></IonBackButton>
                </IonButtons>
                </IonToolbar>
            </IonHeader>

            <IonContent fullscreen>
                <IonRefresher slot="fixed" onIonRefresh={refresh}>
                    <IonRefresherContent></IonRefresherContent>
                </IonRefresher>
                {filme ? (
                <>
                    <IonItem>
                        <img className="posterImage" src={filme.Poster} />
                        <IonLabel>
                            <h1><IonRouterLink className="titleLink" href={'https://www.imdb.com/title/' + filme.imdbID}>{filme.Title} ({filme.Year})</IonRouterLink>
                            <span className="date">
                                <h3>
                                Rating: <IonNote>{filme.imdbRating} / 10 <IonIcon icon={starOutline} /></IonNote>
                                Votes: <IonNote>{filme.imdbVotes}</IonNote>
                                </h3>
                            </span>
                            </h1>
                            <br />
                            <h3>
                            Genre: <IonNote>{filme.Genre}</IonNote> Rated: <IonNote>{filme.Rated}</IonNote> Duration: <IonNote>{filme.Runtime}utes</IonNote>
                            </h3>
                            <h3>
                            Director: <IonNote>{filme.Director}</IonNote>
                            </h3>
                            <h3>
                            Writer(s): <IonNote>{filme.Writer}</IonNote>
                            </h3>
                            <h3>
                            Cast: <IonNote>{filme.Actors}</IonNote>
                            </h3>
                            <br />
                            <p className="synopsis">
                            {filme.Plot}
                            </p>
                            <br />
                        </IonLabel>
                    </IonItem>
                </>
        ) : (
          <div>Movie not found</div>
        )}
      </IonContent>
    </IonPage>
    );
}

export default VerFilme;