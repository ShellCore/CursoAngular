import { Component, OnInit } from '@angular/core';
import { Artist } from '../models/artist';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { UserService } from '../services/user.service';
import { ArtistService } from '../services/artist.service';
import { GLOBAL } from '../services/global';

@Component({
    selector : 'artist-detail',
    templateUrl : '../views/artist-detail.html',
    providers : [UserService, ArtistService]
})
export class ArtistDetailComponent implements OnInit {
    public artist : Artist;
    public identity;
    public token;
    public url : string;
    public alertMessage;

    constructor(
        private _route : ActivatedRoute,
        private _router : Router,
        private _userService : UserService,
        private _artistService : ArtistService
    ) {
        this.identity = _userService.getIdentity();
        this.token = _userService.getToken();
        this.url = GLOBAL.url;
    }


    ngOnInit(): void {
        console.log('artist-detail.component.ts cargado');
        this.getArtist();
    }

    getArtist() {
        this._route.params.forEach((params : Params) => {
            let id = params['id'];

            this._artistService
                .getArtist(this.token, id)
                .subscribe(
                    response => {
                        if (!response.artist) {
                            this._router.navigate(['/']);
                        } else {
                            this.artist = response.artist;
                        }
                    },
                    error => {
                        var errorMessage = <any> error;
                        if (errorMessage != null) {
                            var body = JSON.parse(error.body);
                            console.log(error);
                        }
                    }
                );
        });
    }



}