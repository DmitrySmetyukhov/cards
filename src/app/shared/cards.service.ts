import {Injectable} from "@angular/core";
import {HttpService} from "./http.service";
import {Card} from "./model/card";
import {Observable} from "rxjs";
import {Response} from "@angular/http";
@Injectable()

export class CardsService {
    private url = 'http://localhost:3000/cards';

    constructor(private http: HttpService) {
    }

    public getAllCards() {
        return this.http.get(this.url)
    }

    public getRandomCard(): Observable<Card> {
        return this.http.get(this.url + '/random')
            .map(this.extractCard)
            .catch(this.handleError)
    }

    public createCard(card: Card) {
        return this.http.post(this.url, {newCard: card})
    }

    private extractCard(response: Response): Card {
        try {
            let res = response.json();
            let card = new Card(res.word, res.translation);
            return card;
        } catch (e) {
            return e;
        }
    }

    private handleError(error: any, cought: Observable < any >): any {
        let message = '';
        if (error instanceof Response) {
            let errorData = error.json().error || JSON.stringify(error.json());
            message = `${error.status} - ${error.statusText || ''} ${errorData}`
        } else {
            message = error.message ? error.message : error.toString();
        }
        console.error(message);
        return Observable.throw(message);
    }
}
