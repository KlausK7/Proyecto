import {ModuleWithProviders} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

// Importar Componentes
import {LoginComponent} from './components/login/login.component';
import {RegistroComponent} from './components/registro/registro.component';
import { HomeComponent } from './components/home/home.component';
import { ErrorComponent } from './components/error/error.component';
import { UserEditComponent } from './components/user-edit/user-edit.component';
import { CategoryNewComponent } from './components/category-new/category-new.component';
import { PostNewComponent } from './components/post-new/post-new.component';
import { PostDetailComponent } from './components/post-detail/post-detail.component';
import { PostEditComponent } from './components/post-edit/post-edit.component';
import { CategoryDatailComponent } from './components/category-datail/category-datail.component';
import { ProfileComponent } from './components/profile/profile.component';

// Importar Middleware para identificar usuario logeado o sino bloquear alguna rutas
import {IdentityGuard} from './services/identity.guard';

//Definir Rutas
const appRoutes: Routes = [
	{path: '', component: HomeComponent},
	{path: 'inicio', component: HomeComponent},
	{path: 'login', component: LoginComponent},
	{path: 'logout/:sure', component: LoginComponent},
	{path: 'registro', component: RegistroComponent},
	{path: 'ajustes', component: UserEditComponent, canActivate: [IdentityGuard]},
	{path: 'crear-categoria', component: CategoryNewComponent, canActivate: [IdentityGuard]},
	{path: 'crear-entrada', component: PostNewComponent, canActivate: [IdentityGuard]},
	{path: 'entrada/:id', component: PostDetailComponent},
	{path: 'editar-entrada/:id', component: PostEditComponent, canActivate: [IdentityGuard]},
	{path: 'categoria/:id', component: CategoryDatailComponent, canActivate: [IdentityGuard]},
	{path: 'perfil/:id', component: ProfileComponent, canActivate: [IdentityGuard]},
	{path: '**', component: ErrorComponent}

];

//Exportar configuracion de rutas
export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders<any> = RouterModule.forRoot(appRoutes);