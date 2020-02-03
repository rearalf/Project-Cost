import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

import swal from 'sweetalert2';

@Component({
	selector: 'app-signin',
	templateUrl: './signin.component.html',
	styleUrls: [ './signin.component.css' ],
})
export class SigninComponent implements OnInit {
	user = {
		email: '',
		password: '',
	};

	Toast = swal.mixin({
		toast: true,
		position: 'top-end',
		showConfirmButton: false,
		timer: 2000,
		timerProgressBar: true,
		onOpen: toast => {
			toast.addEventListener('mouseenter', swal.stopTimer);
			toast.addEventListener('mouseleave', swal.resumeTimer);
		},
	});

	constructor(private authService: AuthService, private router: Router) {}

	ngOnInit() {
		if (this.authService.loggedIn()) {
			this.router.navigate([ '/index' ]);
		}
		this.authService.userExists().subscribe(res => {
			if (res.length < 0) {
				this.router.navigate([ '/signup' ]);
			}
		});
	}

	signIn() {
		if (this.validator()) {
			this.authService.signInUser(this.user).subscribe(
				res => {
					this.Toast.fire({
						icon: 'success',
						text: ' Correct authentication'
					});
					localStorage.setItem('token', res.token);
					this.router.navigate([ '/index' ]);
				},
				err => {
					swal.fire({
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
			this.Toast.fire({
				icon: 'warning',
				title: 'Email is empty',
			});
			return false;
		}
		if (this.user.password == '') {
			this.Toast.fire({
				icon: 'warning',
				title: 'Password is empty',
			});
			return false;
		}
		return true;
	}
}
