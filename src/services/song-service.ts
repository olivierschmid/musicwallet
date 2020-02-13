import { persist } from "mobx-persist";
import { observable, computed, action } from "mobx";

export interface Song {
    title: string
    details: string,
    date: Date,
    id: number,
};

export class SongService {
    @persist('list')
    @observable
    list: Song[] = [];

    @computed get entries(): Song[] {
        const sortFunc = (firstItem: Song, secondItem: Song): number => {
            if (firstItem.id > secondItem.id)
                return 1;

            if (firstItem.id < secondItem.id)
                return -1;

            return 0;
        };

        return this.list.slice().sort(sortFunc);
    };

    @action
    save(title: string, details: string, date: Date) {
        this.list.push({title, details, date, id: Date.now()});
    };

    @action
    remove(songId: number) {
        const songIndex = this.list.findIndex(({ id }) => songId === id);
        this.list.splice(songIndex, 1);
    };
};