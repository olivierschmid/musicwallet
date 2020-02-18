import {useEffect, useState} from "react";
import {useStorage} from '@ionic/react-hooks/storage';

const SONG_STORAGE = "songs";

export function useSongStorage() {
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
    }, [get]);

    const addSong = async (newSong: Song) => {
        newSong.songId = new Date().getTime().toString();
        const newSongs = [newSong, ...songs];
        setSongs(newSongs);
        set(SONG_STORAGE, JSON.stringify(newSongs));
    };

    const deleteSong = async (songId: string | undefined) => {
        // Remove this photo from the Photos reference data array
        const newSongs = songs.filter(p => p.songId !== songId);

        // Update photos array cache by overwriting the existing photo array
        set(SONG_STORAGE, JSON.stringify(newSongs));
        setSongs(newSongs);
    };

    const updateSong = async (songToEdit: Song) => {
        console.log('*** useSong: update song with: ', songToEdit);


        const songList = songs.map((item: any, j) => {
            if (j === songToEdit) {
                return item + 1;
            } else {
                return item;
            }
        });
        set(SONG_STORAGE, JSON.stringify(songList));
        setSongs(songList);


        // deleteSong(songToEdit.songId);
        // addSong(songToEdit);
    }

    return {
        songs,
        deleteSong,
        addSong, updateSong
    };
}

export interface Song {
    songId?: string;
    title?: string;
    description?: string;
}