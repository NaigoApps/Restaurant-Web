export default class Color {
    constructor(rgb) {
        this._r = rgb.r;
        this._g = rgb.g;
        this._b = rgb.b;
        const hsl = Color.RGB2HSL(rgb.r, rgb.g, rgb.b);
        this._h = hsl[0];
        this._s = hsl[1];
        this._l = hsl[2];
    }

    get red() {
        return this._r;
    }

    get green() {
        return this._g;
    }

    get blue() {
        return this._b;
    }

    get hue() {
        return this._h;
    }

    get saturation() {
        return this._s;
    }

    get lightness() {
        return this._l;
    }

    toHexString() {
        return "#" +
            ("00" + Math.floor(this.red).toString(16).toUpperCase()).slice(-2) +
            ("00" + Math.floor(this.green).toString(16).toUpperCase()).slice(-2) +
            ("00" + Math.floor(this.blue).toString(16).toUpperCase()).slice(-2);
    }

    toRGBInt() {
        return Math.floor(this.red) * 256 * 256 + Math.floor(this.green) * 256 + Math.floor(this.blue);
    }

    foreground() {
        if (this.lightness > 0.3) {
            return Color.black;
        }
        return Color.white;
    }

    static fromHexString(str){
        return this.fromRGBInt(parseInt("0x" + str.substring(1)));
    }

    static fromRGBInt(rgb) {
        return this.fromRGB(rgb >> 16, (rgb >> 8) % 256, rgb % 256);
    }

    static fromRGB(r, g, b) {
        return new Color({r: r, g: g, b: b});
    }

    static fromHSL(h, s, l) {
        return Color.fromRGB(...Color.HSL2RGB(h, s, l));
    }

    static RGB2HSL(r, g, b) {
        r /= 255;
        g /= 255;
        b /= 255;

        let max = Math.max(r, g, b);
        let min = Math.min(r, g, b);
        let h;
        let s;
        let l = (max + min) / 2;

        if (max === min) {
            h = s = 0;
        } else {
            let d = max - min;
            s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

            switch (max) {
                case r:
                    h = (g - b) / d + (g < b ? 6 : 0);
                    break;
                case g:
                    h = (b - r) / d + 2;
                    break;
                case b:
                    h = (r - g) / d + 4;
                    break;
            }

            h /= 6;
        }

        return [h, s, l];
    }

    static HSL2RGB(h, s, l) {
        let r, g, b;

        if (s === 0) {
            r = g = b = l;
        } else {


            const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
            const p = 2 * l - q;

            r = this.HUE2RGB(p, q, h + 1 / 3);
            g = this.HUE2RGB(p, q, h);
            b = this.HUE2RGB(p, q, h - 1 / 3);
        }

        return [r * 255, g * 255, b * 255];
    }

    static HUE2RGB(p, q, t) {
        if (t < 0) t += 1;
        if (t > 1) t -= 1;
        if (t < 1 / 6) return p + (q - p) * 6 * t;
        if (t < 1 / 2) return q;
        if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
        return p;
    }

    static get black() {
        return Color.fromHexString("#000000");
    }

    static get white() {
        return Color.fromHexString("#FFFFFF");
    }

    static get primary() {
        return Color.fromHexString("#0275d8");
    }

    static get secondary() {
        return Color.fromHexString("#FFFFFF");
    }

    static get success() {
        return Color.fromHexString("#5cb85c");
    }

    static get danger() {
        return Color.fromHexString("#d9534f");
    }

    static get warning() {
        return Color.fromHexString("#f0ad4e");
    }

    static get info() {
        return Color.fromHexString("#5bc0de");
    }

    get darker(){
        let l = this.lightness / 2;
        return Color.fromHSL(this.hue, this.saturation, l);
    }
}