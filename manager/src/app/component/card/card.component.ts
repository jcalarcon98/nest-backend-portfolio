import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {

  @Input() description = 'Some quick example text to build on the card title and make up the bulk of the cards content.';
  @Input() title = 'Card Title';
  @Input() image = 'assets/images/big/img1.jpg';

  constructor() { }

  ngOnInit(): void {
  }

}
