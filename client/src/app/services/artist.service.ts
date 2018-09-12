import { Injectable } from "@angular/core";
import { Http, Headers } from '@angular/http';
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
}