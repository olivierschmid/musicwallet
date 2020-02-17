import {useEffect, useState} from "react";
import {useCamera} from '@ionic/react-hooks/camera';
import {base64FromPath, useFilesystem} from '@ionic/react-hooks/filesystem';
import {useStorage} from '@ionic/react-hooks/storage';
import {CameraPhoto, CameraResultType, CameraSource, FilesystemDirectory} from "@capacitor/core";

const PHOTO_STORAGE = "photos";

export function usePhotoGallery() {
    const {readFile, writeFile, deleteFile} = useFilesystem();
    const {getPhoto} = useCamera();
    const [photos, setPhotos] = useState<Photo[]>([]);
    const {get, set} = useStorage();

    useEffect(() => {
        const loadSaved = async () => {
            const photosString = await get('photos');
            const photos = (photosString ? JSON.parse(photosString) : []) as Photo[];
            for (let photo of photos) {
                const file = await readFile({
                    path: photo.filepath,
                    directory: FilesystemDirectory.Data
                });
                photo.base64 = `data:image/jpeg;base64,${file.data}`;
            }
            setPhotos(photos);
        };
        loadSaved();
    }, [get, readFile]);

    const takePhoto = async () => {
        const cameraPhoto = await getPhoto({
            resultType: CameraResultType.Uri,
            source: CameraSource.Camera,
            quality: 100
        });
        const fileName = new Date().getTime() + '.jpeg';
        const savedFileImage = await savePicture(cameraPhoto, fileName);
        const newPhotos = [savedFileImage, ...photos];
        setPhotos(newPhotos);
        set(PHOTO_STORAGE, JSON.stringify(newPhotos.map(p => {
            // Don't save the base64 representation of the photo data,
            // since it's already saved on the Filesystem
            const photoCopy = {...p};
            delete photoCopy.base64;
            return photoCopy;
        })));
    };

    const savePicture = async (photo: CameraPhoto, fileName: string) => {
        const base64Data = await base64FromPath(photo.webPath!);
        await writeFile({
            path: fileName,
            data: base64Data,
            directory: FilesystemDirectory.Data
        });
        return getPhotoFile(photo, fileName);
    };

    const getPhotoFile = async (cameraPhoto: CameraPhoto, fileName: string): Promise<Photo> => {
        return {
            filepath: fileName,
            webviewPath: cameraPhoto.webPath
        };
    };

    const deletePhoto = async (photo: Photo) => {
        // Remove this photo from the Photos reference data array
        const newPhotos = photos.filter(p => p.filepath !== photo.filepath);

        // Update photos array cache by overwriting the existing photo array
        set(PHOTO_STORAGE, JSON.stringify(newPhotos));

        // delete photo file from filesystem
        const filename = photo.filepath.substr(photo.filepath.lastIndexOf('/') + 1);
        await deleteFile({
            path: filename,
            directory: FilesystemDirectory.Data
        });
        setPhotos(newPhotos);
    };

    return {
        photos,
        takePhoto,
        deletePhoto
    };
}

export interface Photo {
    filepath: string;
    webviewPath?: string;
    base64?: string;
    songId?: string;
}