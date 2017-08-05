import {Injectable} from "@angular/core";
import {HttpService} from "./http.service";
import {Card} from "./model/card";
import {Observable} from "rxjs";
import {Response} from "@angular/http";
import {Infinitive} from "./model/infinitive";
import * as $ from 'jquery';


@Injectable()

export class CardsService {
    // private url = 'https://afternoon-fortress-84676.herokuapp.com/card';
    // private infinitivesUrl = 'https://afternoon-fortress-84676.herokuapp.com/infinitive';
    private url = 'http://localhost:3000/card';
    private infinitivesUrl = 'http://localhost:3000/infinitive';

    constructor(private http: HttpService) {
    }

    public deleteCard(id) {
        return this.http.delete(this.url + '/' + id)
            .map(this.extractCards);
    }


    public getAllCards() {
        return this.http.get(this.url)
            .map(this.extractCards);
    }

    public getRandomCard(): Observable<Card> {
        return this.http.get(this.url + '/random')
            .map(this.extractCard)
            .catch(this.handleError)
    }

    public createCard(card: Card) {
        return this.http.post(this.url, {newCard: card})
    }


    private extractCards(response: Response) {
        try {
            let res = response.json();
            return res;
        } catch (e) {
            return e;
        }
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


    public getAllInfinitives() {
        return this.http.get(this.infinitivesUrl)
            .map(this.extractInfinitivesArray);
    }


    public getRandomInfinitive() {
        return this.http.get(this.infinitivesUrl + '/random')
            .map(this.extractInfinitive)
            .catch(this.handleError);
    }

    public createInfinitive(infinitive: Infinitive) {
        return this.http.post(this.infinitivesUrl, {infinitive: infinitive})
    }

    public deleteInfinitive(_id: string){
        return this.http.delete(this.infinitivesUrl + '/' + _id)
            .map((response) => response.json());
    }

    private extractInfinitivesArray(response: Response): Infinitive[] {
        try {
            let res = response.json();
            return res.map((obj) => new Infinitive(obj.translation, obj.infinitive, obj.pastSimple, obj.pastParticiple, obj._id));

        } catch (e) {
            return e;
        }
    }

    private extractInfinitive(response: Response): Infinitive {
        try {
            let res = response.json();
            let infinitive = new Infinitive(res.translation, res.infinitive, res.pastSimple, res.pastParticiple);
            return infinitive;
        } catch (e) {
            return e;
        }
    }


    public nextInputFocus(inputsArray) {
        for (let i = 0; i < inputsArray.length; i++) {
            if (i == inputsArray.length - 1) return false;
            if ($(inputsArray[i]).is(':focus')) {
                $(inputsArray[i + 1]).focus();
                return true;
            }
        }
    }

    public initializeInputsArray(array, inputsClass) {
        $(document).ready(() => {
            let inputs = $(inputsClass);
            inputs.map((id, el) => {
                array.push(el);
            })
        })
    }

    infinitivesFormKeyDown(form, event, inputsArray) {
        if (event.key === 'Enter') {
            if (this.nextInputFocus(inputsArray)) return false;

            for (let prop in form.value) {
                if (!form.value[prop]) return false;
            }
            return true;
        }
    }
}
