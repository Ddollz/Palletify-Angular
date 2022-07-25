import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css']
})
export class GalleryComponent implements OnInit {

  hexArray: string[][] = [["#bb94a7","#659f5a","#af32b2","#681138"],["#3e68dc","#b2655b","#35b435","#3e68dc"],["#58a580","#a78ca5","#a78c29","#299da7"]];
  palleteBy: string[] = ['Karl','Ericka','Karl'];
  constructor() { }

  ngOnInit(): void {
  }

}
