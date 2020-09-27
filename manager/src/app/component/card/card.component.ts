import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent{

  @Input() description = 'Some quick example text to build on the card title and make up the bulk of the cards content.';
  @Input() title = 'Card Title';
  @Input() image = 'assets/images/big/img1.jpg';

  @Output() editOperationOption: EventEmitter<boolean> = new EventEmitter();
  @Output() deleteOperationOption: EventEmitter<boolean> = new EventEmitter();

  constructor() { }

  editOperation(){
    this.editOperationOption.emit(true);
  }

  deleteOperation(){
    this.deleteOperationOption.emit(true);
  }

}
