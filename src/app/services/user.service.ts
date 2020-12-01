import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {User} from '../modelo/user';
import {global} from './global';

@Injectable() // Servicios de la clases usuario (manda las peticiones http a la api)
export class UserService {
	public url: string;
	public identity;
	public token;

	constructor (
		public _http: HttpClient
	){
		this.url = global.url;
	}


	register(user): Observable<any>{ // Registra un nuevo usuario
		let json = JSON.stringify(user);
		let params = 'json='+json;
		let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');

		return this._http.post(this.url+'usuario/registro', params, {headers: headers });
	}

	signup(user, gettoken = null): Observable<any>{ // Funcion para verificar y logear al usuario
		if (gettoken != null){
			user.gettoken  = 'true';
		}

		let json = JSON.stringify(user);
		let params = 'json='+json;
		let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');

		return this._http.post(this.url+'usuario/login', params, {headers: headers });
	}

	update(token, user): Observable<any>{ // Funcion para actualizar los datos de un usuario
		let json = JSON.stringify(user);
		let params = "json="+json;
		let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
										.set('Authorization', token);

		return this._http.put(this.url+'usuario/update', params, {headers: headers });
	}

	getIdentity(){ // Obtener los datos del usuario y guardarlos
		let identity = JSON.parse(localStorage.getItem('identity'));
		if (identity && identity != "undefined"){
			this.identity = identity;

		}else {
			this.identity = null;
		}
		return identity;
	}

	getToken(){ // Obtener el token de autentificacion para las conexiones con la api (Jwt)
		let token = localStorage.getItem('token');

		if (token && token != "undefined"){
			this.token = token;
		} else {
			this.token = null;
		}
		return token;
	}

	getPostId(id): Observable<any>{ //Obtener los post del usuario
		let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
		return this._http.get(this.url+ 'post/getPostsByUser/'+id, {headers : headers});
	}

	getUser(id): Observable<any>{ // Obtener el usuario segun su id
		let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
		return this._http.get(this.url+ 'usuario/detail/'+id, {headers : headers});
	}
}