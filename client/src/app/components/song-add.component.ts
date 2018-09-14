import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router, Params } from '@angular/router';
import { UserService } from "../services/user.service";
import { GLOBAL } from '../services/global';
import { SongService } from '../services/song.service';
import { Song } from '../models/song';

@Component({
    selector: 'song-add',
    templateUrl: '../views/song-add.html',
    providers: [UserService, SongService]
})
export class SongAddComponent implements OnInit {
    public titulo: string;
    public song: Song;
    public identity;
    public token;
    public url: string;
    public alertMessage;

    constructor(
        private _route: ActivatedRoute,
        private _router: Router,
        private _userService: UserService,
        private _songService: SongService
    ) {
        this.titulo = 'Crear nueva canción';
        this.identity = this._userService.getIdentity();
        this.token = this._userService.getToken();
        this.url = GLOBAL.url;
        this.song = new Song(0, '', '', '', '');
    }

    ngOnInit(): void {
        console.log('album-add.component.ts cargado');
    }

    onSubmit() {
        this._route.params.forEach((params: Params) => {
            let albumId = params['album'];
            this.song.album = albumId;

            this._songService
                .addSong(this.token, this.song)
                .subscribe(
                    response => {
                        if (!response.song) {
                            this.alertMessage = 'Error en el servidor';
                        } else {
                            this.song = response.song;
                            this.alertMessage = 'La canción se ha creado correctamente';
                            this._router.navigate(['/update-song', response.song._id]);
                        }
                    },
                    error => {
                        var errorMessage = <any>error;
                        if (errorMessage != null) {
                            var body = JSON.parse(error._body);
                            this.alertMessage = body.message;
                            console.log(error);
                        }
                    }
                );
        });
        console.log(this.song);
    }
}