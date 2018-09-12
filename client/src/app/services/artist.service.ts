import { Injectable } from "@angular/core";
import { Http, Headers, RequestOptions } from '@angular/http';
import { GLOBAL } from './global';
import { Artist } from '../models/artist';
import { map } from 'rxjs/operators';

@Injectable()
export class ArtistService {
    public url: string;

    constructor(private _http: Http) {
        this.url = GLOBAL.url;
    }

    addArtist(token, artist: Artist) {
        let params = JSON.stringify(artist);
        let headers = new Headers({
            'Content-Type' : "application/json",
            'authorization' : token
        });

        let url = `${this.url}artist`;
        return this._http.post(url, params, {headers})
            .pipe(map(res => res.json()));
    }

    getArtists(token, page) {
        let headers = new Headers({
            'Content-Type' : 'application/json',
            'authorization' : token
        });
        let options = new RequestOptions({headers});

        let url = `${this.url}artists/${page}`
        return this._http
            .get(url, options)
            .pipe(map(res => res.json));
    }

    getArtist(token, id : string) {
        let headers = new Headers({
            'Content-Type' : 'application/json',
            'authorization' : token
        });
        let options = new RequestOptions({headers});

        let url = `${this.url}artist/${id}`
        return this._http
            .get(url, options)
            .pipe(map(res => res.json));
    }

    editArtist(token, id : string, artist: Artist) {
        let params = JSON.stringify(artist);
        let headers = new Headers({
            'Content-Type' : "application/json",
            'authorization' : token
        });

        let url = `${this.url}artist/${id}`;
        return this._http.put(url, params, {headers})
            .pipe(map(res => res.json()));
    }

    deleteArtist(token, id : string) {
        let headers = new Headers({
            'Content-Type' : 'application/json',
            'authorization' : token
        });
        let options = new RequestOptions({headers});

        let url = `${this.url}artist/${id}`
        return this._http
            .delete(url, options)
            .pipe(map(res => res.json));
    }
}