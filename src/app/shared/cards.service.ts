import {Injectable} from "@angular/core";
import {HttpService} from "./http.service";
@Injectable()

export class CardsService {
    private url = 'http://localhost:3000';

    constructor(private http: HttpService){}

    public getAllCards() {
        return this.http.get(this.url + '/cards')
    }
}
