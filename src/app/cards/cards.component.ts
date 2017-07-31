import {Component, OnInit} from '@angular/core';
import {CardsService} from "../shared/cards.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
    selector: 'app-cards',
    templateUrl: './cards.component.html',
    styleUrls: ['./cards.component.css']
})
export class CardsComponent implements OnInit {
    showCreateForm: boolean;
    newCardForm: FormGroup;
    newWord: String;
    newTranslation: String;


    constructor(private cardsService: CardsService, private fb: FormBuilder,) {
    }

    ngOnInit() {
        console.log('cards component')
        this.buildForm();
        this.cardsService.getAllCards().subscribe(
            (cards) => console.log(cards, 'cards'),
            (err) => console.log(err, 'error')
        )
    }

    buildForm() {
        this.newCardForm = this.fb.group({
            newWord: [this.newWord, [Validators.required]],
            newTranslation: [this.newTranslation, [Validators.required]]
        })
    }

    createNew(event) {
        event.preventDefault();
        this.showCreateForm = !this.showCreateForm;
    }

    onSubmitNew(form) {
        // if(form.invalid) return;
        console.log(form, 'form')
    }

}
