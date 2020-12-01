import { Component, OnInit } from '@angular/core';
import {Post } from '../../modelo/post';
import {PostService} from '../../services/post.service';
import {UserService} from '../../services/user.service';
import {global} from '../../services/global';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [PostService,UserService]
})
export class HomeComponent implements OnInit {
	public url;
	public status;
	public posts: Array<Post> ;
	public identity;
	public token;

  constructor(
  	private _postService: PostService,
  	private _userService : UserService
  ) { 
  	this.url = global.url;
  	this.identity = this._userService.getIdentity();
  	this.token = this._userService.getToken();
  }

  ngOnInit(): void { // Cuando inicia el componente busca todo los post
  	this.getPosts();
  }

  getPosts(){ // Saca todo los post que existen
  	this._postService.getPosts().subscribe(
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

  deletePost(id){ // Elimina un post dependiendo del id
    this._postService.delete(this.token, id).subscribe(
      response => {
          this.getPosts();
      },
      error => {
        console.log(<any>error);
      }

    );
  }

}
