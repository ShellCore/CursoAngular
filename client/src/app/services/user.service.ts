import { Injectable } from "@angular/core";
import { Http, Headers } from "@angular/http";
import { GLOBAL } from "./global";
import {map} from 'rxjs/operators';

@Injectable()
export class UserService {
    public url : string;

    constructor(private _htttp:Http) {
        this.url = GLOBAL.url;
    }

    signup(userToLogin, hash = null) {
        if (hash != null) {
            userToLogin.getHash = hash;
        }
        let json = JSON.stringify(userToLogin);
        let params = json;
        let headers = new Headers({'Content-Type':'application/json'});

        return this._htttp.post(this.url + 'login', params, {headers})
        .pipe(map(res => res.json()));
    }
}