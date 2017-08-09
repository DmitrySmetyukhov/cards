import {Component, OnInit, TemplateRef} from '@angular/core';
import {CardsService} from "../../shared/cards.service";
import {BsModalRef, BsModalService} from "ngx-bootstrap/modal";
import {Card} from "../../shared/model/card";


@Component({
    selector: 'app-cards-list',
    templateUrl: 'cards-list.component.html',
    styleUrls: ['cards-list.component.css']
})
export class CardsListComponent implements OnInit {

    constructor(private cardsService: CardsService,
                private modalService: BsModalService) {
    }

    cardsList = [];
    public modalRef: BsModalRef;
    selectedCard: Card;

    ngOnInit() {
        this.cardsService.getAllCards().subscribe(
            (cards) => this.cardsList = cards
        );
    }

    private deleteCard(card) {
        this.cardsService.deleteCard(card._id).subscribe(
            (res) => {
                let id = res.id;
                this.cardsList = this.cardsList.filter((card) => {
                    return card._id !== id
                })
            },
            (err) => console.log(err, 'err')
        );
    }

    public openModal(template: TemplateRef<any>, card: Card) {
        // this.socketService.freeUsers = Object.keys(this.socketService.actualConnections);
        // this.socketService.addedUsers = [];
        // this.newRoomName = null;
        this.selectedCard = card;
        this.modalRef = this.modalService.show(template);
    }

}
