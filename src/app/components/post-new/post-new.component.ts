import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {UserService} from '../../services/user.service';
import {CategoryService} from '../../services/category';
import {PostService} from '../../services/post.service';
import {Post } from '../../modelo/post';
import {global} from '../../services/global';

@Component({
  selector: 'app-post-new',
  templateUrl: './post-new.component.html',
  styleUrls: ['./post-new.component.css'],
  providers: [UserService, CategoryService, PostService]
})
export class PostNewComponent implements OnInit {
	public identity;
	public token;
	public post: Post;
	public status;
	public categories;
  public page_title: string;
  public sub_title: string;
  public url;
  public is_edit: boolean;

	// Variable a subir archivo

	public afuConfig = {
	    multiple: false,
	    formatsAllowed: ".jpg,.pngm .gif, jpeg",
	    maxSize: "50",
	    uploadAPI:  {
	      url:global.url+'post/upload', // Url imagen api
	      method:"POST",
	      headers: {
	     "Authorization" : this._userService.getToken()
	      }, responseType: 'json',
	    },
	    theme: "attachPin",
	    hideProgressBar: false,
	    hideResetBtn: true,
	    hideSelectBtn: false,
	    fileNameIndex: true,
	     replaceTexts: {
	      selectFileBtn: 'Seleccionar archivo',
	      resetBtn: 'Reset',
	      uploadBtn: 'Subir',
	      dragNDropBox: 'Arrastrar y soltar',
	      attachPinBtn: 'Sube imagen post aqui',
	      afterUploadMsg_success: '¡ Subido correctamente !',
	      afterUploadMsg_error: '¡ Fallo en la subida !',
	      sizeLimit: 'Tamaño máx.'
	    }
	};

  constructor(
  	private _route: ActivatedRoute,
  	private _router: Router,
  	private _userService: UserService,
  	private _categoryService: CategoryService,
  	private _postService: PostService
  ) {
  	this.identity = this._userService.getIdentity();
  	this.token = this._userService.getToken();
    this.page_title = 'Nuevo Post';
    this.sub_title = 'Crea un nuevo  post';
    this.url = global.url;
    this.is_edit = false;

   }

  ngOnInit(): void { 
  	this.getCategories();
  	this.post = new Post(1,this.identity.sub,1,'','',null,null);

  }

  getCategories(){ // saca todas las categorias 
  	this._categoryService.getCategories().subscribe(
  		response => {
  			if(response.status == 'success'){
  				this.categories = response.categories;
  			}
  		},
  		error => {
  			console.log(<any>error);
  		}
  	);
  }

  imagenUpload(datos){ // Actualiza la imagen
    let image_data = datos.body.image;
    this.post.image = image_data;
    
  }


  onSubmit(form){ // crea el nuevo post
  		this._postService.create(this.token, this.post).subscribe(
  			response => {
  				if (response.status == 'success'){
  					this.post = response.post;
  					this.status = 'success';
  					this._router.navigate(['inicio']);
  				} else {
  					this.status = 'error';	
  				}
  			},
  			error => {
  				this.status = 'error';
  				console.log(<any>error);

  			}
  		);
  }

}
