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
    infinitiveForm: FormGroup;
    rInfinitiveForm: FormGroup;
    inf1 = {};
    inf2 = {};
    currentInfinitive: Infinitive;
    errorCheck = null;
    reverse = null;
    rInputs = [];
    aInputs = [];


    constructor(private cardsService: CardsService, private fb: FormBuilder) {
    }

    buildForm() {

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
        this.getRandomInfinitive().then(() => {
            this.initializeInputsArrays();
        });
    }


    private getRandomInfinitive() {
        return new Promise<any>((resolve, reject) => {
            this.cardsService.getRandomInfinitive().subscribe(
                (infinitive) => {
                    this.currentInfinitive = infinitive;
                    resolve();
                },
                (err) => console.log(err, 'err')
            )
        })

    }

    public onSubmit(form) {
        for (let prop in form.value) {
            if (this.currentInfinitive[prop].trim() !== form.value[prop].trim()) {
                this.errorCheck = 'error';
                return;
            }
        }

        this.getRandomInfinitive();
        form.reset();
        this.errorCheck = null;
    }

    private initializeInputsArrays() {
        this.cardsService.initializeInputsArray(this.aInputs, '.a-input');
        this.cardsService.initializeInputsArray(this.rInputs, '.r-input');
    }

    keyDown(form, event, inputsArray) {
        if(this.cardsService.infinitivesFormKeyDown(form, event, inputsArray)){
            this.onSubmit(form);
        }
    }


    revert() {
        this.reverse = !this.reverse;
        this.initializeInputsArrays();
    }

}
