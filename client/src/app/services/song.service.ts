import { Injectable } from "@angular/core";
import { Http, Headers, RequestOptions } from '@angular/http';
import { GLOBAL } from './global';
import { Album } from '../models/album';
import { map } from 'rxjs/operators';

@Injectable()
export class SongService {
    // public url: string;

    // constructor(private _http: Http) {
    //     this.url = GLOBAL.url;
    // }

    // getSongs(token, albumId = null) {
    //     let headers = new Headers({
    //         'Content-Type' : 'application/json',
    //         'authorization' : token
    //     });
    //     let options = new RequestOptions({headers});
    //     let url = `${this.url}albums`;

    //     if (albumId != null) {
    //         url = `${url}/${albumId}`;
    //     }
        
    //     return this._http.get(url, options)
    //         .pipe(map(res => res.json()));
    // }

    // getSong(token, id : string) {
    //     let headers = new Headers({
    //         'Content-Type' : 'application/json',
    //         'authorization' : token
    //     });

    //     let options = new RequestOptions({headers});
    //     let url = `${this.url}album/${id}`;
    //     return this._http.get(url, options)
    //         .pipe(map(res => res.json()));
    // }

    // addAlbum(token, album: Album) {
    //     let params = JSON.stringify(album);
    //     let headers = new Headers({
    //         'Content-Type' : "application/json",
    //         'authorization' : token
    //     });

    //     let url = `${this.url}album`;
    //     return this._http.post(url, params, {headers})
    //         .pipe(map(res => res.json()));
    // }

    // editAlbum(token, id : string, album: Album) {
    //     let params = JSON.stringify(album);
    //     let headers = new Headers({
    //         'Content-Type' : "application/json",
    //         'authorization' : token
    //     });

    //     let url = `${this.url}album/${id}`;
    //     return this._http.put(url, params, {headers})
    //         .pipe(map(res => res.json()));
    // }

    // deleteAlbum(token, id : string) {
    //     let headers = new Headers({
    //         'Content-Type' : 'application/json',
    //         'authorization' : token
    //     });

    //     let options = new RequestOptions({headers});
    //     let url = `${this.url}album/${id}`;
    //     return this._http.delete(url, options)
    //         .pipe(map(res => res.json()));
    // }
}