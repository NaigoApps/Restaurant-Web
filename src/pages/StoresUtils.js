
import {CANC} from "../utils/Characters";

const {Map} = require('immutable');

export default class StoresUtils{

    static createSelectEditor(initialValue){
        return Map({
            value: initialValue,
            visible: false,
            page: 0
        });
    }

    static initSelectEditor(value){
        return Map({
            value: value,
            visible: true,
            page: 0
        });
    }

    static createIntEditor(initialValue){
        return Map({
            text: initialValue ? initialValue.toString() : "",
            visible: false
        });
    }

    static initIntInput(initialValue){
        return Map({
            text: initialValue ? initialValue.toString() : ""
        });
    }

    static initIntEditor(value){
        return Map({
            text: value.toString(),
            visible: true
        });
    }

    static createFloatEditor(initialValue){
        return Map({
            text: initialValue ? initialValue.toString() : "",
            visible: false
        });
    }

    static initFloatEditor(value){
        return Map({
            text: value.toString(),
            visible: true
        });
    }

    static intChar(editor, char) {
        let oldText = editor.get('text');
        if(char === CANC){
            return editor.set('text', "");
        }
        if(oldText === "0"){
            oldText = "";
        }
        let newText = oldText + char;
        if(!isNaN(parseInt(newText))){
            return editor.set('text', newText);
        }
        return editor;
    }

    static floatChar(editor, char) {
        let oldText = editor.get('text');
        if(char === CANC){
            return editor.set('text', "");
        }
        if(oldText === "0"){
            oldText = "";
        }
        let newText = oldText + char;
        if(!isNaN(parseInt(newText))){
            return editor.set('text', newText);
        }
        return editor;
    }

    static isInteger(text){
        return !isNaN(parseInt(text));
    }
}

export class EditorStatus{
    static CREATING = "CREATING";
    static EDITING = "EDITING";
    static SURFING = "SURFING";
}