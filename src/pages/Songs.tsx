import {
    IonAvatar,
    IonContent,
    IonHeader,
    IonItem,
    IonLabel,
    IonList,
    IonPage,
    IonSearchbar,
    IonTitle,
    IonToolbar
} from '@ionic/react';
import React from 'react';
import './Songs.css';

const Songs: React.FC = () => {
    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Songs</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <IonSearchbar showCancelButton="focus"></IonSearchbar>

                <IonList>
                    <IonItem routerLink="/songs/songdetail">
                        <IonAvatar slot="start">
                            <img src="/assets/music_emoticon1.jpg" alt=""/>
                        </IonAvatar>
                        <IonLabel>
                            <h2>Song 1</h2>
                            <p>This is my first song</p>
                        </IonLabel>
                    </IonItem>
                    <IonItem routerLink="/songs/songdetail">
                        <IonAvatar slot="start">
                            <img src="/assets/music_emoticon2.png" alt=""/>
                        </IonAvatar>
                        <IonLabel>
                            <h2>Song 2</h2>
                            <p>This is my second song</p>
                        </IonLabel>
                    </IonItem>
                    <IonItem routerLink="/songs/songdetail">
                        <IonAvatar slot="start">
                            <img src="/assets/music_emoticon2.png" alt=""/>
                        </IonAvatar>
                        <IonLabel>
                            <h2>Song 3</h2>
                            <p>This is my second song</p>
                        </IonLabel>
                    </IonItem>
                </IonList>

            </IonContent>
        </IonPage>
    );
};

export default Songs;
