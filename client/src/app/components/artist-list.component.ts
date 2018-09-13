import {Router, ActivatedRoute, Params } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { Artist } from '../models/artist';
import { GLOBAL } from '../services/global';
import { ArtistService } from '../services/artist.service';

@Component({
    selector: 'artist-list',
    templateUrl : '../views/artist-list.html',
    providers: [UserService, ArtistService]
})

export class ArtistListComponent implements OnInit {
    public titulo : string;
    public artists : Array<Artist>;
    public identity;
    public token;
    public url : string;
    public nextPage;
    public prevPage;
    public confirmado;

    constructor(
        private _route: ActivatedRoute,
        private _router: Router,
        private _userService: UserService,
        private _artistService: ArtistService
    ) {
        this.titulo = 'Artistas';
        this.identity = this._userService.getIdentity();
        this.token = this._userService.getToken();
        this.url = GLOBAL.url;
        this.nextPage = 1;
        this.prevPage = 1;
    }

    ngOnInit() {
        console.log('artist-list.component.js cargado');
        this.getArtists();
    }

    onDeleteConfirm(id) {
        this.confirmado = id;
        console.log(this.confirmado);
    }

    onCancelDelete() {
        this.confirmado = null;
    }

    onDeleteArtist(id) {
        this._artistService
            .deleteArtist(this.token, id)
            .subscribe(
                response => {
                    if (!response.artist) {
                        alert('Error en el servidor');
                    }
                    this.getArtists();
                },
                error => {
                    var errorMessage = <any> error;
                    if (errorMessage != null) {
                        var body = JSON.parse(error._body);
                        console.log(error);
                    }
                }
            );
    }

    getArtists() {
        this._route.params.forEach((params: Params) => {
            let page = +params['page'];
            if (!page) {
                page = 1;
            }
            this.nextPage = page + 1;
            if (page > 1) {
                this.prevPage = page - 1;
            }

            this._artistService
                .getArtists(this.token, page)
                .subscribe(
                    response => {
                        if (!response.artists) {
                            this._router.navigate(['/']);
                        } else {
                            this.artists = response.artists;
                            console.log(response.artists);
                        }
                    },
                    error => {
                        var errorMessage = <any> error;
                        if (errorMessage != null) {
                            var body = JSON.parse(error._body);
                            console.log(error);
                        }
                    }
                );
            
        });
    }
}