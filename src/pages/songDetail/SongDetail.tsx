import React, {useState} from 'react';
import {
    IonActionSheet,
    IonBackButton,
    IonButton,
    IonButtons,
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonCardSubtitle,
    IonCol,
    IonContent,
    IonFab,
    IonFabButton,
    IonFabList,
    IonGrid,
    IonHeader,
    IonIcon,
    IonImg,
    IonInput,
    IonItem,
    IonLabel,
    IonPage,
    IonRow,
    IonTitle,
    IonToolbar,
} from '@ionic/react';
import {add, camera, caretDown, caretUp, document, mic, stopCircleOutline, trash} from 'ionicons/icons';
import {Photo, usePhotoGallery} from '../../hooks/usePhotoGallery';
import {useAudio} from '../../hooks/useAudio';
import {useBrowser} from '../../hooks/useBrowser';
import {Song, useSongStorage} from '../../hooks/useSong';
import {RouteComponentProps} from 'react-router';
import './SongDetail.css';

interface UserDetailPageProps extends RouteComponentProps<{
    id: string;
}> {
}

const SongDetail: React.FC<UserDetailPageProps> = ({match}) => {
    const {photos, takePhoto, deletePhoto} = usePhotoGallery();
    const {startRecordAudio, stopRecordAudio} = useAudio();
    const {openBrowser, openBrowser2} = useBrowser();
    const {songs, deleteSong, updateSong} = useSongStorage();

    const [photoToDelete, setPhotoToDelete] = useState<Photo>();
    const [recordAudio, setRecordAudio] = useState(false);
    const [tempo, setTempo] = useState(120);

    let currentSong: Song = {};

    if (songs.filter(p => p.songId === match.params.id)[0] !== undefined) {
        currentSong = songs.filter(p => p.songId === match.params.id)[0];
    }

    function changeTempo(tempoDelta: number) {
        setTempo(tempo+tempoDelta);
    }

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonBackButton defaultHref="/songs"/>
                    </IonButtons>
                    <IonTitle>Detail</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <IonFab vertical="top" horizontal="end" slot="fixed">
                    <IonFabButton color="light">
                        <IonIcon icon={add}></IonIcon>
                    </IonFabButton>
                    <IonFabList>
                        <IonFabButton onClick={() => takePhoto()}>
                            <IonIcon icon={camera}/>
                        </IonFabButton>
                        <IonFabButton onClick={() => {
                            startRecordAudio();
                            setRecordAudio(true)
                        }}>
                            <IonIcon icon={mic}/>
                        </IonFabButton>
                        <IonFabButton>
                            <IonIcon icon={document}/>
                        </IonFabButton>
                    </IonFabList>
                </IonFab>

                <IonCard class="ion-card-green">
                    <IonCardHeader>
                        <IonCardSubtitle class="ion-card-subtitle-white">Song details</IonCardSubtitle>
                    </IonCardHeader>

                    <IonCardContent>
                        <IonItem class="ion-item-green">
                            <IonLabel position="floating">Title:</IonLabel>
                            <IonInput clearInput value={currentSong.title} onIonChange={(e) => currentSong.title = (e.target as HTMLInputElement).value}></IonInput>
                        </IonItem>
                        <IonItem class="ion-item-green">
                            <IonLabel position="floating">Description:</IonLabel>
                            <IonInput clearInput value={currentSong.description} onIonChange={(e) => currentSong.description = (e.target as HTMLInputElement).value}></IonInput>
                        </IonItem>


                        <IonGrid class="ion-grid-padding ion-padding-top">
                            <IonRow class="ion-align-items-center ion-padding-start">
                                <IonCol size="3">
                                    <IonIcon size="large" icon={caretUp} onClick={() => {changeTempo(1)}}/>
                                </IonCol>
                                <IonCol size="6" class="ion-align-items-center ion-text-center">
                                    <h1>{tempo}</h1>
                                    <p>tap tempo</p>
                                </IonCol>
                                <IonCol size="3">
                                    <IonIcon size="large" icon={caretDown} onClick={() => {changeTempo(-1)}}/>
                                </IonCol>
                            </IonRow>
                        </IonGrid>
                    </IonCardContent>
                </IonCard>

                <IonCard class="ion-card-orange">
                    <IonCardHeader>
                        <IonCardSubtitle class="ion-card-subtitle-white">note sheets</IonCardSubtitle>
                    </IonCardHeader>

                    <IonCardContent>
                        <IonGrid>
                            <IonRow>
                                {photos.map((photo, index) => (
                                    <IonCol size="6" key={index}>
                                        <IonImg onClick={() => setPhotoToDelete(photo)} src={photo.base64 ?? photo.webviewPath}
                                                alt=""/>
                                    </IonCol>
                                ))}
                            </IonRow>
                        </IonGrid>
                    </IonCardContent>
                </IonCard>


                <IonCard class="ion-card-blue">
                    <IonCardHeader>
                        <IonCardSubtitle class="ion-card-subtitle-white">audio recordings</IonCardSubtitle>
                    </IonCardHeader>

                    <IonCardContent>
                        <IonButton expand="block" color="primary"
                                   onClick={() => openBrowser('http://capacitor.ionicframework.com/')}>Open Browser
                            1</IonButton>
                        <IonButton expand="block" color="primary" onClick={() => openBrowser2('audio1.wav')}>Open Recording</IonButton>
                    </IonCardContent>
                </IonCard>

                <IonButton expand="block" color="primary" onClick={() => {
                    updateSong(currentSong)
                }}>Update
                </IonButton>
                <IonButton expand="block" color="danger" onClick={() => {
                    deleteSong(match.params.id)
                }}>Delete
                </IonButton>


                <IonActionSheet
                    isOpen={!!photoToDelete}
                    buttons={[{
                        text: 'Delete',
                        role: 'destructive',
                        icon: trash,
                        handler: () => {
                            if (photoToDelete) {
                                deletePhoto(photoToDelete);
                                setPhotoToDelete(undefined);
                            }
                        }
                    }, {
                        text: 'Cancel',
                        icon: 'close',
                        role: 'cancel',
                        handler: () => {
                            console.log('Cancel clicked');
                        }
                    }]}
                    onDidDismiss={() => setPhotoToDelete(undefined)}
                />

                <IonActionSheet
                    isOpen={!!recordAudio}
                    buttons={[{
                        text: 'Stop recording',
                        role: 'destructive',
                        icon: stopCircleOutline,
                        handler: () => {
                            if (recordAudio) {
                                stopRecordAudio();
                                setRecordAudio(false);
                            }
                        }
                    }]}
                />

            </IonContent>
        </IonPage>
    );
};

export default SongDetail;
