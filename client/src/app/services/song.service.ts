import { Injectable } from "@angular/core";
import { Http, Headers, RequestOptions } from '@angular/http';
import { GLOBAL } from './global';
import { map } from 'rxjs/operators';
import { Song } from '../models/song';

@Injectable()
export class SongService {
    public url: string;

    constructor(private _http: Http) {
        this.url = GLOBAL.url;
    }

    getSongs(token, albumId = null) {
        let headers = new Headers({
            'Content-Type' : 'application/json',
            'authorization' : token
        });
        let options = new RequestOptions({headers});
        let url = `${this.url}songs`;

        if (albumId != null) {
            url = `${url}/${albumId}`;
        }
        
        return this._http.get(url, options)
            .pipe(map(res => res.json()));
    }

    getSong(token, id : string) {
        let headers = new Headers({
            'Content-Type' : 'application/json',
            'authorization' : token
        });

        let options = new RequestOptions({headers});
        let url = `${this.url}song/${id}`;
        return this._http.get(url, options)
            .pipe(map(res => res.json()));
    }

    addSong(token, song: Song) {
        let params = JSON.stringify(song);
        let headers = new Headers({
            'Content-Type' : "application/json",
            'authorization' : token
        });

        let url = `${this.url}song`;
        return this._http.post(url, params, {headers})
            .pipe(map(res => res.json()));
    }

    editSong(token, id : string, song: Song) {
        let params = JSON.stringify(song);
        let headers = new Headers({
            'Content-Type' : "application/json",
            'authorization' : token
        });

        let url = `${this.url}song/${id}`;
        return this._http.put(url, params, {headers})
            .pipe(map(res => res.json()));
    }

    deleteSong(token, id : string) {
        let headers = new Headers({
            'Content-Type' : 'application/json',
            'authorization' : token
        });

        let options = new RequestOptions({headers});
        let url = `${this.url}song/${id}`;
        return this._http.delete(url, options)
            .pipe(map(res => res.json()));
    }
}