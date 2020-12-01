import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {UserService} from '../../services/user.service';
import {CategoryService} from '../../services/category';
import {PostService} from '../../services/post.service';
import {Post } from '../../modelo/post';
import {global} from '../../services/global';


@Component({
  selector: 'app-post-edit',
  templateUrl: '../post-new/post-new.component.html',
  providers: [UserService, CategoryService, PostService]
})
export class PostEditComponent implements OnInit {

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
  	this.page_title = 'Modificar Post';
  	this.sub_title = 'Seleccionar que modificar sobre tu post';
    this.url = global.url;
    this.is_edit = true;

   }

  ngOnInit(): void {
  	this.getCategories();
  	this.post = new Post(1,this.identity.sub,1,'','',null,null);
  	this.getPost();

  }

  getCategories(){ // Obtiene todas las categorias 
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

  imagenUpload(datos){ // Busca la imagen del post a eleccion
    let image_data = datos.body.image; 
    this.post.image = image_data;
    
  }


  onSubmit(form){ // Actualiza el post con los datos ingresadors
  		this._postService.update(this.token, this.post, this.post.id).subscribe(
  			response => {
  				if (response.status == 'success'){
  					this.status = 'success';
  					this._router.navigate(['/entrada', this.post.id]);
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

  getPost() { // busca el post a editar
  	this._route.params.subscribe(
  		params => {let id = params['id'];
  		
  		this._postService.getPostId(id).subscribe(
  			response => {
  				if (response.status == 'success'){
  					this.post = response.posts;
            if(this.post.user_id != this.identity.sub){
              this._router.navigate(['/inicio']); 
            }
  				} else {
  					this._router.navigate(['/inicio']);
  				}
  			},
  			error => {
  				this._router.navigate(['/inicio']);

  			}
  		);	
  	});
  }
}
