import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';

@Injectable({
	providedIn: 'root',
})
export class AuthService {
	constructor(private http: HttpClient, private router: Router) {}

	signUpUser(user) {
		return this.http.post<any>(environment.URL + '/signup', user);
	}

	signInUser(user) {
		return this.http.post<any>(environment.URL + '/signin', user);
	}

	loggedIn() {
		if(!!localStorage.getItem('token') && localStorage.getItem('token') != 'undefined'){
			return true
		}
		localStorage.removeItem('token');
	}

	getToken() {
		return localStorage.getItem('token');
	}

	logout() {
		localStorage.removeItem('token');
		this.router.navigate([ '/signin' ]);
	}
}
