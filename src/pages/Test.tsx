import React, {useState} from 'react';
import {
    IonBackButton,
    IonButtons,
    IonHeader,
    IonPage,
    IonToolbar,
    IonTitle,
    IonContent,
    IonButton,
    IonInput, IonItem, IonLabel
} from '@ionic/react';

const Test: React.FC = () => {

    const [show, setShow] = useState<boolean>(false);
    const [segment, setSegment] = useState<string>('nothing');

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonBackButton defaultHref="/plan"/>
                    </IonButtons>
                    <IonTitle>Detail</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <IonButton onClick={() => setShow(true)}>start</IonButton>
                <IonButton onClick={() => setShow(false)}>end</IonButton>
               <IonItem>
                   <IonLabel position="floating">Floating Label</IonLabel>
                   <IonInput onIonInput={(e) => {console.log(e.target)}}></IonInput>
               </IonItem>

                {show && (
                    <p>show is true</p>
                )}
                <p>Details</p>
            </IonContent>
        </IonPage>
    );
};

export default Test;
