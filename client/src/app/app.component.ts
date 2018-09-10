import { Component, OnInit } from '@angular/core';
import { User } from './models/user';
import { UserService } from './services/user.service';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	providers: [UserService]
})
export class AppComponent implements OnInit {
	public title = 'Musify';
	public user: User;
	public identity;
	public token;
	public errorMessage;

	constructor(
		private _userService: UserService
	) {
		this.user = new User('', '', '', '', '', 'ROLE_USER', '');
	}

	ngOnInit() {
		this.identity = this._userService.getIdentity();
		this.token = this._userService.getToken();

		console.log(this.identity);
		console.log(this.token);
	}

	public onSubmit() {
		console.log(this.user);

		// Conseguir los datos del usuario identificado
		this._userService.signup(this.user).subscribe(
			response => {
				console.log(response);
				let identity = response.user;
				this.identity = identity;
				if (!this.identity._id) {
					alert('El usuario no está correctamente identificado');
				} else {
					// Crear elemento en el localStorage para tener al usuario sesión
					localStorage.setItem('identity', JSON.stringify(identity));

					// Conseguir el token para enviárselo a cada petición http
					this._userService.signup(this.user, "true").subscribe(
						response => {
							console.log(response);
							let token = response.token;
							this.token = token;
							if (this.token.length < 1) {
								alert('El token no se ha generado correctamente');
							} else {
								// Crear elemento en el localStorage para tener token disponible
								localStorage.setItem('token', token);

								console.log(token);
								console.log(identity);
							}
						},
						error => {
							var errorMessage = <any>error;
							if (errorMessage != null) {
								var body = JSON.parse(error._body);
								this.errorMessage = body.message;
								console.log(error);
							}
						}
					);
				}
			},
			error => {
				var errorMessage = <any>error;
				if (errorMessage != null) {
					var body = JSON.parse(error._body);
					this.errorMessage = body.message;
					console.log(error);
				}
			}
		);
	}
}
