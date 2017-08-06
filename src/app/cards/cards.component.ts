import {Component, OnInit, Renderer2} from '@angular/core';
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
    listenerFn: () => void;
    pending;

    constructor(private cardsService: CardsService,
                private fb: FormBuilder, private renderer: Renderer2) {
    }

    ngOnInit() {
        this.buildForm();
        this.cardsService.getRandomCard().subscribe(
            (card) => this.currentCard = card,
            (err) => console.log(err, 'error')
        );

        this.listenerFn = this.renderer.listen('document', 'keydown', (evt) => {

            this.identKey(evt);
        });
    }

    ngOnDestroy() {
        if (this.listenerFn) {
            this.listenerFn();
        }
    }

    buildForm() {

        this.cardForm = this.fb.group({
            translation: [this.translation, [Validators.required]]
        });

        this.reverseForm = this.fb.group({
            rWord: [this.rWord, [Validators.required]]
        });

    }

    private identKey(event) {
        if (event.key === '6') {
            event.preventDefault();
            this.getRandomCard();
        }
    }


    private getRandomCard() {
        if(this.pending) return;
        return new Promise<any>((resolve, reject) => {
            this.pending = true;
            this.cardsService.getRandomCard().subscribe(
                (card) => {
                    this.currentCard = card;
                    resolve();
                    this.pending = null;
                },
                (err) => console.log(err, 'err')
            )
        })
    }


    check(form) {
        if (form.value.translation.trim() == this.currentCard.translation) {
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
