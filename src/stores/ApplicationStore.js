import AbstractStore from "./RootFeatureStore";
import {ApplicationActionTypes} from "../actions/ApplicationActions";
import StoresUtils from "../pages/StoresUtils";

const {Map} = require('immutable');

export const EVT_APPLICATION_STORE_CHANGED = "EVT_APPLICATION_STORE_CHANGED";

class ApplicationStore extends AbstractStore {

    constructor() {
        super(EVT_APPLICATION_STORE_CHANGED);
        this.isFullScreen = false;
        this.currentPage = null;
        this.floatInput = Map();
        this.integerInput = Map();
        this.selectInput = Map();
        this.textInput = Map();
        this.settings = Map();
    }

    handleCompletedAction(action) {
        let changed = true;
        switch (action.type) {
            case ApplicationActionTypes.TOGGLE_FULL_SCREEN:
                this.isFullScreen = !this.isFullScreen;
                break;
            case ApplicationActionTypes.REQUEST_FULL_SCREEN:
                this.isFullScreen = true;
                break;
            case ApplicationActionTypes.DISMISS_FULL_SCREEN:
                this.isFullScreen = false;
                break;
            case ApplicationActionTypes.GO_TO_PAGE:
                this.currentPage = action.body;
                break;

            case ApplicationActionTypes.SHOW_TEXT_INPUT:
                this.textInput = StoresUtils.initTextInput(action.body);
                break;
            case ApplicationActionTypes.TEXT_INPUT_CHAR:
                this.textInput = StoresUtils.textChar(this.textInput, action.body);
                break;
            case ApplicationActionTypes.TEXT_INPUT_CARET:
                this.textInput = StoresUtils.textCaret(this.textInput, action.body);
                break;
            case ApplicationActionTypes.HIDE_TEXT_INPUT:
                this.textInput = StoresUtils.resetTextInput();
                break;

            case ApplicationActionTypes.SHOW_FLOAT_INPUT:
                this.floatInput = StoresUtils.initFloatInput(action.body);
                break;
            case ApplicationActionTypes.FLOAT_INPUT_CHAR:
                this.floatInput = StoresUtils.floatChar(this.floatInput, action.body);
                break;
            case ApplicationActionTypes.FLOAT_INPUT_CHANGE:
                this.floatInput = StoresUtils.floatChange(this.floatInput, action.body);
                break;
            case ApplicationActionTypes.HIDE_FLOAT_INPUT:
                this.floatInput = StoresUtils.resetFloatInput();
                break;

            case ApplicationActionTypes.SHOW_INTEGER_INPUT:
                this.integerInput = StoresUtils.initIntInput(action.body);
                break;
            case ApplicationActionTypes.INTEGER_INPUT_CHAR:
                this.integerInput = StoresUtils.intChar(this.integerInput, action.body);
                break;
            case ApplicationActionTypes.INTEGER_INPUT_CHANGE:
                this.integerInput = StoresUtils.intChange(this.integerInput, action.body);
                break;
            case ApplicationActionTypes.HIDE_INTEGER_INPUT:
                this.integerInput = StoresUtils.resetIntInput();
                break;
            case ApplicationActionTypes.SHOW_SELECT_INPUT:
                this.selectInput = StoresUtils.initSelectInput(action.body);
                break;
            case ApplicationActionTypes.SELECT_INPUT_SELECT:
                this.selectInput = StoresUtils.selectInputSelect(this.selectInput, action.body);
                break;
            case ApplicationActionTypes.SELECT_INPUT_DESELECT:
                this.selectInput = StoresUtils.selectInputDeselect(this.selectInput, action.body);
                break;
            case ApplicationActionTypes.SELECT_INPUT_PAGE_CHANGE:
                this.selectInput = StoresUtils.selectPageChange(this.selectInput, action.body);
                break;
            case ApplicationActionTypes.HIDE_SELECT_INPUT:
                this.selectInput = StoresUtils.resetSelectInput(this.selectInput);
                break;

            case ApplicationActionTypes.LOAD_SETTINGS:
            case ApplicationActionTypes.STORE_SETTINGS:
                this.settings = action.body || Map();
                break;

            default:
                changed = false;
                break;
        }
        return changed;
    }

    getState(){
        return {
            fullScreen: this.isFullScreen,
            currentPage: this.currentPage,
            keyboardVisible: this.keyboardVisible,
            floatInput: this.floatInput,
            textInput: this.textInput,
            integerInput: this.integerInput,
            selectInput: this.selectInput,
            settings: this.settings
        };
    }

    getSettings(){
        return this.settings;
    }

}

const applicationStore = new ApplicationStore();
export default applicationStore;