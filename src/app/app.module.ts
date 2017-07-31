import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';

import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {RouterModule} from "@angular/router";

import {CardsComponent} from "./cards/cards.component";
import {CardsService} from "./shared/cards.service";
import {HttpService} from "./shared/http.service";
import {HttpModule} from "@angular/http";

@NgModule({
    declarations: [
        AppComponent,
        CardsComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        HttpModule,
        RouterModule.forRoot([
            {
                path: '',
                redirectTo: 'cards',
                pathMatch: 'full'
            },
            {
                path: 'cards',
                component: CardsComponent
            }
        ])
    ],
    providers: [
        CardsService,
        HttpService
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
