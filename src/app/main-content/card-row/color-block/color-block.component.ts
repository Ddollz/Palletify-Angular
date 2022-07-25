import { Component, OnInit, Input } from '@angular/core';
import { ClipboardService } from 'ngx-clipboard';

@Component({
  selector: 'app-color-block',
  templateUrl: './color-block.component.html',
  styleUrls: ['./color-block.component.css']
})
export class ColorBlockComponent implements OnInit {
  // @HostBinding('class.color-card') someField: boolean = true;
  @Input('labelTitle') labelTitle: number = 0;
  @Input('hslBox') hslBox: Array<number> = [];
  colorHex: string = "";

  constructor(
    private clipboardApi: ClipboardService
  ) {
  }

  ngOnInit(): void {
    this.colorHex = this.HSLToHex(this.hslBox[0], this.hslBox[1], this.hslBox[2]);
  }

  copyText() {
    this.clipboardApi.copyFromContent(this.colorHex)
  }
  HSLToHex(h: number, s: number, l: number) {
    s /= 100;
    l /= 100;

    let c = (1 - Math.abs(2 * l - 1)) * s,
      x = c * (1 - Math.abs((h / 60) % 2 - 1)),
      m = l - c / 2,
      r: any = 0,
      g: any = 0,
      b: any = 0;

    if (0 <= h && h < 60) {
      r = c; g = x; b = 0;
    } else if (60 <= h && h < 120) {
      r = x; g = c; b = 0;
    } else if (120 <= h && h < 180) {
      r = 0; g = c; b = x;
    } else if (180 <= h && h < 240) {
      r = 0; g = x; b = c;
    } else if (240 <= h && h < 300) {
      r = x; g = 0; b = c;
    } else if (300 <= h && h < 360) {
      r = c; g = 0; b = x;
    }
    // Having obtained RGB, convert channels to hex
    r = Math.round((r + m) * 255).toString(16);
    g = Math.round((g + m) * 255).toString(16);
    b = Math.round((b + m) * 255).toString(16);

    // Prepend 0s, if necessary
    if (r.length == 1)
      r = "0" + r;
    if (g.length == 1)
      g = "0" + g;
    if (b.length == 1)
      b = "0" + b;

    return this.rgbToHex(r, g, b);

  }

  componentToHex(c: number) {
    let hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
  }

  rgbToHex(r: number, g: number, b: number) {
    return "#" + this.componentToHex(r) + this.componentToHex(g) + this.componentToHex(b);
  }

}
