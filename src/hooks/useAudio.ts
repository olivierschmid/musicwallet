import {FilesystemDirectory, FileWriteResult, Plugins} from "@capacitor/core"
import {AudioPlugin} from 'capacitor-audio';
import {useFilesystem} from '@ionic/react-hooks/filesystem';
import {GenericResponse, RecordingData} from 'capacitor-voice-recorder'
import {isPlatform} from '@ionic/react';
import {useState} from 'react';


const {VoiceRecorder} = Plugins;


export function useAudio() {
    const {readFile, writeFile, getUri} = useFilesystem();
    const [isPlaying, setIsPlaying] = useState<boolean>(false);

    const canDeviceVoiceRecord = async () => {
        VoiceRecorder.canDeviceVoiceRecord().then((result: GenericResponse) => console.log(result.value))
    };

    const startRecordAudio = async () => {
        if (isPlatform('hybrid')) {
            console.log('platform is hybrid');
            VoiceRecorder.requestAudioRecordingPermission().then((result: GenericResponse) => {
                console.log('*** useAudio: Voicerecorder has permission ',result.value);
                VoiceRecorder.startRecording()
                    .then((result: GenericResponse) => console.log(result.value))
                    .catch((error: any) => console.log(error))
            });
        }
    };

    const stopRecordAudio = async () => {
        VoiceRecorder.stopRecording()
            .then((result: RecordingData) => {
                console.log(result.value);
                saveAudio(result.value.recordDataBase64, 'audio1.wav');
            })
            .catch((error: any) => console.log(error))
    };

    const saveAudio = async (audio: any, fileName: string) => {
        await writeFile({
            path: fileName,
            data: audio,
            directory: FilesystemDirectory.Data
        }).then((writeFileResult: FileWriteResult) => {
            console.log('*** File written');
            console.log(writeFileResult);
        }).catch((error) => {
            console.log(error);
        });
    };


    const playbackAudioLocal = async (url: string) => {
        console.log('*** useAudio: playbackAudioLocal with url ', url);
        setIsPlaying(true);
        const audio = await readFile({
            path: url,
            directory: FilesystemDirectory.Data,
        });
        // console.log('*** useAudio: playbackAudioLocal with data ',audio.data);
        const audioRef = new Audio(`data:audio/aac;base64,${audio.data}`);
        audioRef.addEventListener('loadeddata', () => {
            let duration = audioRef.duration;
            console.log('*** useAudio: audio length: ' + duration);
            return duration;
        });
        audioRef.addEventListener('ended', () => {
            console.log('*** useAudio: audio ended');
            setIsPlaying(false);
        });
        audioRef.oncanplaythrough = () => audioRef.play();
        audioRef.load();
    };

    const getAudioDuration = async (url: string) => {
        console.log('*** useAudio: playbackAudioLocal with url ', url);
        const audio = await readFile({
            path: url,
            directory: FilesystemDirectory.Data,
        });
        console.log('*** useAudio: playbackAudioLocal with data ',audio.data);
        const audioRef = new Audio(`data:audio/aac;base64,${audio.data}`);
        audioRef.addEventListener('loadeddata', () => {
            let duration = audioRef.duration;
            console.log('*** useAudio: audio length: ' + duration);
            return duration;
        });
    };

    const playbackAudio = async (url: string) => {
        console.log('*** useAudio: playbackAudio with url ', url);

        const encodedUrl = await getUri({
            path: url,
            directory: FilesystemDirectory.Data,
        });
        console.log('*** useAudio: encoded url is ', encodedUrl.uri);

        AudioPlugin.playList([
                {
                    src: 'https://file-examples.com/wp-content/uploads/2017/11/file_example_WAV_1MG.wav'
                },
                {
                    src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3'
                }
            ]
        );

        AudioPlugin.setPlaying({
            title: 'Song 1',
            artist: 'from me :-)'
        })
    };
    return {
        canDeviceVoiceRecord, startRecordAudio, stopRecordAudio, playbackAudio, playbackAudioLocal, getAudioDuration, isPlaying
    }
};



