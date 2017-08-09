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
    translationError: string;
    reverse: boolean;
    listenerFn: () => void;



    constructor(private cardsService: CardsService,
                private fb: FormBuilder, private renderer: Renderer2) {
    }

    ngOnInit() {
        this.buildForm();
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
            this.cardsService.getRandomCard();
        }
    }


    check(form) {
        if (form.value.translation.trim() == this.cardsService.currentCard.translation) {
            this.translationError = null;
            form.reset();
            this.translation = null;
            this.cardsService.getRandomCard();
        } else {
            this.translationError = 'error';
        }
    }

    revert() {
        this.reverse = !this.reverse;
    }


    reverseCheck(form) {
        if (form.invalid) return;
        if (form.value.rWord == this.cardsService.currentCard.word) {
            this.translationError = null;
            form.reset();
            this.translation = null;
            this.cardsService.getRandomCard()
        } else {
            this.translationError = 'error';
        }
    }
}
