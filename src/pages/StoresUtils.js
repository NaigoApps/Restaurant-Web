import {CANC} from "../utils/Characters";
import {BACKSPACE, LEFT, RIGHT} from "../components/widgets/inputs/Keyboard";

const {Map, List} = require('immutable');

export default class StoresUtils {

    /*
    SELECT INPUT
     */

    static initSelectInput(options) {
        return Map({
            values: options.values,
            id: options.id,
            renderer: options.renderer,
            colorRenderer: options.colorRenderer,
            rows: options.rows,
            cols: options.cols,
            value: options.value,
            visible: true,
            page: 0,
            callback: options.callback
        });
    }

    static selectChange(editor, value){
        return editor.set('value', value);
    }

    static selectPageChange(editor, page){
        return editor.set('page', page);
    }

    static resetSelectInput(editor){
        return editor.set('visible', false);
    }

    /*
    INTEGER INPUT
     */

    static initIntInput(options) {
        return Map({
            visible: true,
            label: options.label,
            text: options.value ? options.value.toString() : "",
            value: options.value,
            callback: options.callback,
            min: options.min,
            max: options.max
        });
    }

    static intChar(editor, char) {
        let oldText = editor.get('text');
        if (char === CANC) {
            editor = editor.set('text', "0");
            return editor.set('value', 0);
        }
        if (oldText === "0") {
            oldText = "";
        }
        let newText = oldText + char;
        if (!isNaN(parseInt(newText))) {
            editor = editor.set('text', newText);
            return editor.set('value', parseInt(newText));
        }
        return editor;
    }

    static intChange(editor, text) {
        if (!isNaN(parseInt(text))) {
            editor = editor.set('text', text);
            return editor.set('value', parseInt(text));
        }
        return editor;
    }

    static resetIntInput() {
        return Map({
            visible: false,
            label: "",
            text: "",
            value: 0,
            callback: () => {}
        });
    }

    /*
    FLOAT INPUT
     */

    static initFloatInput(initialValue, callback, label) {
        return Map({
            visible: true,
            label: label,
            text: initialValue ? initialValue.toString() : "",
            value: initialValue,
            callback: callback
        });
    }

    static floatChar(editor, char) {
        let oldText = editor.get('text');
        if (char === CANC) {
            return editor.set('text', "");
        }
        if (oldText === "0") {
            oldText = "";
        }
        let newText = oldText + char;
        if (!isNaN(parseFloat(newText))) {
            editor = editor.set('text', newText);
            return editor.set('value', parseFloat(newText));
        }
        return editor;
    }

    static floatChange(editor, text) {
        if (!isNaN(parseFloat(text))) {
            editor = editor.set('text', text);
            return editor.set('value', parseFloat(text));
        }
        return editor;
    }

    static resetFloatInput() {
        return Map({
            visible: false,
            label: "",
            text: "",
            value: 0,
            callback: () => {}
        });
    }

    /*
    PERCENT INPUT
     */

    //TODO

    static initPercentInput(initialValue) {
        return Map({
            text: initialValue ? initialValue.toString() : "",
            value: initialValue
        });
    }

    static percentChar(editor, char) {
        let oldText = editor.get('text');
        if (char === CANC) {
            return editor.set('text', "");
        }
        if (oldText === "0") {
            oldText = "";
        }
        let newText = oldText + char;
        let newValue = parseInt(newText);
        if (!isNaN(newValue) && newValue >= 0 && newValue <= 100) {
            editor = editor.set('text', newText);
            return editor.set('value', newValue);
        }
        return editor;
    }

    static initTextInput(initialValue) {
        initialValue = initialValue || "";
        return Map({
            text: initialValue ? initialValue : "",
            caret: initialValue.length
        });
    }

    static textChar(editor, char) {
        let oldText = editor.get('text');
        let caret = editor.get('caret');
        switch (char.toUpperCase()) {
            case BACKSPACE:
                if (oldText.length > 0 && caret > 0) {
                    editor = editor.set('text', oldText.slice(0, caret - 1) + oldText.slice(caret, oldText.length));
                    editor = editor.set('caret', editor.get('caret') - 1);
                }
                break;
            case LEFT:
                if (caret > 0) {
                    editor = editor.set('caret', caret - 1);
                }
                break;
            case RIGHT:
                if (caret < oldText.length) {
                    editor = editor.set('caret', caret + 1);
                }
                break;
            default:
                editor = editor.set('text', oldText.slice(0, caret) + char + oldText.slice(caret, oldText.length));
                editor = editor.set('caret', caret + 1);
                break;
        }
        return editor;
    }

    static isInteger(text) {
        return !isNaN(parseInt(text));
    }

    static isPercent(text) {
        return this.isInteger(text) && parseInt(text) >= 0 && parseInt(text) <= 100;
    }

    static isFloat(text) {
        return !isNaN(parseFloat(text));
    }

}

export class EditorStatus {
    static CREATING = "CREATING";
    static EDITING = "EDITING";
    static SURFING = "SURFING";
}