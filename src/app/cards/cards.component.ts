import {Component, OnInit} from '@angular/core';
import {CardsService} from "../shared/cards.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Card} from "../shared/model/card";

@Component({
    selector: 'app-cards',
    templateUrl: './cards.component.html',
    styleUrls: ['./cards.component.css']
})
export class CardsComponent implements OnInit {

    cardForm: FormGroup;
    reverseForm: FormGroup;
    translation: string;
    rWord: string;
    currentCard: Card;
    translationError: string;
    reverse: boolean;


    constructor(private cardsService: CardsService,
                private fb: FormBuilder) {
    }

    ngOnInit() {
        this.buildForm();
        this.cardsService.getRandomCard().subscribe(
            (card) => this.currentCard = card,
            (err) => console.log(err, 'error')
        )
    }

    buildForm() {

        this.cardForm = this.fb.group({
            translation: [this.translation, [Validators.required]]
        });

        this.reverseForm = this.fb.group({
            rWord: [this.rWord, [Validators.required]]
        });

    }


    check(form) {
        let translation = form.value.translation;
        if (translation == this.currentCard.translation) {
            this.translationError = null;
            form.reset();
            this.translation = null;

            this.cardsService.getRandomCard().subscribe(
                (card) => this.currentCard = card,
                (error) => console.log(error, 'error')
            );
        } else {
            this.translationError = 'error';
        }
    }

    revert() {
        this.reverse = !this.reverse;
    }


    reverseCheck(form) {
        if (form.invalid) return;
        if (form.value.rWord == this.currentCard.word) {
            this.translationError = null;
            form.reset();
            this.translation = null;
            this.cardsService.getRandomCard().subscribe(
                (card) => this.currentCard = card,
                (error) => console.log(error, 'error')
            );
        } else {
            this.translationError = 'error';
        }
    }
}
