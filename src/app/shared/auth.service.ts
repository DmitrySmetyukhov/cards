import {HttpService} from "./http.service";
import {Injectable} from "@angular/core";
@Injectable()

export class AuthService {
    // private url = 'https://afternoon-fortress-84676.herokuapp.com/card';
    // private infinitivesUrl = 'https://afternoon-fortress-84676.herokuapp.com/infinitive';
    private url = 'http://localhost:3000/auth';


    constructor(private http: HttpService) {
    }

    authorize(login, password) {
        return this.http.post(this.url + '/' + 'login', {login: login, password: password})
    }

    registration(login, password) {
        return this.http.post(this.url + '/' + 'registration', {login: login, password: password})
    }

    logout() {
        return this.http.post(this.url + '/logout', {});
    }
}
