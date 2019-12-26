import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service'
import { Router } from '@angular/router'

@Component({
    selector: 'app-signin',
    templateUrl: './signin.component.html',
    styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

    user = {}

    constructor(private authService: AuthService, private router: Router) { }

    ngOnInit() {
    }

    signIn() {
        this.authService.signInUser(this.user)
            .subscribe(
                res => {
                    console.log(res.token)
                    localStorage.setItem('token', res.token);
                    this.router.navigate(['/index']);
                },
                err => console.log(err)
            )
    }
}
