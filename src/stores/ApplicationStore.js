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
        this.keyboardVisible = false;
        this.floatInput = Map();
        this.integerInput = Map();
        this.selectInput = Map();
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
            case ApplicationActionTypes.SET_KEYBOARD_VISIBLE:
                this.keyboardVisible = action.body;
                break;

            case ApplicationActionTypes.SHOW_FLOAT_INPUT:
                this.floatInput = StoresUtils.initFloatInput(action.body.value, action.body.callback, action.body.label);
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
            case ApplicationActionTypes.SELECT_INPUT_CHANGE:
                this.selectInput = StoresUtils.selectChange(this.selectInput, action.body);
                break;
            case ApplicationActionTypes.SELECT_INPUT_PAGE_CHANGE:
                this.selectInput = StoresUtils.selectPageChange(this.selectInput, action.body);
                break;
            case ApplicationActionTypes.HIDE_SELECT_INPUT:
                this.selectInput = StoresUtils.resetSelectInput(this.selectInput);
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
            integerInput: this.integerInput,
            selectInput: this.selectInput,
        };
    }

}

const applicationStore = new ApplicationStore();
export default applicationStore;