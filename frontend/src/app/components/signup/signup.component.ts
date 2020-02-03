import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
	selector: 'app-signup',
	templateUrl: './signup.component.html',
	styleUrls: [ './signup.component.css' ],
})
export class SignupComponent implements OnInit {
	user = {
		name: '',
		email: '',
		password: '',
	};

	constructor(private authService: AuthService, private router: Router) {}

	ngOnInit() {
		if (this.authService.loggedIn()) {
			this.router.navigate([ '/index' ]);
		}
	}

	signUp() {
		if (this.validator()) {
			this.authService.signUpUser(this.user).subscribe(
				res => {
					
					this.router.navigate([ '/signin' ]);
				},
				err => {
					
				}
			);
		}
	}

	validator() {
		if (this.user.email == '') {
			
			return false;
		}
		if (this.user.password == '') {
			
			return false;
		}
		if (this.user.name == '') {
			
			return false;
		}
		return true;
	}
}
