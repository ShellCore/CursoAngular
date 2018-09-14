import { Component, OnInit } from "@angular/core";
import { Album } from '../models/album';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { UserService } from "../services/user.service";
import { ArtistService } from "../services/artist.service";
import { GLOBAL } from '../services/global';
import { AlbumService } from '../services/album.service';

@Component({
    selector: 'album-add',
    templateUrl: '../views/album-add.html',
    providers: [UserService, ArtistService, AlbumService]
})
export class AlbumAddComponent implements OnInit {
    public titulo: string;
    public album: Album;
    public identity;
    public token;
    public url: string;
    public alertMessage;

    constructor(
        private _route: ActivatedRoute,
        private _router: Router,
        private _userService: UserService,
        private _artistService: ArtistService,
        private _albumService: AlbumService
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
        this._route.params.forEach((params: Params) => {
            let artistId = params['artist'];
            this.album.artist = artistId;

            this._albumService
                .addAlbum(this.token, this.album)
                .subscribe(
                    response => {
                        if (!response.album) {
                            this.alertMessage = 'Error en el servidor';
                        } else {
                            this.album = response.album;
                            this.alertMessage = 'El album se ha creado correctamente';
                            this._router.navigate(['/update-album', response.album._id]);
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
}