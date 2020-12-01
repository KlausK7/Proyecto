import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {CategoryService} from '../../services/category';
import {Category } from '../../modelo/category';
import { global } from '../../services/global';
import {UserService} from '../../services/user.service';
import {PostService} from '../../services/post.service';

@Component({ // Este Componente se encargar de mostral los post por categoria
  selector: 'app-category-datail',
  templateUrl: './category-datail.component.html',
  styleUrls: ['./category-datail.component.css'],
  providers: [CategoryService, UserService, PostService]
})
export class CategoryDatailComponent implements OnInit {
	public category: Category;
	public posts: any;
	public url: string;
	public identity;
	public token; 

  constructor(
  	private _route: ActivatedRoute,
  	private _router: Router,
  	private _categoryService: CategoryService,
  	private _postService: PostService,
  	private _userService : UserService
  ) { 
  	this.url = global.url;
  	this.identity = this._userService.getIdentity();
  	this.token = this._userService.getToken();  	
  }

  ngOnInit(): void { // Se inicializan todos los post de la categoria
  	this.getPostsByCategory();

  }

  getPostsByCategory(){ //busca todo los post de una categoria
  	this._route.params.subscribe(params => {
  		let id= +params['id'];

  		this._categoryService.getCategory(id).subscribe( // Encuentra los post de la categoria o los manda al inicio de la pagina
  			response => {
  				if (response.status == 'success'){
  					this.category = response.category;
  					this._categoryService.getPostsCategory(id).subscribe(
  						response => {
  							if (response.status == 'success'){
  								this.posts = response.posts; 
  							} else {
  								this._router.navigate(['/inicio']);
  							}
  						},
  						error => {
  							console.log(<any>error);
  						}
  					);
  				} else {
  					this._router.navigate(['/inicio']);
  				}
  			},
  			error => {
  				console.log(<any>error);
  			}

  		)
  	})
  }

 deletePost(id){ // Eliminar el post por el id
    this._postService.delete(this.token, id).subscribe(
      response => {
          this.getPostsByCategory();
      },
      error => {
        console.log(<any>error);
      }

    );
  }
}
