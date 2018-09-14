import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router, Params } from '@angular/router';
import { UserService } from "../services/user.service";
import { GLOBAL } from '../services/global';
import { UploadService } from '../services/upload.service';
import { Song } from '../models/song';
import { SongService } from "../services/song.service";

@Component({
    selector: 'song-edit',
    templateUrl: '../views/song-add.html',
    providers: [UserService, SongService, UploadService]
})
export class SongEditComponent implements OnInit {
    public titulo: string;
    public song: Song;
    public identity;
    public token;
    public url: string;
    public alertMessage;
    public isEdit;
    public filesToUpload: Array<File>;

    constructor(
        private _route: ActivatedRoute,
        private _router: Router,
        private _userService: UserService,
        private _songService: SongService,
        private _uploadService: UploadService
    ) {
        this.titulo = 'Editar canción';
        this.identity = this._userService.getIdentity();
        this.token = this._userService.getToken();
        this.url = GLOBAL.url;
        this.song = new Song(0, '', '', '', '');
        this.isEdit = true;
    }

    ngOnInit(): void {
        console.log('song-edit.component.ts cargado');
        this.getSong();
    }

    getSong() {
        this._route.params.forEach((params: Params) => {
            let id = params['id'];
            this._songService
                .getSong(this.token, id)
                .subscribe(
                    response => {
                        if (!response.song) {
                            this._router.navigate(['/']);
                        } else {
                            this.song = response.song;
                        }
                    },
                    error => {
                        var errorMessage = <any>error;
                        if (errorMessage != null) {
                            var body = JSON.parse(error._body);
                            console.log(error);
                        }
                    }
                );

        });
    }

    onSubmit() {
        this._route.params.forEach((params: Params) => {
            let id = params['id'];

            this._songService
                .editSong(this.token, id, this.song)
                .subscribe(
                    response => {
                        if (!response.song) {
                            this.alertMessage = 'Error en el servidor';
                        } else {
                            this.alertMessage = 'La canción se ha modificado correctamente';

                            if (!this.filesToUpload) {
                                this._router.navigate(['/album', response.song.album]);
                            } else {
                                console.log(this.filesToUpload);
                                let url = `${this.url}upload-file-song/${id}`;
                                this._uploadService.makeFileRequest(url, [], this.filesToUpload, this.token, 'file')
                                .then(
                                    (result: any) => {
                                        this._router.navigate(['/album', response.song.album]);
                                    },
                                    (error) => {
                                        console.log(error);
                                    }
                                );
                            }
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

    fileChangeEvent(fileInput: any) {
        this.filesToUpload = <Array<File>>fileInput.target.files;
    }
}