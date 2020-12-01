import { Component, OnInit } from '@angular/core';
import {User} from '../../modelo/user';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {UserService} from '../../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers : [UserService]
})
export class LoginComponent implements OnInit {
	public user : User;
	public status: string;
	public token;
	public identity;

  constructor(
  	private _userService: UserService,
  	private _router: Router,
  	private _route: ActivatedRoute
  ) { 
  	this.user = new User(1,'','','ROLE_USER','','','','');
  }

  ngOnInit() {
  	// Se ejecuta siempre y cierra session cuando le llega el parametro sure por la url
  	this.logout();
  }

  onSubmit(form){
  	this._userService.signup(this.user).subscribe(
  		response => {
  			// Token identificador
  			if (response.status != 'error'){
  				this.status = 'success';
  				this.token = response;
  				// Objeto usuario identificado
  				this._userService.signup(this.user, true).subscribe(
  					response => {
  						this.identity = response;
  						
  						localStorage.setItem('token',this.token);
  						localStorage.setItem('identity', JSON.stringify(this.identity));
  						// Redireccion de inicio
  						this._router.navigate(['inicio']);
  						}
  				)
  			}else{
  				this.status = 'error';
  			}
  		},
  		error => {
  			this.status = 'error';
  			console.log(<any>error)
  		}
  	)
  }

  logout(){ // deslogea el usuario y lo redirecciona a la pagina de inicio
  	this._route.params.subscribe(params => {
  		let logout = +params['sure'];

  		if(logout == 1){
  			localStorage.removeItem('identity'); // elimina el token y usuario en el storage del navegador
  			localStorage.removeItem('token');
  			this.identity = null;
  			this.token = null;

  			// Redireccion de inicio
  			this._router.navigate(['inicio']);
  		}
  	});
  }
}
