import React from 'react';
import {
    IonCard,
    IonCardContent,
    IonCol,
    IonContent,
    IonGrid,
    IonHeader,
    IonIcon,
    IonItem,
    IonLabel,
    IonList,
    IonPage,
    IonRow,
    IonTitle,
    IonToolbar
} from '@ionic/react';
import {caretUp} from 'ionicons/icons';

const Plan: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Plan</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>

          <IonGrid>
              <IonRow>
                  <IonCol size="6">
                      <IonCard color="success">
                        <IonCardContent>
                            <p>Reported</p>
                            <h1>33</h1>
                            <p><IonIcon icon={caretUp} />&nbsp;33</p>
                        </IonCardContent>
                      </IonCard>
                  </IonCol>
                  <IonCol size="6">
                      <IonCard color="primary">
                          <IonCardContent>
                              <p>Planned</p>
                              <h1>44</h1>
                              <p><IonIcon icon={caretUp} />&nbsp;33</p>
                          </IonCardContent>
                      </IonCard>
                  </IonCol>
              </IonRow>
          </IonGrid>




        <IonList>
          <IonItem>
            <IonLabel>
              <h2>Plan your exercises here...</h2>
            </IonLabel>
          </IonItem>
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Plan;