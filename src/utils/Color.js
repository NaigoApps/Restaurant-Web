export default class Color {
    constructor(rgb) {
        this._r = rgb.r;
        this._g = rgb.g;
        this._b = rgb.b;
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
        let max = Math.max(this._r, this._g, this._b);
        let min = Math.min(this._r, this._g, this._b);
        let h;


        if (max === min) {
            return 0;
        }

        const d = max - min;
        switch (max) {
            case this.red:
                h = (this.green - this.blue) / d + (this.green < this.blue ? 6 : 0);
                break;
            case this.green:
                h = (this.blue - this.red) / d + 2;
                break;
            case this.blue:
                h = (this.red - this.green) / d + 4;
                break;
        }

        return h / 6;
    }

    get saturation() {
        let max = Math.max(this._r, this._g, this._b);
        let min = Math.min(this._r, this._g, this._b);
        let s;
        let l = this.lightness;

        if (max === 0 && min === 0) {
            return 0;
        }

        max /= 255;
        min /= 255;
        s = l > 0.5 ? (max - min) / (510 - (max + min)) : (max - min) / (max + min);

        return s;
    }

    get lightness() {
        const max = Math.max(this.red, this.green, this.blue);
        const min = Math.min(this.red, this.green, this.blue);
        return (max + min) / 2 / 255;
    }

    toHexString() {
        return "#" +
            Math.floor(this.red).toString(16).toUpperCase() +
            Math.floor(this.green).toString(16).toUpperCase() +
            Math.floor(this.blue).toString(16).toUpperCase();
    }

    foreground() {
        if (this.red * 0.30 + this.green * 0.59 + this.blue * 0.11 > 186) {
            return Color.fromRGB(0, 0, 0);
        }
        return Color.fromRGB(255, 255, 255);
    }

    static fromRGB(r, g, b) {
        return new Color({r: r, g: g, b: b});
    }

    static fromHSL(h, s, l) {
        return new Color(Color.hsl2rgb({h: h, s: s, l: l}));
    }

    static hsl2rgb(hsl) {
        const h = hsl.h;
        const s = hsl.s;
        const l = hsl.l;
        let r, g, b;

        if (s === 0) {
            r = g = b = l;
        } else {

            const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
            const p = 2 * l - q;
            r = this.hue2rgb(p, q, h + 1 / 3);
            g = this.hue2rgb(p, q, h);
            b = this.hue2rgb(p, q, h - 1 / 3);
        }

        return {
            r: Math.round(r * 255),
            g: Math.round(g * 255),
            b: Math.round(b * 255)
        };
    }

    static hue2rgb(p, q, t) {
        if (t < 0) t += 1;
        if (t > 1) t -= 1;
        if (t < 1 / 6) return p + (q - p) * 6 * t;
        if (t < 1 / 2) return q;
        if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
        return p;
    }
}