import {Component, OnInit} from '@angular/core';
import {FormGroup, Validators, FormBuilder} from "@angular/forms";
import {Router} from "@angular/router";
import {CardsService} from "../../shared/cards.service";
import {Card} from "../../shared/model/card";


@Component({
    selector: 'app-create-cards',
    templateUrl: 'create-cards.component.html',
    styleUrls: ['create-cards.component.css']
})
export class CreateCardsComponent implements OnInit {
    newCardForm: FormGroup;
    newCard = {
        word: '',
        translation: ''
    };

    constructor(private cardsService: CardsService,
                private fb: FormBuilder) {
    }

    ngOnInit() {
        this.newCardForm = this.fb.group({
            newWord: [this.newCard.word, [Validators.required]],
            newTranslation: [this.newCard.translation, [Validators.required]]
        });
    }


    onSubmitNew(form) {
        let card = new Card(form.value.newWord.trim(), form.value.newTranslation.trim(), null);
        this.cardsService.createCard(card).subscribe(
            () => form.reset(),
            (error) => console.log(error, 'error')
        );
    }

}
