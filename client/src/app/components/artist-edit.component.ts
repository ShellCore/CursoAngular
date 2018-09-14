import { Component, OnInit } from "@angular/core";
import { UserService } from '../services/user.service';
import { ArtistService } from '../services/artist.service';
import { Artist } from '../models/artist';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { GLOBAL } from "../services/global";
import { UploadService } from "../services/upload.service";

@Component({
    selector: 'artist-edit',
    templateUrl: '../views/artist-add.html',
    providers: [UserService, ArtistService, UploadService]
})
export class ArtistEditComponent implements OnInit {

    public titulo: string;
    public artist: Artist;
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
        private _artistService: ArtistService,
        private _uploadService: UploadService
    ) {
        this.titulo = 'Editar artista';
        this.identity = this._userService.getIdentity();
        this.token = this._userService.getToken();
        this.url = GLOBAL.url;
        this.artist = new Artist('', '', '');
        this.isEdit = true;
    }

    ngOnInit(): void {
        console.log('artist-edit.component.ts creado');
        this.getArtist();
    }

    onSubmit() {
        console.log(this.artist);
        this._route.params.forEach((params: Params) => {
            let id = params['id'];

            this._artistService
                .editArtist(this.token, id, this.artist)
                .subscribe(
                    response => {
                        if (!response.artist) {
                            this.alertMessage = 'Error en el servidor';
                        } else {
                            this.alertMessage = 'El artista se ha actualizado correctamente';
                            let url = `${this.url}upload-image-artist/${id}`;
                            this._uploadService.makeFileRequest(url, [], this.filesToUpload, this.token, 'image')
                                .then(
                                    (result: any) => {
                                        this._router.navigate(['/artists', 1]);
                                    },
                                    (error) => {
                                        console.log(error);
                                    }
                                );
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
    }

    getArtist() {
        this._route.params.forEach((params: Params) => {
            let id = params['id'];
            this._artistService.getArtist(this.token, id).subscribe(
                response => {
                    if (!response.artist) {
                        this._router.navigate(['/']);
                    } else {
                        this.artist = response.artist;
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

    fileChangeEvent(fileInput: any) {
        this.filesToUpload = <Array<File>>fileInput.target.files;
    }
}