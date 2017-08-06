import {Component, OnInit, Renderer2} from '@angular/core';
import {CardsService} from "../shared/cards.service";
import {FormBuilder, Validators, FormGroup} from "@angular/forms";
import {Infinitive} from "../shared/model/infinitive";

@Component({
    selector: 'app-infinitives',
    templateUrl: './infinitives.component.html',
    styleUrls: ['./infinitives.component.css']
})
export class InfinitivesComponent implements OnInit {

    infinitiveForm: FormGroup;
    rInfinitiveForm: FormGroup;
    inf1 = {};
    inf2 = {};
    currentInfinitive: Infinitive;
    errorCheck = null;
    reverse = null;
    rInputs = [];
    aInputs = [];
    hint;
    listenerFn: () => void;
    pending;


    constructor(private cardsService: CardsService, private fb: FormBuilder, private renderer: Renderer2) {
    }


    ngOnInit() {
        this.buildForm();
        this.getRandomInfinitive().then(() => {
            this.initializeInputsArrays();
        });


        this.listenerFn = this.renderer.listen('document', 'keydown', (evt) => {
            this.identKey(evt);
        })
    }

    ngOnDestroy() {
        if (this.listenerFn) {
            this.listenerFn();
        }
    }

    private identKey(event) {
        if (event.key === '6') {
            event.preventDefault();
            this.getRandomInfinitive();
        }
    }


    private getRandomInfinitive() {
        if (this.pending) return;
        return new Promise<any>((resolve, reject) => {
            this.pending = true;
            this.cardsService.getRandomInfinitive().subscribe(
                (infinitive) => {
                    this.currentInfinitive = infinitive;
                    resolve();
                    this.pending = null;
                },
                (err) => console.log(err, 'err')
            )
        })
    }


    private buildForm() {

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

    private onSubmit(form) {
        for (let prop in form.value) {
            if (this.currentInfinitive[prop].trim() !== form.value[prop].trim()) {
                this.errorCheck = 'error';
                return;
            }
        }

        this.getRandomInfinitive();
        form.reset();
        this.errorCheck = null;
        this.hint = null;
    }

    private initializeInputsArrays() {
        this.cardsService.initializeInputsArray(this.aInputs, '.a-input');
        this.cardsService.initializeInputsArray(this.rInputs, '.r-input');
    }

    private keyDown(form, event, inputsArray) {
        if (this.cardsService.infinitivesFormKeyDown(form, event, inputsArray)) {
            this.onSubmit(form);
        }
    }


    revert() {
        this.reverse = !this.reverse;
        this.initializeInputsArrays();
    }

    showHint() {
        this.hint = !this.hint;
    }

}
