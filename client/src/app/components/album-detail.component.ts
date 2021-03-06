import { Component, OnInit } from '@angular/core';
import { Artist } from '../models/artist';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { UserService } from '../services/user.service';
import { GLOBAL } from '../services/global';
import { AlbumService } from '../services/album.service';
import { Album } from '../models/album';
import { SongService } from '../services/song.service';
import { Song } from '../models/song';

@Component({
    selector : 'album-detail',
    templateUrl : '../views/album-detail.html',
    providers : [UserService, AlbumService, SongService]
})
export class AlbumDetailComponent implements OnInit {
    public titulo;
    public album : Album;
    public songs : Song[];
    public identity;
    public token;
    public url : string;
    public alertMessage;
    public confirmado;

    constructor(
        private _route : ActivatedRoute,
        private _router : Router,
        private _userService : UserService,
        private _albumService : AlbumService,
        private _songService : SongService
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
        this._route.params.forEach((params : Params) => {
            let id = params['id'];

            this._albumService
                .getAlbum(this.token, id)
                .subscribe(
                    response => {
                        if (!response.album) {
                            this._router.navigate(['/']);
                        } else {
                            this.album = response.album;

                            this._songService
                                .getSongs(this.token, response.album._id)
                                .subscribe(
                                    response => {
                                        if (!response.songs) {
                                            this.alertMessage = 'Este album no tiene canciones';
                                        } else {
                                            this.songs = response.songs;
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

    onDeleteConfirm(id) {
        this.confirmado = id;
    }

    onCancelDelete() {
        this.confirmado = null;
    }

    onDeleteSong(id) {
        this._songService
            .deleteSong(this.token, id)
            .subscribe(
                response => {
                    if (!response.song) {
                        alert('Error en el servidor');
                    } else {
                        this.getAlbum();
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
    }

    startPlayer(song) {
        let songPlayer = JSON.stringify(song);
        let filePath = `${this.url}get-file-song/${song.file}`;
        let imagePath = `${this.url}get-image-album/${song.album.img}`;

        localStorage.setItem('playing_song', songPlayer);
        document.getElementById('mp3Source')
            .setAttribute("src", filePath);
        (document.getElementById('player') as any).load();
        (document.getElementById('player') as any).play();

        document.getElementById('playSongTitle').innerHTML = song.name;
        document.getElementById('playSongArtist').innerHTML = song.album.artist.name;
        document.getElementById('playImageAlbum')
            .setAttribute("src", imagePath);
    }
}