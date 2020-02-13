import {Browser, Filesystem, FilesystemDirectory, GetUriResult} from '@capacitor/core';

export function useBrowser() {

    const openBrowser = async (urlToOpen: string) => {
        console.log('*** will open browser with url: ' + urlToOpen);
        await Browser.open({url: urlToOpen}).catch((error) => {
            console.log(error);
        });
    }

    const openBrowser2 = async (urlToOpen: string) => {
        console.log('*** will convert url...');

        Filesystem.getUri({
            directory: FilesystemDirectory.Data,
            path: 'audio1.wav'
        }).then((getUriResult: GetUriResult) => {
            console.log(JSON.stringify(getUriResult));

            const path = getUriResult.uri;
            // Browser.open(path, 'application/audio')
            console.log('*** will open file: ' + path);
            // Browser.open({url: path})
        }).then((error) => {
            console.log(error);
        });
    }

    return {openBrowser, openBrowser2}
}

