import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {Post } from '../../modelo/post';
import {PostService} from '../../services/post.service';
import {UserService} from '../../services/user.service';
import {User} from '../../modelo/user';
import {global} from '../../services/global';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  providers: [PostService,UserService]
})
export class ProfileComponent implements OnInit {

  	public url;
	public status;
	public posts: Array<Post> ;
	public identity;
	public token;
	public user: User;

  constructor(
  	private _route: ActivatedRoute,
  	private _router: Router,
  	private _postService: PostService,
  	private _userService : UserService
  ) { 
  	this.url = global.url;
  	this.identity = this._userService.getIdentity();
  	this.token = this._userService.getToken();
  }

  ngOnInit(): void {
  	this.getProfile();
  }

  getProfile(){ // Busca los datos del usuario
  		this._route.params.subscribe( params => {
  		let userId = +params['id'];
  		this.getUser(userId);
  		this.getPostId(userId);
  	});
  }

  getPostId(userId){ // carga los post del usuario
  	this._userService.getPostId(userId).subscribe(
  		response => {
  			if (response.status == 'success'){
  				this.posts = response.posts;
  			}
  		},
  		error => {
  			console.log(<any>error);
  		}

  	);
  }

  deletePost(id){ // Elimina el post del usuario que manda por id
    this._postService.delete(this.token, id).subscribe(
      response => {
          this.getProfile();
      },
      error => {
        console.log(<any>error);
      }

    );
  }

  getUser(userId){ // Obtiene los datos del usuario segun el id
  	this._userService.getUser(userId).subscribe(
  		response => {
  			if (response.status == 'success'){
  				this.user = response.user;
  			}
  		},
  		error => {
  			console.log(<any>error);
  		}

  	);
  }
}
