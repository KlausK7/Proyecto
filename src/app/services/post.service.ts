import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {Post } from '../modelo/post';
import {global} from './global';

@Injectable() //Servicio para buscar los post por http (manda las peticiones http a la api)
export class PostService {
	public url: string;

	constructor (
		private _http: HttpClient
	){
		this.url = global.url;
	}

	create(token, post): Observable<any>{ // Crea un nuevo post
		let json = JSON.stringify(post);
		let params = "json="+json;

		let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
										.set('Authorization', token);								
		return this._http.post(this.url + 'post', params, {headers: headers});

	}

	getPosts(): Observable<any>{ // Busca todo los post
		let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
		return this._http.get(this.url+ 'post', {headers : headers});
	}
	getPostId(id): Observable<any>{ // Busca un post especifico por su id
		let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
		return this._http.get(this.url+ 'post/'+id, {headers : headers});
	}

	update(token, post, id): Observable<any>{ // Actualiza un post si el usuario es el dueño
		let json = JSON.stringify(post);
		let params = "json="+json;

		let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
										.set('Authorization', token);

		return this._http.put(this.url + 'post/'+ id, params, {headers: headers});
	}

	delete(token, id){ // Elimina un post especifico si el usuario es el dueño
		let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
										.set('Authorization', token);

		return this._http.delete(this.url+ 'post/' + id, {headers: headers});
	}
}