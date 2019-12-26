import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service'
import { Router } from '@angular/router'

import swal from 'sweetalert';


@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

    user = {}

    constructor(private authService: AuthService, private router: Router) { }

    ngOnInit() {
    }

    signUp() {
        this.authService.signUpUser(this.user)
            .subscribe(
                res => {
                    if (res.vali) {
                        console.log(res);
                        swal({
                            icon: "success",
                            title: "Success",
                            text: res.messege
                        });
                        localStorage.setItem('token', res.token);
                        this.router.navigate(['/index'])
                    }
                    else {
                        console.log(res);
                        swal({
                            icon: "error",
                            title: "Error",
                            text: res.message
                        });
                    }
                },
                err => console.log(err)
            )
    }
}
