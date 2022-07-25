import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-input-range',
  templateUrl: './input-range.component.html',
  styleUrls: ['./input-range.component.css']
})
export class InputRangeComponent implements OnInit {
  @Input('labelTitle') labelTitle: string = 'this is a label';
  @Input('type') type: string = '';

  @Input('minDef') minDef: string = "0";
  @Input('maxDef') maxDef: string = "255";

  @Input('sDefault') rangeDetaultVal: number = 0;
  value: number = 127.5;
  @Input('sliderValue') sliderValue: number;


  @Output() newEventValue = new EventEmitter<number>();

  constructor() {
    this.sliderValue = 0;
  }

  ngOnInit(): void {
    // console.log(this.labelTitle + ":" + this.maxDef);
    this.sliderValue = Math.round(100 - (Number(this.maxDef) - Number(this.rangeDetaultVal)) / (Number(this.maxDef) - Number(this.minDef)) * 100);
  }
  sliderDefault() {

  }
  rangeVal(event: number) {
    this.value = event;
    this.sliderValue = Math.round(100 - (Number(this.maxDef) - event) / (Number(this.maxDef) - Number(this.minDef)) * 100);
    this.newEventValue.emit(this.value);
  }

}
