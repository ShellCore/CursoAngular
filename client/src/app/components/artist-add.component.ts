import { Component, OnInit } from '@angular/core';
import { UserService } from "../services/user.service";
import { ActivatedRoute, Router } from '@angular/router';
import { GLOBAL } from '../services/global';
import { Artist } from '../models/artist';
import { ArtistService } from '../services/artist.service';

@Component({
    selector : 'artist-add',
    templateUrl : '../views/artist-add.html',
    providers : [UserService, ArtistService]
})
export class ArtistAddComponent implements OnInit {
    public titulo : string;
    public artist : Artist;
    public identity;
    public token;
    public url : string;

    constructor(
        private _route : ActivatedRoute,
        private _router : Router,
        private _userService : UserService,
        private _artistService : ArtistService
    ) {
        this.titulo = 'Crear nuevo artista';
        this.identity = this._userService.getIdentity();
        this.token = this._userService.getToken();
        this.url = GLOBAL.url;
        this.artist = new Artist('', '', '');
    }

    ngOnInit(): void {
        console.log('artist-add.component.ts cargado');
    }

    onSubmit() {
        console.log(this.artist);
    }
}