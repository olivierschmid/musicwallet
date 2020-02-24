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
    IonList,
    IonPage,
    IonPopover,
    IonRange,
    IonRow,
    IonSlide,
    IonSlides,
    IonTitle,
    IonToolbar,
} from '@ionic/react';
import {
    add,
    camera,
    caretDown,
    caretUp,
    document,
    mic,
    micOutline,
    musicalNotesOutline,
    playOutline,
    removeOutline,
    stopCircleOutline,
    trash
} from 'ionicons/icons';
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

let TimerMixin = require('react-timer-mixin');

const SongDetail: React.FC<UserDetailPageProps> = ({match}) => {
    const {photos, takePhoto, deletePhoto} = usePhotoGallery();
    const {startRecordAudio, stopRecordAudio, playbackAudio, playbackAudioLocal, getAudioDuration, isPlaying} = useAudio();
    const {openBrowser, openBrowserInternal} = useBrowser();
    const {songs, deleteSong, updateSong} = useSongStorage();

    const [photoToDelete, setPhotoToDelete] = useState<Photo>();
    const [recordAudio, setRecordAudio] = useState(false);
    const [recordAudioTime, setRecordAudioTime] = useState<number>(0);
    const [tempo, setTempo] = useState(120);

    let currentSong: Song = {};

    if (songs.filter(p => p.songId === match.params.id)[0] !== undefined) {
        currentSong = songs.filter(p => p.songId === match.params.id)[0];
    }

    function changeTempo(tempoDelta: number) {
        setTempo(tempo + tempoDelta);
    }

    function recordAudioFunction(record: boolean) {
        console.log('*** SongDetail: call recordAudioFunction with ' + record);
        if (record) {
            setRecordAudio(true);
            setRecordAudioTime(0);

            TimerMixin = setInterval(() => {
                console.log('*** Timer tick');
                setRecordAudioTime(prevRecordAudioTime => prevRecordAudioTime + 1);
            }, 1000);
        } else {
            setRecordAudio(false);
            console.log('*** Timer stop');
            stopRecordAudio();
            setRecordAudioTime(0);
            clearTimeout(TimerMixin);
        }
    }

    const slideOpts = {
        initialSlide: 1,
        speed: 400,
        slidesPerView: 3,
    };

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
                            recordAudioFunction(true)
                        }}>
                            <IonIcon icon={mic}/>
                        </IonFabButton>
                        <IonFabButton>
                            <IonIcon icon={document}/>
                        </IonFabButton>
                    </IonFabList>
                </IonFab>

                {/* -- Song Details -- */}
                <IonCard class="ion-card-green">
                    <IonCardHeader>
                        <IonCardSubtitle class="ion-card-subtitle-white">Song details {getAudioDuration}</IonCardSubtitle>
                    </IonCardHeader>

                    <IonCardContent>
                        <IonItem class="ion-item-green">
                            <IonLabel position="floating">Title:</IonLabel>
                            <IonInput clearInput value={currentSong.title}
                                      onIonChange={(e) => currentSong.title = (e.target as HTMLInputElement).value}/>
                        </IonItem>
                        <IonItem class="ion-item-green">
                            <IonLabel position="floating">Description:</IonLabel>
                            <IonInput clearInput value={currentSong.description}
                                      onIonChange={(e) => currentSong.description = (e.target as HTMLInputElement).value}/>
                        </IonItem>


                        <IonGrid class="ion-grid-padding ion-padding-top">
                            <IonRow class="ion-align-items-center ion-padding-start">
                                <IonCol size="3">
                                    <IonIcon size="large" icon={caretUp} onClick={() => {
                                        changeTempo(1)
                                    }}/>
                                </IonCol>
                                <IonCol size="6" class="ion-align-items-center ion-text-center">
                                    <h1>{tempo}</h1>
                                    <p>tap tempo</p>
                                </IonCol>
                                <IonCol size="3">
                                    <IonIcon size="large" icon={caretDown} onClick={() => {
                                        changeTempo(-1)
                                    }}/>
                                </IonCol>
                            </IonRow>
                        </IonGrid>
                    </IonCardContent>
                </IonCard>

                {/* -- Note sheets -- */}
                <IonCard class="ion-card-red">
                    <IonCardHeader>
                        <IonCardSubtitle class="ion-card-subtitle-white">note sheets</IonCardSubtitle>
                    </IonCardHeader>

                    <IonCardContent>
                        <IonGrid>
                            <IonRow>
                                {photos.map((photo, index) => (
                                    <IonCol size="6" key={index}>
                                        <IonImg onClick={() => setPhotoToDelete(photo)}
                                                src={photo.base64 ?? photo.webviewPath}
                                                alt=""/>
                                    </IonCol>
                                ))}
                            </IonRow>
                        </IonGrid>
                    </IonCardContent>
                </IonCard>

                {/* -- Audio Recordings -- */}
                <IonSlides options={slideOpts}>
                    <IonSlide class="ion-card-yellow">
                        <IonCard class="ion-card-yellow">
                            <IonCardHeader>
                                <IonCardSubtitle class="ion-card-subtitle-white">New</IonCardSubtitle>
                            </IonCardHeader>

                            <IonCardContent>
                                <IonIcon size="large" icon={micOutline} onClick={() => {
                                    startRecordAudio();
                                    recordAudioFunction(true)
                                }}></IonIcon>
                            </IonCardContent>
                        </IonCard>
                    </IonSlide>
                    <IonSlide class="ion-card-yellow">
                        <IonCard class="ion-card-yellow">
                            <IonCardHeader>
                                <IonCardSubtitle class="ion-card-subtitle-white">Rec 1</IonCardSubtitle>
                            </IonCardHeader>

                            <IonCardContent>
                                <IonIcon size="large" icon={playOutline}
                                         onClick={() => playbackAudioLocal('audio1.wav')}></IonIcon>
                            </IonCardContent>
                        </IonCard>
                    </IonSlide>
                    <IonSlide class="ion-card-yellow">
                        <IonCard class="ion-card-yellow">
                            <IonCardHeader>
                                <IonCardSubtitle class="ion-card-subtitle-white">Rec 2</IonCardSubtitle>
                            </IonCardHeader>

                            <IonCardContent>
                                <IonIcon size="large" icon={playOutline}
                                         onClick={() => playbackAudioLocal('audio1.wav')}></IonIcon>
                            </IonCardContent>
                        </IonCard>
                    </IonSlide>
                </IonSlides>

                {/* -- Files / Browser -- */}
                <IonCard class="ion-card-blue">
                    <IonCardHeader>
                        <IonCardSubtitle class="ion-card-subtitle-white">links</IonCardSubtitle>
                    </IonCardHeader>

                    <IonCardContent>
                        <IonList>
                            <IonItem class="ion-item-blue"
                                     onClick={() => openBrowser('https://www.songfacts.com/lyrics/the-beatles/yesterday')}>
                                Lyrics
                            </IonItem>
                            <IonItem class="ion-item-blue"
                                     onClick={() => openBrowser('https://www.songfacts.com/lyrics/the-beatles/yesterday')}>
                                Additional Infos
                            </IonItem>
                        </IonList>
                    </IonCardContent>
                </IonCard>

                {/* -- Metronom -- */}
                <IonCard>
                    <IonCardContent>
                        <IonList>
                            <IonItem>
                                <IonLabel>100 BPM</IonLabel>
                                <IonIcon slot="end" size="large" icon={playOutline} color="danger"></IonIcon>
                            </IonItem>
                            <IonItem>
                                <IonRange min={10} max={250} step={10} value={120} snaps color="danger">
                                    <IonIcon slot="start" size="medium" color="danger" icon={removeOutline}></IonIcon>
                                    <IonIcon slot="end" color="medium" icon={add}></IonIcon>
                                </IonRange>
                            </IonItem>
                        </IonList>
                    </IonCardContent>
                </IonCard>

                {/* -- Update and Delete Buttons -- */}
                <IonButton expand="block" color="medium"
                           onClick={() => playbackAudio('audio1.wav')}>Playlist</IonButton>
                <IonButton expand="block" color="primary" onClick={() => {
                    updateSong(currentSong)
                }}>Update
                </IonButton>
                <IonButton expand="block" color="danger" onClick={() => {
                    deleteSong(match.params.id)
                }}>Delete
                </IonButton>

                {/* -- Photo Delete Action Sheet*/}
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
                        text: 'Open',
                        icon: document,
                        handler: () => {
                            if (photoToDelete) {
                                openBrowserInternal(photoToDelete.filepath);
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

                {/* --- Audio Recording Action Sheet */}
                <IonActionSheet
                    isOpen={!!recordAudio}
                    buttons={[{
                        text: 'Stop recording',
                        role: 'destructive',
                        icon: stopCircleOutline,
                        handler: () => {
                            if (recordAudio) {
                                recordAudioFunction(false);
                            }
                        }
                    }]}
                />

                {/* --- Popover timer */}
                <IonPopover
                    isOpen={!!recordAudio}
                    onDidDismiss={e => recordAudioFunction(false)}>
                    <IonItem ion-padding>Record time: {recordAudioTime} s</IonItem>
                </IonPopover>

                {/* --- Popover Playing Audio */}
                <IonPopover
                    isOpen={!!isPlaying}
                    onDidDismiss={e => recordAudioFunction(false)}>
                    <IonItem ion-padding>Playing...............
                    <IonIcon icon={musicalNotesOutline}></IonIcon>
                    </IonItem>
                </IonPopover>


            </IonContent>
        </IonPage>
    );
};

export default SongDetail;
