import { Component, OnInit } from '@angular/core';
import {CardsService} from "../../shared/cards.service";


@Component({
  selector: 'app-cards-list',
  templateUrl: 'cards-list.component.html',
  styleUrls: ['cards-list.component.css']
})
export class CardsListComponent implements OnInit {

  constructor(private cardsService: CardsService) { }

  cardsList = [];

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

}
