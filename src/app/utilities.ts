export interface colorRGB {

  redValue: number;
  greenValue: number;
  blueValue: number;

  redSliderValue: number;
  greenSliderValue: number;
  blueSliderValue: number;
}
export interface colorHSL {

  hueValue: number;
  saturationValue: number;
  lightValue: number;

  hueSliderValue: number;
  saturationSliderValue: number;
  lightSliderValue: number;
}


export class colorConverter {
  constructor(
    public hex?: string,
    public hue?: number, public saturation?: number, public lightness?: number,
    public red?: number, public green?: number, public blue?: number,
    public hexlist?: Array<string>) {
    this.hue = hue;
    this.saturation = saturation;
    this.lightness = lightness;
    this.red = red;
    this.green = green;
    this.blue = blue;
    this.hex = hex;
    this.hexlist = hexlist;
  }
  getHSLTOHEX(h?: number, s?: number, l?: number, get: boolean = true) {
    if (this.hue != undefined && this.saturation != undefined && this.lightness != undefined && get) {
      this.saturation /= 100;
      this.lightness /= 100;

      let c = (1 - Math.abs(2 * this.lightness - 1)) * this.saturation,
        x = c * (1 - Math.abs((this.hue / 60) % 2 - 1)),
        m = this.lightness - c / 2,
        r: any = 0,
        g: any = 0,
        b: any = 0;

      if (0 <= this.hue && this.hue < 60) {
        r = c; g = x; b = 0;
      } else if (60 <= this.hue && this.hue < 120) {
        r = x; g = c; b = 0;
      } else if (120 <= this.hue && this.hue < 180) {
        r = 0; g = c; b = x;
      } else if (180 <= this.hue && this.hue < 240) {
        r = 0; g = x; b = c;
      } else if (240 <= this.hue && this.hue < 300) {
        r = x; g = 0; b = c;
      } else if (300 <= this.hue && this.hue < 360) {
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

      return "#" + r + g + b;
    } else if (h != undefined && s != undefined && l != undefined && get == false) {
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
      return "#" + r + g + b;
    } else {
      return "#fff";
    }
  }
  hexToHSL() {
    if (this.hex != undefined) {// Convert hex to RGB first
      let r: any = 0, g: any = 0, b: any = 0;
      if (this.hex.length == 4) {
        r = "0x" + this.hex[1] + this.hex[1];
        g = "0x" + this.hex[2] + this.hex[2];
        b = "0x" + this.hex[3] + this.hex[3];
      } else if (this.hex.length == 7) {
        r = "0x" + this.hex[1] + this.hex[2];
        g = "0x" + this.hex[3] + this.hex[4];
        b = "0x" + this.hex[5] + this.hex[6];
      }
      // Then to HSL
      r /= 255;
      g /= 255;
      b /= 255;
      let cmin = Math.min(r, g, b),
        cmax = Math.max(r, g, b),
        delta = cmax - cmin,
        h = 0,
        s = 0,
        l = 0;

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

      return [h, s, l];
    } else {
      return [0, 0, 0]
    }
  }
  getPalleteGroup() {
    if (this.hex != undefined) {
      let convertedHex = this.hexToHSL();
      const hexTemp = [
        this.getHSLTOHEX(convertedHex[0], convertedHex[1], convertedHex[2] * 0.25, false),
        this.getHSLTOHEX(convertedHex[0], convertedHex[1], convertedHex[2] * 0.5, false),
        this.getHSLTOHEX(convertedHex[0], convertedHex[1], convertedHex[2], false),
        this.getHSLTOHEX(convertedHex[0], convertedHex[1], convertedHex[2] * 1.25, false),
        this.getHSLTOHEX(convertedHex[0], convertedHex[1], convertedHex[2] * 1.5, false)
      ]
      return hexTemp;
    } else {
      return ["#fff", "#fff", "#fff", "#fff"];
    }
  }
}

