import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {Category } from '../modelo/category';
import {global} from './global';

@Injectable() //Servicio de categoria para mandar peticiones por http (manda las peticiones http a la api)
export class CategoryService {
	public url: string;

	constructor (
		private _http: HttpClient
	){
		this.url = global.url;
	}

	create(token, category): Observable<any>{ // Funcion para crear una categoria
		let json = JSON.stringify(category);
		let params = "json="+json;

		let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
										.set('Authorization', token);								
		return this._http.post(this.url + 'category', params, {headers: headers});

	}

	getCategories(): Observable<any>{ //Funcion para buscar todas las categorias 
	  	let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
	  	return this._http.get(this.url + 'category', {headers: headers});
  	}

  	getCategory(id): Observable<any>{ // Funcion para buscar 1 categoria con el id enviado
	  	let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
	  	return this._http.get(this.url + 'category/'+ id, {headers: headers});
  	}

  	getPostsCategory(id): Observable<any>{ //Funcion para Buscar Post de 1 categoria
	  	let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
	  	return this._http.get(this.url + 'post/getPostsByCategory/'+ id, {headers: headers});
  	}

}