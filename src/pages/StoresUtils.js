import {CANC} from "../utils/Characters";
import {BACKSPACE, LEFT, RIGHT} from "../components/widgets/inputs/Keyboard";
import {iGet, Utils} from "../utils/Utils";

const {Map, List} = require('immutable');

export default class StoresUtils {

    /*
    SELECT INPUT
     */

    static ALL_ACTIONS = "ALL_ACTIONS";

    static initSelectInput(options) {
        return {
            values: options.values,
            id: options.id,
            renderer: options.renderer,
            label: options.label,
            color: options.color,
            colorRenderer: options.colorRenderer,
            rows: options.rows,
            cols: options.cols,
            value: options.value,
            visible: true,
            isValid: options.isValid,
            page: 0,
            multiSelect: options.multiSelect,
            callback: options.callback
        };
    }

    static selectInputSelect(editor, value) {
        if (!editor.multiSelect) {
            editor.value = value;
        } else {
            editor.value.push(value);
        }
    }

    static selectInputDeselect(editor, value) {
        if (!editor.multiSelect) {
            editor.value = null;
        } else {
            let index = editor.value.indexOf(value);
            editor.value.splice(index, 1);
        }
    }

    static selectPageChange(editor, page) {
        return editor.page = page;
    }

    static resetSelectInput(editor) {
        editor.visible = false;
    }

    /*

    COLOR INPUT

     */

    static initColorInput(options) {
        return {
            values: options.values,
            label: options.label,
            rows: options.rows,
            cols: options.cols,
            value: options.value,
            visible: true,
            isValid: options.isValid,
            page: 0,
            callback: options.callback
        };
    }

    static colorInputSelect(editor, value) {
        editor.value = value;
    }

    static colorInputDeselect(editor, value) {
        editor.value = null;
    }

    static colorPageChange(editor, page) {
        editor.page = page;
    }

    static resetColorInput(editor) {
        editor.visible = false;
    }

    /*
    INTEGER INPUT
     */

    static initIntInput(options) {
        return {
            visible: true,
            label: options.label,
            text: options.value ? options.value.toString() : "",
            value: options.value,
            callback: options.callback,
            min: options.min,
            max: options.max,
            hit: false
        };
    }

    static intChar(editor, char) {
        let oldText = editor.text;
        if (char === CANC) {
            editor.text = "0";
            editor.value = 0;
            return;
        }
        if (oldText === "0" || !editor.hit) {
            oldText = "";
        }
        editor.hit = true;
        let newText = oldText + char;
        if (!isNaN(parseInt(newText))) {
            editor.text = newText;
            editor.value = parseInt(newText);
        }
    }

    static intChange(editor, text) {
        if (!isNaN(parseInt(text))) {
            editor.text = text;
            editor.hit = true;
            editor.value = parseInt(text);
        }
    }

    static resetIntInput() {
        return {
            visible: false,
            label: "",
            text: "",
            value: 0,
            callback: Utils.nop
        };
    }

    /*
    FLOAT INPUT
     */

    static initFloatInput(options) {
        return {
            visible: true,
            label: options.label,
            text: options.value ? options.value.toString() : "",
            value: options.value,
            callback: options.callback,
            min: options.min,
            max: options.max,
            hit: false
        };
    }

    static floatChar(editor, char) {
        let oldText = editor.text
        if (char === CANC) {
            editor.text = "";
            return;
        }
        if (oldText === "0" || !editor.hit) {
            oldText = "";
        }
        let newText = oldText + char;
        editor.hit = true;
        if (!isNaN(parseFloat(newText))) {
            editor.text = newText;
            editor.value = parseFloat(newText);
        }
    }

    static floatChange(editor, text) {
        if (!isNaN(parseFloat(text))) {
            editor.text = text;
            editor.hit = true;
            editor.value = parseFloat(text);
        }
    }

    static resetFloatInput() {
        return {
            visible: false,
            label: "",
            text: "",
            value: 0,
            callback: Utils.nop
        };
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
        return {
            visible: true,
            label: options.label,
            value: options.value || "",
            caret: options.value ? options.value.length : 0,
            callback: options.callback,
            checker: options.checker
        };
    }

    static textChar(editor, char) {
        let oldText = editor.value;
        let caret = editor.caret;
        switch (char.toUpperCase()) {
            case BACKSPACE:
                if (oldText.length > 0 && caret > 0) {
                    editor.value = oldText.slice(0, caret - 1) + oldText.slice(caret, oldText.length);
                    editor.caret--;
                }
                break;
            case LEFT:
                if (caret > 0) {
                    editor.caret--;
                }
                break;
            case RIGHT:
                if (caret < oldText.length) {
                    editor.caret++;
                }
                break;
            default:
                if (char.length === 1) {
                    editor.value = oldText.slice(0, caret) + char + oldText.slice(caret, oldText.length);
                    editor.caret++;
                }
                break;
        }
    }

    static textCaret(editor, position) {
        editor.caret = position;
    }

    static resetTextInput() {
        return {
            visible: false,
            label: "",
            value: "",
            callback: Utils.nop
        };
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

    static option(data, optionName, def) {
        if (data.settings) {
            return data.settings.clientSettings[optionName] || def;
        }
        return def;
    }

    static settings(data, prop, def) {
        if (data.get('settings')) {
            return iGet(data, "settings.clientSettings." + prop) || def;
        }
        return def;
    }
}