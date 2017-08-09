import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';

import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {RouterModule} from "@angular/router";

import {CardsComponent} from "./cards/cards.component";
import {CardsService} from "./shared/cards.service";
import {HttpService} from "./shared/http.service";
import {HttpModule} from "@angular/http";
import {InfinitivesComponent} from './infinitives/infinitives.component';
import {CardsListComponent} from './cards/cards-list/cards-list.component';
import {CreateCardsComponent} from './cards/create-cards/create-cards.component';
import {CreateInfinitivesComponent} from './infinitives/create-infinitives/create-infinitives.component';
import {InfinitivesListComponent} from './infinitives/infinitives-list/infinitives-list.component';
import {AuthService} from "./shared/auth.service";
import { LoginComponent } from './login/login.component';

@NgModule({
    declarations: [
        AppComponent,
        CardsComponent,
        InfinitivesComponent,
        CardsListComponent,
        CreateCardsComponent,
        CreateInfinitivesComponent,
        InfinitivesListComponent,
        LoginComponent
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
            },
            {
                path: 'create-cards',
                component: CreateCardsComponent
            },
            {
                path: 'cards-list',
                component: CardsListComponent
            },
            {
                path: 'infinitives',
                component: InfinitivesComponent
            },
            {
                path: 'create-infinitives',
                component: CreateInfinitivesComponent
            },
            {
                path: 'infinitives-list',
                component: InfinitivesListComponent
            },
            {
                path: 'login',
                component: LoginComponent
            }
        ])
    ],
    providers: [
        CardsService,
        HttpService,
        AuthService
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
