import { Component, OnInit, Input, SimpleChanges, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-card-row',
  templateUrl: './card-row.component.html',
  styleUrls: ['./card-row.component.css']
})
export class CardRowComponent implements OnInit {
  @Input('hsl') hsl?: Array<number>;
  hexColors?: Array<{ id: number, hsl: Array<number> }>;

  @Input() uniqueID: number = 0;
  @Output() newEventValue = new EventEmitter<any>();

  @Input('onDelete') deleteAllowed: boolean = false;

  colorHex: string = "";



  ngOnInit(): void {

    this.boxColorGeneration();
  }

  ngOnChanges(changes: SimpleChanges) {
    this.boxColorGeneration();
  }

  addNewRow(value: Array<number> | undefined) {
    if (!this.deleteAllowed)
      this.newEventValue.emit(value);
    else
      this.newEventValue.emit({ uniqueID: this.uniqueID });

  }

  //! Start Box Color Function
  boxColorGeneration() {
    var currentHSL = this.hsl;
    if (currentHSL != undefined) {
      this.hexColors = [
        { id: 0, hsl: [currentHSL[0], currentHSL[1], currentHSL[2] * 0.25] },
        { id: 1, hsl: [currentHSL[0], currentHSL[1], currentHSL[2] * 0.5] },
        { id: 2, hsl: [currentHSL[0], currentHSL[1], currentHSL[2]] },
        { id: 3, hsl: [currentHSL[0], currentHSL[1], currentHSL[2] * 1.25] },
        { id: 4, hsl: [currentHSL[0], currentHSL[1], currentHSL[2] * 1.5] },
      ];
    }
  }
  //! EndBox Color Function

}
