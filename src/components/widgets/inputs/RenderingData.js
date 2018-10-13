export default class RenderingData{
    constructor(text, color, bgColor){
        this._text = text;
        this._color = color;
        this._bgColor = bgColor;
    }


    get text() {
        return this._text;
    }

    set text(value) {
        this._text = value;
    }

    get color() {
        return this._color;
    }

    set color(value) {
        this._color = value;
    }

    get backgroundColor() {
        return this._bgColor;
    }

    set backgroundColor(value) {
        this._bgColor = value;
    }
}