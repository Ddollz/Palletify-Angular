import { Component, OnInit, Input,HostBinding } from '@angular/core';

import { colorConverter } from '../../../utilities';

@Component({
  selector: 'app-color-block-list',
  templateUrl: './color-block-list.component.html',
  styleUrls: ['./color-block-list.component.css']
})
export class ColorBlockListComponent implements OnInit {
  @Input('curHex') curHex: string = "";
  colorModel: colorConverter = new colorConverter();

  hexList: string[] = [];

  @HostBinding('class.blockContainer') someField: boolean = true;

  constructor() { }

  ngOnInit(): void {
    this.colorModel = new colorConverter(this.curHex);
    this.hexList = this.colorModel.getPalleteGroup();
    console.log(this.hexList);
  }

}
