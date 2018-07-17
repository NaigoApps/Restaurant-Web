import {CANC} from "../utils/Characters";
import {BACKSPACE, LEFT, RIGHT} from "../components/widgets/inputs/Keyboard";
import {iGet} from "../utils/Utils";

const {Map, List} = require('immutable');

export default class StoresUtils {

    /*
    SELECT INPUT
     */

    static ALL_ACTIONS = "ALL_ACTIONS";

    static initSelectInput(options) {
        return Map({
            values: options.values,
            id: options.id,
            renderer: options.renderer,
            label: options.label,
            colorRenderer: options.colorRenderer,
            rows: options.rows,
            cols: options.cols,
            value: options.value,
            visible: true,
            isValid: options.isValid,
            page: 0,
            multiSelect: options.multiSelect,
            callback: options.callback
        });
    }

    static selectInputSelect(editor, value) {
        if (!editor.get('multiSelect')) {
            return editor.set('value', value);
        }
        return editor.set('value', editor.get('value').push(value));
    }

    static selectInputDeselect(editor, value) {
        if (!editor.get('multiSelect')) {
            return editor.set('value', null);
        }
        let index = editor.get('value').indexOf(value);
        return editor.set('value', editor.get('value').splice(index, 1));
    }

    static selectPageChange(editor, page) {
        return editor.set('page', page);
    }

    static resetSelectInput(editor) {
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
            max: options.max,
            hit: false
        });
    }

    static intChar(editor, char) {
        let oldText = editor.get('text');
        if (char === CANC) {
            editor = editor.set('text', "0");
            return editor.set('value', 0);
        }
        if (oldText === "0" || !editor.get('hit')) {
            oldText = "";
        }
        editor = editor.set('hit', true);
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
            editor = editor.set('hit', true);
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
            callback: () => {
            }
        });
    }

    /*
    FLOAT INPUT
     */

    static initFloatInput(options) {
        return Map({
            visible: true,
            label: options.label,
            text: options.value ? options.value.toString() : "",
            value: options.value,
            callback: options.callback,
            min: options.min,
            max: options.max,
            hit: false
        });
    }

    static floatChar(editor, char) {
        let oldText = editor.get('text');
        if (char === CANC) {
            return editor.set('text', "");
        }
        if (oldText === "0" || !editor.get('hit')) {
            oldText = "";
        }
        let newText = oldText + char;
        editor = editor.set('hit', true);
        if (!isNaN(parseFloat(newText))) {
            editor = editor.set('text', newText);
            return editor.set('value', parseFloat(newText));
        }
        return editor;
    }

    static floatChange(editor, text) {
        if (!isNaN(parseFloat(text))) {
            editor = editor.set('text', text);
            editor = editor.set('hit', true);
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
            callback: () => {
            }
        });
    }

    /*
    PERCENT INPUT
     */

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

    static initTextInput(options) {
        return Map({
            visible: true,
            label: options.label,
            value: options.value || "",
            caret: options.value ? options.value.length : 0,
            callback: options.callback,
            checker: options.checker
        });
    }

    static textChar(editor, char) {
        let oldText = editor.get('value');
        let caret = editor.get('caret');
        switch (char.toUpperCase()) {
            case BACKSPACE:
                if (oldText.length > 0 && caret > 0) {
                    editor = editor.set('value', oldText.slice(0, caret - 1) + oldText.slice(caret, oldText.length));
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
                if(char.length === 1) {
                    editor = editor.set('value', oldText.slice(0, caret) + char + oldText.slice(caret, oldText.length));
                    editor = editor.set('caret', caret + 1);
                }
                break;
        }
        return editor;
    }

    static textCaret(editor, position) {
        return editor.set('caret', position);
    }

    static resetTextInput() {
        return Map({
            visible: false,
            label: "",
            value: "",
            callback: () => {
            }
        });
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

    static settings(data, prop, def){
        if(data.get('settings')) {
            return iGet(data, "settings.clientSettings." + prop) || def;
        }
        return def;
    }
}

export class EditorStatus {
    static CREATING = "CREATING";
    static EDITING = "EDITING";
    static SURFING = "SURFING";
}