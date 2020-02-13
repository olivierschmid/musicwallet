import React, {useState} from 'react';
import {Browser, Capacitor, Filesystem, FilesystemDirectory, GetUriResult, Plugins} from '@capacitor/core';
import {
    IonBackButton,
    IonButtons,
    IonHeader,
    IonPage,
    IonToolbar,
    IonTitle,
    IonContent,
    IonFabButton,
    IonIcon,
    IonFabList,
    IonFab,
    IonList,
    IonListHeader,
    IonLabel,
    IonItem,
    IonGrid,
    IonRow,
    IonCol,
    IonImg, IonActionSheet, IonButton,
} from '@ionic/react';
import {add, book, camera, document, mic, trash} from 'ionicons/icons';
import {usePhotoGallery, Photo} from '../../hooks/usePhotoGallery';
import {useAudio} from '../../hooks/useAudio';
import {useBrowser} from '../../hooks/useBrowser';



const SongDetail: React.FC = () => {
    const {photos, takePhoto, deletePhoto} = usePhotoGallery();
    const {startRecordAudio, stopRecordAudio, loadAudio} = useAudio();
    const {openBrowser, openBrowser2} = useBrowser();

    const [photoToDelete, setPhotoToDelete] = useState<Photo>();
    const [recordAudio, setRecordAudio] = useState(false);

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

                <p>Details to song...{recordAudio}</p>

                <IonList lines="none">
                    <IonListHeader>
                        <IonLabel>Resources</IonLabel>
                    </IonListHeader>
                    <IonItem>
                        <IonIcon slot="start" color="medium" icon={book}/>
                        <IonLabel>Sheets</IonLabel>
                    </IonItem>
                </IonList>

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

                <IonButton expand="full" color="medium"
                           onClick={() => openBrowser('http://capacitor.ionicframework.com/')}>Open Browser
                    1</IonButton>
                <IonButton expand="full" color="medium" onClick={() => openBrowser2('')}>Open Recording</IonButton>


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
                        icon: trash,
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
