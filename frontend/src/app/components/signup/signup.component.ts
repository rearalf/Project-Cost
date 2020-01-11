import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

import swal from 'sweetalert';

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

	ngOnInit() {}

	signUp() {
		if (this.validator()) {
			this.authService.signUpUser(this.user).subscribe(
				res => {
					swal({
						icon: 'success',
						title: 'Success',
						text: res.messege,
						timer: 1500,
					});
					this.router.navigate([ '/signin' ]);
				},
				err => {
					swal({
						icon: 'error',
						title: 'Error',
						text: err.error.message,
						timer: 2000,
					});
				}
			);
		}
	}

	validator() {
		if (this.user.email == '') {
			swal({
				icon: 'warning',
				title: 'Warning',
				text: 'Email is empty',
				timer: 2000,
			});
			return false;
		}
		if (this.user.password == '') {
			swal({
				icon: 'warning',
				title: 'Warning',
				text: 'Password is empty',
				timer: 2000,
			});
			return false;
		}
		if (this.user.name == '') {
			swal({
				icon: 'warning',
				title: 'Warning',
				text: 'Name is empty',
				timer: 2000,
			});
			return false;
		}
		return true;
	}
}
