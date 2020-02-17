import {
    IonAvatar,
    IonContent,
    IonFab,
    IonFabButton,
    IonHeader,
    IonIcon,
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
import {add} from 'ionicons/icons';
import {useSongStorage} from '../hooks/useSong';

const Songs: React.FC = () => {
    const {songs, addSong} = useSongStorage();
console.log(songs);
    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle size="large">Songs</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <IonSearchbar showCancelButton="focus"></IonSearchbar>


                <IonFab vertical="top" horizontal="end" slot="fixed">
                    <IonFabButton color="light" onClick={() => addSong({songId: '1',title: 'new song', description: 'this is a new song'})}>
                        <IonIcon icon={add}></IonIcon>
                    </IonFabButton>
                </IonFab>

                <IonList>
                    {songs.map((song, idx) =>
                        <IonItem key={idx} routerLink={"/songs/songdetail/"+song.songId}>
                            <IonAvatar slot="start">
                                <img src="/assets/music_emoticon2.png" alt=""/>
                            </IonAvatar>
                            <IonLabel>
                                <h2>{song.title}</h2>
                                <p>{song.description}</p>
                            </IonLabel>
                    </IonItem>)}
                </IonList>

            </IonContent>
        </IonPage>
    );
};

export default Songs;
