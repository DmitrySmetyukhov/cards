import {Component, OnInit} from '@angular/core';
import {CardsService} from "../shared/cards.service";
import {FormBuilder, Validators, FormGroup} from "@angular/forms";
import {Infinitive} from "../shared/model/infinitive";

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

    onKeyDown(form, event) {
        if (event.key === 'Enter') {
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
    }

}
