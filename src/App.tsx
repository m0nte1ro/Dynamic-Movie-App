import { Redirect, Route } from 'react-router-dom';
import {
  IonApp,
  IonRouterOutlet,
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import HomePage from './pages/homePage';
import VerFilme from './components/verFilme';
import FilmesProcurados from './pages/filmesEncontrados';
import Stats from './pages/stats';
import VerBoxOfficeRecomendados from './components/filmesRecomendadosBoxOffice';
import VerBoxOfficeBilheteira from './components/filmesBilheteiraBoxOffice';
import VerRatingsRecomendados from './components/filmesRecomendadosRating';
import VerRatingsBilheteira from './components/filmesBilheteiraRating';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <IonRouterOutlet>
        <Route path="/home">
          <HomePage />
        </Route>
        <Route path="/stats">
          <Stats />
        </Route>
        <Route path="/filmes_recomendados_box_office">
          <VerBoxOfficeRecomendados />
        </Route>
        <Route path="/filmes_recomendados_ratings">
          <VerRatingsRecomendados />
        </Route>
        <Route path="/filmes_bilheteira_box_office">
          <VerBoxOfficeBilheteira />
        </Route>
        <Route path="/filmes_bilheteira_ratings">
          <VerRatingsBilheteira />
        </Route>
        <Route path="/filme/:id">
          <VerFilme />
        </Route>
        <Route path="/search/:valorProcura">
          <FilmesProcurados />
        </Route>
        <Route exact path="/">
          <Redirect to="/home" />
        </Route>
      </IonRouterOutlet>
    </IonReactRouter>
  </IonApp>
);

export default App;
