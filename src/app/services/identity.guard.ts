import {Injectable} from '@angular/core';
import {Router, CanActivate} from '@angular/router';
import {UserService} from './user.service';

@Injectable() // Servicio que identifica si un usuario esta logeado 
export class IdentityGuard implements CanActivate{
	
	constructor(
		private _router: Router,
		private _userService: UserService
	){

	}

	canActivate(){ // previene que los usaurio entre por url a las paginas no autorizadas
		let identity = this._userService.getIdentity();

		if(identity){
			return true;
		} else {
			this._router.navigate(['/inicio']);
			return false;
		}
	}
}