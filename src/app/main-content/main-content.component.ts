import { Component, OnInit, Input, ViewChild, AfterViewInit, ViewContainerRef, ComponentRef } from '@angular/core';
import { colorRGB, colorHSL } from '../utilities';
import { CardRowComponent } from './card-row/card-row.component';
import { ClipboardService } from 'ngx-clipboard';

@Component({
  selector: 'app-main-content',
  templateUrl: './main-content.component.html',
  styleUrls: ['./main-content.component.css'],
})
export class MainContentComponent implements OnInit, AfterViewInit {
  @Input('hex') hexValue: string = "#bb94a7";

  RGBslider: colorRGB;
  HSLslider: colorHSL;
  hslCurrent?: Array<number>;

  @ViewChild('cardHolder', { read: ViewContainerRef, static: true })
  cardHolder?: ViewContainerRef;
  rowComponents = new Map<number, ComponentRef<any>>();
  rowComponentsFull: string = "block";
  indexT: number = 0;

  //? For Clipboard
  clipboardPlaceholder: string = ``;
  hexPlaceholderMap = new Map<number, string[]>();

  constructor(private clipboardApi: ClipboardService) {
    this.RGBslider = {
      redValue: 0,
      greenValue: 0,
      blueValue: 0,
      redSliderValue: 0,
      greenSliderValue: 0,
      blueSliderValue: 0
    }

    this.HSLslider = {
      hueValue: 0,
      saturationValue: 0,
      lightValue: 0,
      hueSliderValue: 0,
      saturationSliderValue: 0,
      lightSliderValue: 0
    }
    this.hslCurrent = [];
  }
  ngAfterViewInit() {
    console.log(this.cardHolder);
  }
  ngOnInit(): void {
    this.hexToRgb(this.hexValue);
    this.hexToHSL(this.hexValue);
    document.documentElement.style.setProperty('--primary-hex', this.hexValue);
  }


  copyText() {
    for (let [key, value] of this.hexPlaceholderMap) {
      console.log(key, value);
      this.clipboardPlaceholder += `Color Pallete ${key + 1}\n`;
      for (let index = 0; index < value.length; index++) {
        this.clipboardPlaceholder += " " + value[index];
      }
      this.clipboardPlaceholder += `\n`;
    }
    console.log()
    this.clipboardApi.copyFromContent(this.clipboardPlaceholder);
  }

  checkFullColor() {
    console.log(this.rowComponents.size);
    if (this.rowComponents.size > 4) {
      this.rowComponentsFull = "none";
    } else {
      this.rowComponentsFull = "block";
    }
  }
  addColor(value: Array<number>) {
    if (this.cardHolder != undefined) {
      this.checkFullColor();
      const componentRef = this.cardHolder.createComponent(CardRowComponent);
      let uName = this.indexT;
      componentRef.instance.hsl = value;
      componentRef.instance.deleteAllowed = true;
      componentRef.instance.uniqueID = this.indexT;

      componentRef.instance.newEventValue.subscribe((res: any) => {
        console.log(res.uniqueID);
        this.deleteColor(res.uniqueID);
      });

      // const hexTemp = this.HSLToHex(value[0],value[1],value[2]);
      const hexTemp = [
        this.HSLToHex(value[0], value[1], value[2] * 0.25, true),
        this.HSLToHex(value[0], value[1], value[2] * 0.5, true),
        this.HSLToHex(value[0], value[1], value[2], true),
        this.HSLToHex(value[0], value[1], value[2] * 1.25, true),
        this.HSLToHex(value[0], value[1], value[2] * 1.5, true)
      ]
      // console.log(hexTemp);
      this.hexPlaceholderMap.set(uName, hexTemp);
      this.rowComponents.set(uName, componentRef);
      this.indexT++;
      console.log(this.hexPlaceholderMap);
    }
  }

  deleteColor(componentName: number) {
    if (this.rowComponents.has(componentName)) {
      this.rowComponents.get(componentName)?.destroy();
      this.rowComponents.delete(componentName);
    }
  }
  //! Start Color Change Checker
  updateHexValue(event: string) {
    var reg = /^#([0-9a-f]{3}){1,2}$/i;
    if (reg.test(event)) {
      this.hexValue = event;
    this.hexToRgb(this.hexValue);
    this.hexToHSL(this.hexValue);
      document.documentElement.style.setProperty('--primary-hex', this.hexValue);
    }

  }
  updateRGBValue(value: number, sliderId: string) {
    if (sliderId === 'Red') {
      this.RGBslider.redValue = value;
    }
    if (sliderId === 'Green') {
      this.RGBslider.greenValue = value;
    }
    if (sliderId === 'Blue') {
      this.RGBslider.blueValue = value;
    }
    this.rgbToHex(this.RGBslider.redValue, this.RGBslider.greenValue, this.RGBslider.blueValue);
    this.hexToHSL(this.hexValue);
  }

