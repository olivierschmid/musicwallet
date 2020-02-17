import React, {useState} from 'react';
import {
    IonActionSheet,
    IonBackButton,
    IonButton,
    IonButtons,
    IonCol,
    IonContent,
    IonFab,
    IonFabButton,
    IonFabList,
    IonGrid,
    IonHeader,
    IonIcon,
    IonImg,
    IonItem,
    IonLabel,
    IonList,
    IonListHeader,
    IonPage,
    IonRow,
    IonTextarea,
    IonTitle,
    IonToolbar,
} from '@ionic/react';
import {add, camera, document, mic, trash} from 'ionicons/icons';
import {Photo, usePhotoGallery} from '../../hooks/usePhotoGallery';
import {useAudio} from '../../hooks/useAudio';
import {useBrowser} from '../../hooks/useBrowser';


const SongDetail: React.FC = () => {
    const {photos, takePhoto, deletePhoto} = usePhotoGallery();
    const {startRecordAudio, stopRecordAudio, loadAudio} = useAudio();
    const {openBrowser, openBrowser2} = useBrowser();

    const [photoToDelete, setPhotoToDelete] = useState<Photo>();
    const [recordAudio, setRecordAudio] = useState(false);
    // const [segmentToShow, setSegmentToShow] = useState<any>();

    let segmentToShow = 'nothing';

    function setSegment(seg: any) {
        console.log('*** function setSegment was called with: ' + seg);
        segmentToShow = seg;
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


                <IonList lines="none">
                    <IonListHeader>
                        <IonLabel>Details</IonLabel>
                    </IonListHeader>
                    <IonItem>
                        <IonTextarea placeholder="Enter more information here..."></IonTextarea>
                    </IonItem>
                    <IonListHeader>
                        <IonLabel>Sheets</IonLabel>
                    </IonListHeader>
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

                <IonList lines="none">
                    <IonListHeader>
                        <IonLabel>Audio</IonLabel>
                    </IonListHeader>
                        <IonButton expand="block" color="medium"
                                   onClick={() => openBrowser('http://capacitor.ionicframework.com/')}>Open Browser 1</IonButton>
                        <IonButton expand="block" color="medium" onClick={() => openBrowser2('')}>Open Recording</IonButton>
                </IonList>




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
