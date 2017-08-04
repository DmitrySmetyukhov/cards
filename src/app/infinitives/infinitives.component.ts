import {Component, OnInit} from '@angular/core';
import {CardsService} from "../shared/cards.service";
import {FormBuilder, Validators, FormGroup} from "@angular/forms";
import {Infinitive} from "../shared/model/infinitive";
import * as $ from 'jquery';
@Component({
    selector: 'app-infinitives',
    templateUrl: './infinitives.component.html',
    styleUrls: ['./infinitives.component.css']
})
export class InfinitivesComponent implements OnInit {
    showCreateForm: boolean;
    newInfinitiveForm: FormGroup;
    infinitiveForm: FormGroup;
    rInfinitiveForm: FormGroup;
    inf = {};
    inf1 = {};
    inf2 = {};
    currentInfinitive: Infinitive;
    newInfinitive: Infinitive;
    errorCheck = null;
    reverse = null;
    rInputs;
    aInputs;
    nInputs;

    constructor(private cardsService: CardsService, private fb: FormBuilder) {
    }

    buildForm() {
        this.newInfinitiveForm = this.fb.group({
            infinitive: [this.inf['infinitive'], [Validators.required]],
            pastSimple: [this.inf['pastSimple'], [Validators.required]],
            pastParticiple: [this.inf['pastParticiple'], [Validators.required]],
            translation: [this.inf['translation'], [Validators.required]]
        });

        this.infinitiveForm = this.fb.group({
            infinitive: [this.inf1['infinitive'], [Validators.required]],
            pastSimple: [this.inf1['pastSimple'], [Validators.required]],
            pastParticiple: [this.inf1['pastParticiple'], [Validators.required]]
        });

        this.rInfinitiveForm = this.fb.group({
            translation: [this.inf2['translation'], [Validators.required]],
            pastSimple: [this.inf2['pastSimple'], [Validators.required]],
            pastParticiple: [this.inf2['pastParticiple'], [Validators.required]]
        })


    }

    ngOnInit() {
        this.buildForm();
        this.getRandomInfinitive();

        this.initializeInputsArrays()
    }


    private getRandomInfinitive() {
        this.cardsService.getRandomInfinitive().subscribe(
            (infinitive) => {
                this.currentInfinitive = infinitive;
            },
            (err) => console.log(err, 'err')
        )
    }

    public onSubmitNew(form) {
        let infinitive = new Infinitive(
            form.value.translation,
            form.value.infinitive,
            form.value.pastSimple,
            form.value.pastParticiple
        );

        this.cardsService.createInfinitive(infinitive).subscribe(
            (res) => {
                form.reset();
            },
            (err) => console.log(err, 'err')
        );
    }

    public onSubmit(form) {
        for (let prop in form.value) {
            if (this.currentInfinitive[prop] !== form.value[prop]) {
                this.errorCheck = 'error';
                return;
            }
        }

        this.getRandomInfinitive();
        form.reset();
        this.errorCheck = null;
    }

    next(inputsArray) {
        for (let i = 0; i < inputsArray.length; i++) {
            if (i == inputsArray.length - 1) return false;
            if ($(inputsArray[i]).is(':focus')) {
                $(inputsArray[i + 1]).focus();
                return true;
            }
        }
    }

    private initializeInputsArrays() {
        $(document).ready(() => {
            this.aInputs = $('.a-input');
            this.rInputs = $('.r-input');
            this.nInputs = $('.n-input');
        })
    }

    onKeyDown(form, event, inputsArray) {
        if (event.key === 'Enter') {
            if (this.next(inputsArray)) return;

            for (let prop in form.value) {
                if (!form.value[prop]) return;
            }

            this.onSubmit(form);
        }
    }

    createNew() {
        this.showCreateForm = !!this.showCreateForm;
    }

    revert() {
        this.reverse = !this.reverse;
        this.initializeInputsArrays();
    }

}
