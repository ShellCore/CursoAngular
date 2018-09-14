import { Component, OnInit } from '@angular/core';
import { Artist } from '../models/artist';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { UserService } from '../services/user.service';
import { GLOBAL } from '../services/global';
import { AlbumService } from '../services/album.service';
import { Album } from '../models/album';

@Component({
    selector : 'album-detail',
    templateUrl : '../views/album-detail.html',
    providers : [UserService, AlbumService]
})
export class AlbumDetailComponent implements OnInit {
    public titulo;
    public albums : Album;
    public identity;
    public token;
    public url : string;
    public alertMessage;
    public confirmado;

    constructor(
        private _route : ActivatedRoute,
        private _router : Router,
        private _userService : UserService,
        private _albumService : AlbumService
    ) {
        this.identity = _userService.getIdentity();
        this.token = _userService.getToken();
        this.url = GLOBAL.url;
        this.titulo = 'Detalle de album';
    }


    ngOnInit(): void {
        console.log('album-detail.component.ts cargado');
        this.getAlbum();
    }

    getAlbum() {
        console.log('El método funciona');
        // this._route.params.forEach((params : Params) => {
        //     let id = params['id'];

        //     this._artistService
        //         .getArtist(this.token, id)
        //         .subscribe(
        //             response => {
        //                 if (!response.artist) {
        //                     this._router.navigate(['/']);
        //                 } else {
        //                     this.artist = response.artist;

        //                     this._albumService
        //                         .getAlbums(this.token, response.artist._id)
        //                         .subscribe(
        //                             response => {
        //                                 if (!response.albums) {
        //                                     this.alertMessage = 'Este artista no tiene albums';
        //                                 } else {
        //                                     this.albums = response.albums;
        //                                 }
        //                             },
        //                             error => {
        //                                 var errorMessage = <any> error;
        //                                 if (errorMessage != null) {
        //                                     var body = JSON.parse(error.body);
        //                                     console.log(error);
        //                                 }
        //                             }
        //                         );
        //                 }
        //             },
        //             error => {
        //                 var errorMessage = <any> error;
        //                 if (errorMessage != null) {
        //                     var body = JSON.parse(error.body);
        //                     console.log(error);
        //                 }
        //             }
        //         );
        // });
    }

    // onDeleteConfirm(id) {
    //     this.confirmado = id;
    // }

    // onCancelDelete() {
    //     this.confirmado = null;
    // }

    // onDeleteAlbum(id) {
    //     this._albumService
    //         .deleteAlbum(this.token, id)
    //         .subscribe(
    //             response => {
    //                 if (!response.album) {
    //                     alert('Error en el servidor');
    //                 } else {
    //                     this.getArtist();
    //                 }
    //             },
    //             error => {
    //                 var errorMessage = <any> error;
    //                 if (errorMessage != null) {
    //                     var body = JSON.parse(error.body);
    //                     console.log(error);
    //                 }
    //             }
    //         );
    // }
}