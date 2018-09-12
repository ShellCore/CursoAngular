import { Component, OnInit } from "@angular/core";
import { UserService } from '../services/user.service';
import { ArtistService } from '../services/artist.service';
import { Artist } from '../models/artist';
import { ActivatedRoute, Router } from '@angular/router';
import { GLOBAL } from "../services/global";

@Component({
    selector : 'artist-edit',
    templateUrl : '../views/artist-add.html',
    providers : [UserService, ArtistService]
})
export class ArtistEditComponent implements OnInit {
    
    public titulo : string;
    public artist : Artist;
    public identity;
    public token;
    public url : string;
    public alertMessage;
    public isEdit;

    constructor(
        private _route : ActivatedRoute,
        private _router : Router,
        private _userService : UserService,
        private _artistService : ArtistService
    ) {
        this.titulo = 'Actualizar artista';
        this.identity = this._userService.getIdentity();
        this.token = this._userService.getToken();
        this.url = GLOBAL.url;
        this.artist = new Artist('', '', '');
        this.isEdit = true;
    }

    ngOnInit(): void {
        console.log('artist-edit.component.ts creado');
    }

    onSubmit() {
        
    }
}