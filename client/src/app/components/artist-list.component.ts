import {Router, ActivatedRoute, Params } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { Artist } from '../models/artist';
import { GLOBAL } from '../services/global';

@Component({
    selector: 'artist-list',
    templateUrl : '../views/artist-list.html',
    providers: [UserService]
})

export class ArtistListComponent implements OnInit {
    public titulo : string;
    public artists : Array<Artist>;
    public identity;
    public token;
    public url : string;

    constructor(
        private _route: ActivatedRoute,
        private _router: Router,
        private _userService: UserService
    ) {
        this.titulo = 'Artistas';
        this.identity = this._userService.getIdentity();
        this.token = this._userService.getToken();
        this.url = GLOBAL.url;
    }

    ngOnInit() {
        console.log('artist-list.component.js cargado');
        console.log(this.identity);;
        // Conseguir el listado de artistas
    }

}