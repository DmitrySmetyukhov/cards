import {Component, OnInit} from '@angular/core';
import {CardsService} from "../../shared/cards.service";


@Component({
    selector: 'app-infinitives-list',
    templateUrl: 'infinitives-list.component.html',
    styleUrls: ['infinitives-list.component.css']
})
export class InfinitivesListComponent implements OnInit {

    list;

    constructor(private cardsService: CardsService) {
    }

    ngOnInit() {
        this.getList();
    }

    private getList() {
        this.cardsService.getAllInfinitives().subscribe(
            (arr) => this.list = arr
        )
    }

    private delete(_id: string) {
        this.cardsService.deleteInfinitive(_id).subscribe(
            (res) => {
                this.list = this.list.filter((item) => {
                    return item._id !== res._id;
                })
            },
            (err) => console.log(err, 'err')
        )
    }

 }
