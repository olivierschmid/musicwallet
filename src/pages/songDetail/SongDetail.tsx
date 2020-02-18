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
    IonImg, IonInput,
    IonItem,
    IonLabel,
    IonPage,
    IonRow,
    IonTextarea,
    IonTitle,
    IonToolbar,
} from '@ionic/react';
import {add, camera, caretDown, caretUp, document, mic, stopCircleOutline, trash} from 'ionicons/icons';
import {Photo, usePhotoGallery} from '../../hooks/usePhotoGallery';
import {useAudio} from '../../hooks/useAudio';
import {useBrowser} from '../../hooks/useBrowser';
import {Song, useSongStorage} from '../../hooks/useSong';
import {RouteComponentProps} from 'react-router';

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

    let currentSong: Song = {};

    if (songs.filter(p => p.songId === match.params.id)[0] !== undefined) {
        currentSong = songs.filter(p => p.songId === match.params.id)[0];
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

                <IonCard>
                    <IonCardHeader>
                        <IonCardSubtitle>Song details</IonCardSubtitle>
                    </IonCardHeader>

                    <IonCardContent>
                        <IonItem>
                            <IonLabel position="floating">Title:</IonLabel>
                            <IonInput clearInput value={currentSong.title} onIonChange={(e) => currentSong.title = (e.target as HTMLInputElement).value}></IonInput>
                        </IonItem>
                        <IonItem>
                            <IonLabel position="floating">Description:</IonLabel>
                            <IonInput clearInput value={currentSong.description} onIonChange={(e) => currentSong.description = (e.target as HTMLInputElement).value}></IonInput>
                        </IonItem>


                        <IonGrid class="--ion-grid-padding">
                            <IonRow class="ion-align-items-center">
                                <IonCol size="3" >
                                    <p><IonIcon icon={caretUp}/></p>
                                </IonCol>
                                <IonCol size="6" class="ion-align-items-center ion-text-center">
                                    <h1>120</h1>
                                    <p>tap tempo</p>
                                </IonCol>
                                <IonCol size="3">
                                    <p><IonIcon icon={caretDown}/></p>
                                </IonCol>
                            </IonRow>
                        </IonGrid>
                    </IonCardContent>

                </IonCard>

                <IonCard>
                    <IonCardHeader>
                        <IonCardSubtitle>note sheets</IonCardSubtitle>
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


                <IonCard>
                    <IonCardHeader>
                        <IonCardSubtitle>audio recordings</IonCardSubtitle>
                    </IonCardHeader>

                    <IonCardContent>
                        <IonButton expand="block" color="medium"
                                   onClick={() => openBrowser('http://capacitor.ionicframework.com/')}>Open Browser
                            1</IonButton>
                        <IonButton expand="block" color="medium" onClick={() => openBrowser2('')}>Open Recording</IonButton>
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
