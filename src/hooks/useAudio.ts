import {FilesystemDirectory, FileWriteResult, Plugins} from "@capacitor/core"
import {useFilesystem} from '@ionic/react-hooks/filesystem';
// not mandatory, only for code completion
import {GenericResponse, RecordingData} from 'capacitor-voice-recorder'
import {isPlatform} from '@ionic/react';


const {VoiceRecorder} = Plugins;


export function useAudio() {
    const {readFile, writeFile, deleteFile} = useFilesystem();

    const canDeviceVoiceRecord = async () => {
        VoiceRecorder.canDeviceVoiceRecord().then((result: GenericResponse) => console.log(result.value))
    };

    const startRecordAudio = async () => {
        if (isPlatform('hybrid')) {
            console.log('platform is hybrid');
            VoiceRecorder.requestAudioRecordingPermission().then((result: GenericResponse) => {
                console.log(result.value);
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
                saveAudio(result.value.recordDataBase64,'audio1.wav');
            })
            .catch((error: any) => console.log(error))
    };

    const saveAudio = async (audio: any, fileName: string) => {
         // const base64Data = await base64FromPath(photo.webPath!);
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

    const loadAudio = async () => {
        const file = await readFile({
            path: 'audio1',
            directory: FilesystemDirectory.Data
        });
        //photo.base64 = `data:image/jpeg;base64,${file.data}`;
        return file.data;
    }

    return {
        canDeviceVoiceRecord, startRecordAudio, stopRecordAudio, loadAudio
    }
};



