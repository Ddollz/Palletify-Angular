import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-pallete',
  templateUrl: './pallete.component.html',
  styleUrls: ['./pallete.component.css']
})
export class PalleteComponent implements OnInit {
  @Input('hexArray') hexArray: string[] = [];
  @Input('name') name: string = "";
  constructor() { }

  ngOnInit(): void {
  }

}
