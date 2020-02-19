import {Browser, FilesystemDirectory} from '@capacitor/core';
import {useFilesystem} from '@ionic/react-hooks/filesystem';

export function useBrowser() {
    const {getUri, readFile} = useFilesystem();

    const openBrowser = async (urlToOpen: string) => {
        console.log('*** will open browser with url: ' + urlToOpen);
        await Browser.open({url: urlToOpen}).catch((error) => {
            console.log(error);
        });
    }

    const openBrowser2 = async (urlToOpen: string) => {
        console.log('*** useBrowser: will convert url...');

        await getUri({
            path: urlToOpen,
            directory: FilesystemDirectory.Documents,
        }).then((res) => {
            console.log('*** useBrowser: getUri '+res.uri);

            openBrowser(res.uri).then((res) => {
                console.log('*** useBrowser: openBrowser '+res);
            }).catch((error) => {
                console.log('*** useBrowser: Error opening browser ', error);
            }).catch((error) => {
                console.log('*** useBrowser: error converting URL');
            });
        });
    }

    const getEncodedUri = async (urlToEncode: string) => {
        console.log('*** useBrowser: getUri with url ',urlToEncode);

        await getUri({
            path: urlToEncode,
            directory: FilesystemDirectory.Documents,
        }).then((res) => {
            console.log('*** useBrowser: encoded uri  '+res.uri);

            return res.uri;
        }).catch((error) => {
            console.log('*** useBrowser Error encoding url ', error);
        });
    }

    return {openBrowser, openBrowser2, getEncodedUri}
}

