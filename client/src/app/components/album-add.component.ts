import { Component, OnInit } from "@angular/core";
import { Album } from '../models/album';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { UserService } from "../services/user.service";
import { ArtistService } from "../services/artist.service";
import { GLOBAL } from '../services/global';

@Component({
    selector : 'album-add',
    templateUrl : '../views/album-add.html',
    providers : [UserService, ArtistService]
})
export class AlbumAddComponent implements OnInit {
    public titulo : string;
    public album : Album;
    public identity;
    public token;
    public url : string;
    public alerMessage;

    constructor(
        private _route : ActivatedRoute,
        private _router : Router,
        private _userService : UserService,
        private _artistService : ArtistService
    ) {
        this.titulo = 'Crear nuevo album';
        this.identity = this._userService.getIdentity();
        this.token = this._userService.getToken();
        this.url = GLOBAL.url;
        this.album = new Album('', '', 2018, '', '');
    }
    
    ngOnInit(): void {
        console.log('album-add.component.ts cargado');
    }

    onSubmit() {
        this._route.params.forEach((params : Params) => {
            let artistId = params['artist'];
            this.album.artist = artistId;
        });
        console.log(this.album);
    }
}