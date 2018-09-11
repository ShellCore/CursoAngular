import { Component, OnInit } from "@angular/core";
import { UserService } from '../services/user.service';
import { User } from "../models/user";
import { GLOBAL } from '../services/global';


@Component({
    selector: 'user-edit',
    templateUrl : '../views/user-edit.html',
    providers : [UserService]
})

export class UserEditComponent implements OnInit {
    public titulo : string;
    public user : User;
    public identity;
    public token;
    public alertMessage;
    public filesToUpload: Array<File>;
    public url : string;

    constructor(private _userService : UserService) {
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
                        this.makeFileRequest(url, [], this.filesToUpload)
                            .then((result : any) => {
                                this.user.img = result.img;
                                localStorage.setItem('identity', JSON.stringify(this.user));
                                
                                let imageUrl = `${this.url}get-image-user/${this.user.img}`;
                                document.getElementById('imageLogged')
                                    .setAttribute('src', imageUrl);
                            });
                    }

                    this.alertMessage = 'Datos actualizados correctamente';
                }
            },
            error => {
                var errorMessage = <any> error;
                if (errorMessage != null) {
                    var body = JSON.parse(error.body);
                    this.alertMessage = body.message;

                    console.log(error);
                }
            }
        );
    }

    fileChangeEvent(fileInput : any) {
        this.filesToUpload = <Array<File>> fileInput.target.files;
        console.log(this.filesToUpload);
    }

    makeFileRequest(url : string, params : Array<string>, files : Array<File>) {
        let token = this.token;
        return new Promise((resolve, reject) => {
            let formData : any = new FormData();
            let xhr = new XMLHttpRequest();

            for (let i = 0; i < files.length; i++) {
                formData.append('image', files[i], files[i].name);
            }

            xhr.onreadystatechange = () => {
                if (xhr.readyState == 4) {
                    if (xhr.status == 200) {
                        resolve(JSON.parse(xhr.response));
                    } else {
                        reject(xhr.response);
                    }
                }
            }

            xhr.open('POST', url, true);
            xhr.setRequestHeader('authorization', token);
            xhr.send(formData);
        });
    }
}