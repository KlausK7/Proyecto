import { Component, OnInit } from '@angular/core';
import {User} from '../../modelo/user';
import {UserService} from '../../services/user.service';
import {global} from '../../services/global';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css'],
  providers: [UserService]
})
export class UserEditComponent implements OnInit {
	public user: User;
	public identity;
	public token;
	public status;
	public url;

	// Variable a subir archivo

	public afuConfig = {
	    multiple: false,
	    formatsAllowed: ".jpg,.pngm .gif, jpeg",
	    maxSize: "50",
	    uploadAPI:  {
	      url:global.url+'usuario/upload', // Url avatar api
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
	      attachPinBtn: 'Sube tu avatar de usuario...',
	      afterUploadMsg_success: '¡ Subido correctamente !',
	      afterUploadMsg_error: '¡ Fallo en la subida !',
	      sizeLimit: 'Tamaño máx.'
	    }
	};

	//------------------------------------------------
  constructor(
  	private _userService : UserService
  ) {
  	this.user = new User(1,'','','ROLE_USER','','','','');
  	this.identity = this._userService.getIdentity();
  	this.token = this._userService.getToken();
  	this.url = global.url;



  	// Rellenar Objeto Usuario con los datos en storageLocal
  	this.user = new User(
  		this.identity.sub,
  		this.identity.name,
  		this.identity.surname,
  		this.identity.role,
  		this.identity.email,'',
  		this.identity.description,
  		this.identity.image);
   }

  ngOnInit(): void {
  }

  onSubmit(form){ // Actualiza los datos del usuario
  	this._userService.update(this.token, this.user).subscribe(
  		response => {
  			if(response.status === 'success'){
  				this.status = 'success';

  				//Actualizar Cambios
  				if (response.change.name){
  					this.user.name = response.change.name;
  				}	
  				if (response.change.surname){
  					this.user.surname = response.change.surname;
  				}
  				if (response.change.email){
  					this.user.email = response.change.email;
  				}
  				if (response.change.description){
  					this.user.description = response.change.description;
  				}
  				if (response.change.image){
  					this.user.image = response.change.image;
  				}
  				console.log(response.user)
  				//actualizar Usuario en la session
  				this.identity = this.user;
  				localStorage.setItem('identity', JSON.stringify(this.identity));
  			}
  			this.status = 'error';
  		},
  		error => {
  			this.status = 'error';
  			console.log(<any>error);
  		}
  	)
  }

  avatarUpload(datos){ // actualiza la imagen del usuario
    let data_image = datos.body.image;
    this.user.image = data_image;
    this.identity.image = data_image;

  }
}
