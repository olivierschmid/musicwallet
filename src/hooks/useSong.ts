import {useEffect, useState} from "react";
import {useFilesystem} from '@ionic/react-hooks/filesystem';
import {useStorage} from '@ionic/react-hooks/storage';

const SONG_STORAGE = "songs";

export function useSongStorage() {
    const {readFile} = useFilesystem();
    // const {getPhoto} = useCamera();
    const [songs, setSongs] = useState<Song[]>([]);
    const {get, set} = useStorage();

    useEffect(() => {
        const loadSavedSongs = async () => {
            console.log('*** hook fired');
            const songsString = await get('songs');
            const songs = (songsString ? JSON.parse(songsString) : []) as Song[];
            setSongs(songs);
        };
        loadSavedSongs();
    }, [get, set]);

 /*   const saveSong = async (editedSong: Song) => {
        const newSongs = [editedSong, ...songs];
        setSongs(newSongs);
        set(SONG_STORAGE, JSON.stringify(newSongs.map(p => {
            // Don't save the base64 representation of the photo data,
            // since it's already saved on the Filesystem
            //const photoCopy = {...p};
            //delete photoCopy.base64;
            //return photoCopy;
        })));
    }; */

    const addSong = async (newSong: Song) => {
        newSong.songId = new Date().getTime().toString();
        const newSongs = [newSong, ...songs];
        setSongs(newSongs);
        set(SONG_STORAGE, JSON.stringify(newSongs));
    };

    const deleteSong = async (songId: string) => {
        // Remove this photo from the Photos reference data array
        const newSongs = songs.filter(p => p.songId !== songId);

        // Update photos array cache by overwriting the existing photo array
        set(SONG_STORAGE, JSON.stringify(newSongs));
        setSongs(newSongs);
    };

    return {
        songs,
        deleteSong,
        addSong
    };
}

export interface Song {
    songId?: string;
    title?: string;
    description?: string;
}