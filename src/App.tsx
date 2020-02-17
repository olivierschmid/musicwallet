import React from 'react';
import {Redirect, Route} from 'react-router-dom';
import {IonApp, IonIcon, IonLabel, IonRouterOutlet, IonTabBar, IonTabButton, IonTabs} from '@ionic/react';
import {IonReactRouter} from '@ionic/react-router';
import {calendar, musicalNotes, person} from 'ionicons/icons';
import Songs from './pages/Songs';
import Plan from './pages/Plan';
import ProfilePage from './pages/Profile';
import Test from './pages/Test';
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
import SongDetail from './pages/songDetail/SongDetail';

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <IonTabs>
        <IonRouterOutlet>
          <Route path="/songs" component={Songs} exact={true} />
          <Route path="/songs/songdetail/:id" component={SongDetail} exact={true} />
          <Route path="/plan" component={Plan} exact={true} />
          <Route path="/test" component={Test} />
          <Route path="/profile" component={ProfilePage} />
          <Route path="/" render={() => <Redirect to="/songs" />} exact={true} />
        </IonRouterOutlet>
        <IonTabBar slot="bottom">
          <IonTabButton tab="songs" href="/songs">
            <IonIcon icon={musicalNotes} />
            <IonLabel>Songs</IonLabel>
          </IonTabButton>
          <IonTabButton tab="plan" href="/plan">
            <IonIcon icon={calendar} />
            <IonLabel>Plan</IonLabel>
          </IonTabButton>
          <IonTabButton tab="profile" href="/profile">
            <IonIcon icon={person} />
            <IonLabel>Profile</IonLabel>
          </IonTabButton>
        </IonTabBar>
      </IonTabs>
    </IonReactRouter>
  </IonApp>
);

export default App;
