import { Component, OnInit } from "@angular/core";
import { Album } from '../models/album';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { UserService } from "../services/user.service";
import { GLOBAL } from '../services/global';
import { AlbumService } from '../services/album.service';
import { UploadService } from '../services/upload.service';

@Component({
    selector: 'album-edit',
    templateUrl: '../views/album-add.html',
    providers: [UserService, AlbumService, UploadService]
})
export class AlbumEditComponent implements OnInit {
    public titulo: string;
    public album: Album;
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
        private _albumService: AlbumService,
        private _uploadService: UploadService
    ) {
        this.titulo = 'Editar album';
        this.identity = this._userService.getIdentity();
        this.token = this._userService.getToken();
        this.url = GLOBAL.url;
        this.album = new Album('', '', 2018, '', '');
        this.isEdit = true;
    }

    ngOnInit(): void {
        console.log('album-edit.component.ts cargado');
        this.getAlbum();
    }

    getAlbum() {
        this._route.params.forEach((params: Params) => {
            let id = params['id'];
            this._albumService
                .getAlbum(this.token, id)
                .subscribe(
                    response => {
                        if (!response.album) {
                            this._router.navigate(['/']);
                        } else {
                            this.album = response.album;
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

            this._albumService
                .editAlbum(this.token, id, this.album)
                .subscribe(
                    response => {
                        if (!response.album) {
                            this.alertMessage = 'Error en el servidor';
                        } else {
                            this.alertMessage = 'El album se ha modificado correctamente';

                            if (!this.filesToUpload) {
                                this._router.navigate(['/artist', response.album.artist]);
                            } else {
                                let url = `${this.url}upload-image-album/${id}`;
                                this._uploadService.makeFileRequest(url, [], this.filesToUpload, this.token, 'image')
                                .then(
                                    (result: any) => {
                                        this._router.navigate(['/artist', response.album.artist]);
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
        console.log(this.album);
    }

    fileChangeEvent(fileInput: any) {
        this.filesToUpload = <Array<File>>fileInput.target.files;
    }
}