  updateHSLValue(value: number, sliderId: string) {
    if (sliderId === 'Hue') {
      this.HSLslider.hueValue = value;
    }
    if (sliderId === 'Saturation') {
      this.HSLslider.saturationValue = value;
    }
    if (sliderId === 'Lightness') {
      this.HSLslider.lightValue = value;
    }
    this.HSLToHex(this.HSLslider.hueValue, this.HSLslider.saturationValue, this.HSLslider.lightValue);
  }
  //! End Color Change Checker


  //! Start Color Convertion

  randomHex() {
    this.hexValue = "#" + Math.floor(Math.random() * 16777215).toString(16);
    document.documentElement.style.setProperty('--primary-hex', this.hexValue);
    this.hexToRgb(this.hexValue);
    this.hexToHSL(this.hexValue);

  }

  componentToHex(c: number) {
    let hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
  }

  rgbToHex(r: number, g: number, b: number) {
    this.hexValue = "#" + this.componentToHex(r) + this.componentToHex(g) + this.componentToHex(b);
    this.hexToRgb(this.hexValue);
    this.hexToHSL(this.hexValue);
    document.documentElement.style.setProperty('--primary-hex', this.hexValue);
  }

  hexToRgb(hex: string) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    if (result != null) {
      this.RGBslider.redValue = parseInt(result[1], 16);
      this.RGBslider.redSliderValue = Math.round(100 - (255 - Number(parseInt(result[1], 16))) / (255 - 0) * 100);
      this.RGBslider.greenValue = parseInt(result[2], 16);
      this.RGBslider.greenSliderValue = Math.round(100 - (255 - Number(parseInt(result[2], 16))) / (255 - 0) * 100);
      this.RGBslider.blueValue = parseInt(result[3], 16);
      this.RGBslider.blueSliderValue = Math.round(100 - (255 - Number(parseInt(result[3], 16))) / (255 - 0) * 100);
    }
  }
  hexToHSL(H: string) {
    // Convert hex to RGB first
    let r: any = 0, g: any = 0, b: any = 0;
    if (H.length == 4) {
      r = "0x" + H[1] + H[1];
      g = "0x" + H[2] + H[2];
      b = "0x" + H[3] + H[3];
    } else if (H.length == 7) {
      r = "0x" + H[1] + H[2];
      g = "0x" + H[3] + H[4];
      b = "0x" + H[5] + H[6];
    }
    // Then to HSL
    r /= 255;
    g /= 255;
    b /= 255;
    let cmin = Math.min(r, g, b),
      cmax = Math.max(r, g, b),
      delta = cmax - cmin,
      h: any = 0,
      s: any = 0,
      l: any = 0;

    if (delta == 0)
      h = 0;
    else if (cmax == r)
      h = ((g - b) / delta) % 6;
    else if (cmax == g)
      h = (b - r) / delta + 2;
    else
      h = (r - g) / delta + 4;

    h = Math.round(h * 60);

    if (h < 0)
      h += 360;

    l = (cmax + cmin) / 2;
    s = delta == 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));
    s = +(s * 100).toFixed(1);
    l = +(l * 100).toFixed(1);
    // if (!boxCheck) {
    this.HSLslider.hueValue = h;
    this.HSLslider.hueSliderValue = Math.round(100 - (360 - h) / (360 - 0) * 100);
    this.HSLslider.saturationValue = s;
    this.HSLslider.saturationSliderValue = s;
    this.HSLslider.lightValue = l;
    this.HSLslider.lightSliderValue = l;
    this.hslCurrent = [h, s, l];
    return { hue: h, sat: s, light: l };
    // } else if (boxCheck) {
    //   console.log("hsl(" + h + "," + s + "%," + l + "%)");
    //   return { hue: h, sat: s, light: l };
    // }
    // return { hue: h, sat: s, light: l };
  }
  HSLToHex(h: number, s: number, l: number, addDisallowed: boolean = false) {
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
    if (!addDisallowed) {
      this.hexValue = "#" + this.componentToHex(r) + this.componentToHex(g) + this.componentToHex(b);
      this.hexToRgb(this.hexValue);
      this.hexToHSL(this.hexValue);
      document.documentElement.style.setProperty('--primary-hex', this.hexValue);
    }
    return this.hexValue;

  }

  //! End Color Convertion
}
