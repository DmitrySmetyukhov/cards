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
    inf = {};
    inf1 = {};
    currentInfinitive: Infinitive;
    newInfinitive: Infinitive;

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
        })
    }

    ngOnInit() {
        this.buildForm();
        this.cardsService.getAllInfinitives().subscribe(
            (all) => console.log(all, 'all'),
            (err) => console.log(err, 'err')
        )
    }

    public onSubmitNew(form) {
        console.log(form, 'form inf new');
        let infinitive = new Infinitive(
            form.value.translation,
            form.value.infinitive,
            form.value.pastSimple,
            form.value.pastParticiple
        );


        console.log(infinitive, 'infinitive')

        this.cardsService.createInfinitive(infinitive).subscribe(
            (res) => console.log(res, 'res'),
            (err) => console.log(err, 'err')
        );
    }

}
