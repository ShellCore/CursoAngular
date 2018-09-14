import { Injectable } from "@angular/core";
import { Http, Headers, RequestOptions } from '@angular/http';
import { GLOBAL } from './global';
import { Album } from '../models/album';
import { map } from 'rxjs/operators';

@Injectable()
export class AlbumService {
    public url: string;

    constructor(private _http: Http) {
        this.url = GLOBAL.url;
    }

    addAlbum(token, album: Album) {
        let params = JSON.stringify(album);
        let headers = new Headers({
            'Content-Type' : "application/json",
            'authorization' : token
        });

        let url = `${this.url}album`;
        return this._http.post(url, params, {headers})
            .pipe(map(res => res.json()));
    }
}