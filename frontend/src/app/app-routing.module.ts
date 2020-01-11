import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SignupComponent } from './components/signup/signup.component';
import { SigninComponent } from './components/signin/signin.component';
import { IndexComponent } from './components/index/index.component';
import { AddprojectComponent } from './components/addproject/addproject.component';

import { AuthGuard } from './auth.guard';

const routes: Routes = [
	{
		path: 'signin',
		component: SigninComponent,
	},
	{
		path: 'signup',
		component: SignupComponent,
	},
	{
		path: 'index',
		component: IndexComponent,
		canActivate: [ AuthGuard ],
	},
	{
		path: 'addproject',
		component: AddprojectComponent,
		canActivate: [ AuthGuard ],
	},
	{
		path: '',
		redirectTo: '/signin',
		pathMatch: 'full',
	},
];

@NgModule({
	imports: [ RouterModule.forRoot(routes) ],
	exports: [ RouterModule ],
})
export class AppRoutingModule {}
