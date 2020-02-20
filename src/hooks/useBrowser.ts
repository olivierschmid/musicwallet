import {Browser, FilesystemDirectory} from '@capacitor/core';
import {useFilesystem} from '@ionic/react-hooks/filesystem';

export function useBrowser() {
    const {getUri} = useFilesystem();

    const openBrowser = async (urlToOpen: string) => {
        console.log('*** will open browser with url: ' + urlToOpen);
        const browser = await Browser.open({url: urlToOpen}).catch((error) => {
            console.log('*** useBrowser open error ',error);
        });
        console.log('*** useBrowser: opened browser ', browser);
    };

    const openBrowserInternal = async (urlToOpen: string) => {
        console.log('*** useBrowser: will convert url ',urlToOpen);

        const encodedUrl = await getUri({
            path: urlToOpen,
            directory: FilesystemDirectory.Data,
        });
        console.log('*** useBrowser: encoded url is ', encodedUrl.uri);

            openBrowser(encodedUrl.uri).then((res) => {
                console.log('*** useBrowser: openBrowser '+res);
            }).catch((error) => {
                console.log('*** useBrowser: Error opening browser ', error);
            });
    };

    return {openBrowser, openBrowserInternal}
}

