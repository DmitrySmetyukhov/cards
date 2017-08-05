import {Component, OnInit} from '@angular/core';
import {FormGroup, Validators, FormBuilder} from "@angular/forms";
import {CardsService} from "../../shared/cards.service";
import {Infinitive} from "../../shared/model/infinitive";


@Component({
    selector: 'app-create-infinitives',
    templateUrl: 'create-infinitives.component.html',
    styleUrls: ['create-infinitives.component.css']
})
export class CreateInfinitivesComponent implements OnInit {
    newInfinitiveForm: FormGroup;
    infinitive: Infinitive = new Infinitive('', '', '', '');
    nInputs = [];

    constructor(private cardsService: CardsService, private fb: FormBuilder) {
    }


    ngOnInit() {
        this.newInfinitiveForm = this.fb.group({
            infinitive: [this.infinitive.infinitive, [Validators.required]],
            pastSimple: [this.infinitive.pastSimple, [Validators.required]],
            pastParticiple: [this.infinitive.pastParticiple, [Validators.required]],
            translation: [this.infinitive.translation, [Validators.required]]
        });

        this.cardsService.initializeInputsArray(this.nInputs, '.n-input');
    }


    onSubmitNew(form) {
        let infinitive = new Infinitive(
            form.value.translation.trim(),
            form.value.infinitive.trim(),
            form.value.pastSimple.trim(),
            form.value.pastParticiple.trim()
        );

        this.cardsService.createInfinitive(infinitive).subscribe(
            (res) => {
                form.reset();
            },
            (err) => console.log(err, 'err')
        );
    }

    keyDown(form, event, inputsArray) {
        if(this.cardsService.infinitivesFormKeyDown(form, event, inputsArray)){
            this.onSubmitNew(form);
        }
    }


}
