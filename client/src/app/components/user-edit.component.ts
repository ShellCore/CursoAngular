import { Component, OnInit } from "@angular/core";
import { UserService } from '../services/user.service';
import { User } from "../models/user";
import { GLOBAL } from '../services/global';
import { UploadService } from '../services/upload.service';


@Component({
    selector: 'user-edit',
    templateUrl: '../views/user-edit.html',
    providers: [UserService, UploadService]
})

export class UserEditComponent implements OnInit {
    public titulo: string;
    public user: User;
    public identity;
    public token;
    public alertMessage;
    public filesToUpload: Array<File>;
    public url: string;

    constructor(
        private _userService: UserService,
        private _uploadService: UploadService
    ) {
        this.titulo = 'Actualizar Datos';

        // LocalStorage
        this.identity = this._userService.getIdentity();
        this.token = this._userService.getToken();
        this.user = this.identity;
        this.url = GLOBAL.url;
        console.log(this.user);
    }

    ngOnInit() {
        console.log('user-edit.component.js cargado');
    }

    onSubmit() {
        this._userService.updateUser(this.user).subscribe(
            response => {
                if (!response.user) {
                    this.alertMessage = 'El usuario no se ha actualizado'
                } else {
                    // this.user = response.user;
                    localStorage.setItem('identity', JSON.stringify(this.user));
                    document.getElementById("identity_name").innerHTML = this.user.name;

                    if (!this.filesToUpload) {
                        // Redirección
                    } else {
                        let url = `${this.url}upload-image-user/${this.user._id}`;
                        this._uploadService.makeFileRequest(url, [], this.filesToUpload, this.token, 'image')
                            .then(
                                (result: any) => {
                                    this.user.img = result.img;
                                    localStorage.setItem('identity', JSON.stringify(this.user));

                                    let imageUrl = `${this.url}get-image-user/${this.user.img}`;
                                    document.getElementById('imageLogged')
                                        .setAttribute('src', imageUrl);
                                },
                                (error) => {
                                    console.log(error);
                                });


                    }

                    this.alertMessage = 'Datos actualizados correctamente';
                }
            },
            error => {
                var errorMessage = <any>error;
                if (errorMessage != null) {
                    var body = JSON.parse(error.body);
                    this.alertMessage = body.message;

                    console.log(error);
                }
            }
        );
    }

    fileChangeEvent(fileInput: any) {
        this.filesToUpload = <Array<File>>fileInput.target.files;
    }
}