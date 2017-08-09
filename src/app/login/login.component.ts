import {Component, OnInit} from '@angular/core';
import {AuthService} from "../shared/auth.service";

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    login: string;
    password: string;
    newLogin: string;
    newPassword: string;

    constructor(private authService: AuthService) {
    }

    ngOnInit() {

    }

    authorize() {
        this.authService.authorize(this.login, this.password).subscribe(
            (res) => {
            }
        )
    }

    registration() {
        this.authService.registration(this.newLogin, this.newPassword).subscribe(
            (res) => {
            }
        )
    }

    logout() {
        this.authService.logout().subscribe(
            () => {
            }
        )
    }

}
