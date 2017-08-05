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
    showCreateForm: boolean;
    newCardForm: FormGroup;
    cardForm: FormGroup;
    reverseForm: FormGroup;
    newWord: string;
    translation: string;
    newTranslation: string;
    rWord: string;
    currentCard: Card;
    translationError: string;
    reverse: boolean;
    showEdit: boolean;
    cardsList = [];


    constructor(private cardsService: CardsService, private fb: FormBuilder) {
    }

    ngOnInit() {
        this.buildForm();
        this.cardsService.getRandomCard().subscribe(
            (card) => this.currentCard = card,
            (err) => console.log(err, 'error')
        )
    }

    buildForm() {
        this.newCardForm = this.fb.group({
            newWord: [this.newWord, [Validators.required]],
            newTranslation: [this.newTranslation, [Validators.required]]
        });

        this.cardForm = this.fb.group({
            translation: [this.translation, [Validators.required]]
        });

        this.reverseForm = this.fb.group({
            rWord: [this.rWord, [Validators.required]]
        });

    }

    createNew() {
        this.showCreateForm = !this.showCreateForm;
    }

    onSubmitNew(form) {
        let card = new Card(form.value.newWord.trim(), form.value.newTranslation.trim());
        this.cardsService.createCard(card).subscribe(
            () => {
                form.reset();
                // this.showCreateForm = null;
            },
            (error) => console.log(error, 'error')
        );
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

    private showEditSegment() {
        this.cardsService.getAllCards().subscribe(
            (cards) => this.cardsList = cards
        );
        this.showEdit = !this.showEdit;
    }

    private deleteCard(card) {
        this.cardsService.deleteCard(card._id).subscribe(
            (res) => {
                let id = res.id;
                this.cardsList = this.cardsList.filter((card) => {
                    return card._id !== id
                })
            },
            (err) => console.log(err, 'err')
        );
    }

}
