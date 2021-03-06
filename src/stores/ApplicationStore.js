import {ApplicationActionTypes} from "../actions/ApplicationActions";
import StoresUtils from "../pages/StoresUtils";
import {DataActionTypes} from "../actions/DataActions";
import {Utils} from "../utils/Utils";
import AbstractStore from "./AbstractStore";
import loadingStore from "./LoadingStore";
import errorsStore from "./ErrorsStore";
import EveningSelectorActions from "../pages/eveningEditing/eveningSelection/EveningSelectorActions";
import {Pages} from "../App";
import EveningEditorActions from "../pages/eveningEditing/EveningEditorActions";
import * as screenfull from "screenfull";

export const EVT_APPLICATION_STORE_CHANGED = "EVT_APPLICATION_STORE_CHANGED";

class ApplicationStore extends AbstractStore {

    constructor() {
        super("general", EVT_APPLICATION_STORE_CHANGED, loadingStore, errorsStore);
        this.isFullScreen = false;
        this.currentPage = null;
        this.floatInput = {};
        this.integerInput = {};
        this.percentInput = {};
        this.selectInput = {};
        this.textInput = {};
        this.colorInput = {};
        this.settings = null;
        this.mainPrinter = null;
        this.fiscalPrinter = null;
    }

    getActionsClass() {
        return ApplicationActionTypes;
    }

    getActionCompletedHandlers() {
        const handlers = {};

        handlers[ApplicationActionTypes.TOGGLE_FULL_SCREEN] = () => {
            this.isFullScreen = !this.isFullScreen;
            if (this.isFullScreen) {
                if (screenfull.enabled) {
                    screenfull.request();
                }
            } else {
                screenfull.exit();
            }
        };
        handlers[ApplicationActionTypes.REQUEST_FULL_SCREEN] = () => {
            this.isFullScreen = true;
            if (screenfull.enabled) {
                screenfull.request();
            }
        };
        handlers[ApplicationActionTypes.DISMISS_FULL_SCREEN] = () => {
            this.isFullScreen = false;
            screenfull.exit();
        };

        handlers[ApplicationActionTypes.GO_TO_PAGE] = (page) => this.currentPage = page;
        handlers[EveningEditorActions.DESELECT_EVENING] = () => this.currentPage = Pages.EVENING_SELECTION;

        handlers[ApplicationActionTypes.SHOW_TEXT_INPUT] = (options) => this.textInput = StoresUtils.initTextInput(options);
        handlers[ApplicationActionTypes.TEXT_INPUT_CHAR] = (char) => StoresUtils.textChar(this.textInput, char);
        handlers[ApplicationActionTypes.TEXT_INPUT_CARET] = (position) => StoresUtils.textCaret(this.textInput, position);
        handlers[ApplicationActionTypes.HIDE_TEXT_INPUT] = () => this.textInput = StoresUtils.resetTextInput();

        handlers[ApplicationActionTypes.SHOW_FLOAT_INPUT] = (options) => this.floatInput = StoresUtils.initFloatInput(options);
        handlers[ApplicationActionTypes.FLOAT_INPUT_CHAR] = (char) => StoresUtils.floatChar(this.floatInput, char);
        handlers[ApplicationActionTypes.FLOAT_INPUT_CHANGE] = (data) => StoresUtils.floatChange(this.floatInput, data);
        handlers[ApplicationActionTypes.HIDE_FLOAT_INPUT] = () => this.floatInput = StoresUtils.resetFloatInput();

        handlers[ApplicationActionTypes.SHOW_INTEGER_INPUT] = (options) => this.integerInput = StoresUtils.initIntInput(options);
        handlers[ApplicationActionTypes.INTEGER_INPUT_CHAR] = (char) => StoresUtils.intChar(this.integerInput, char);
        handlers[ApplicationActionTypes.INTEGER_INPUT_CHANGE] = (data) => StoresUtils.intChange(this.integerInput, data);
        handlers[ApplicationActionTypes.HIDE_INTEGER_INPUT] = () => this.integerInput = StoresUtils.resetIntInput();

        handlers[ApplicationActionTypes.SHOW_PERCENT_INPUT] = (options) => this.percentInput = StoresUtils.initPercentInput(options);
        handlers[ApplicationActionTypes.PERCENT_INPUT_CHAR] = (char) => StoresUtils.percentChar(this.percentInput, char);
        handlers[ApplicationActionTypes.PERCENT_INPUT_CHANGE] = (data) => StoresUtils.percentChange(this.percentInput, data);
        handlers[ApplicationActionTypes.HIDE_PERCENT_INPUT] = () => this.percentInput = StoresUtils.resetPercentInput();

        handlers[ApplicationActionTypes.SHOW_SELECT_INPUT] = (options) => this.selectInput = StoresUtils.initSelectInput(options);
        handlers[ApplicationActionTypes.SELECT_INPUT_SELECT] = (value) => StoresUtils.selectInputSelect(this.selectInput, value);
        handlers[ApplicationActionTypes.SELECT_INPUT_DESELECT] = (value) => StoresUtils.selectInputDeselect(this.selectInput, value);
        handlers[ApplicationActionTypes.SELECT_INPUT_PAGE_CHANGE] = (page) => StoresUtils.selectPageChange(this.selectInput, page);
        handlers[ApplicationActionTypes.HIDE_SELECT_INPUT] = () => StoresUtils.resetSelectInput(this.selectInput);

        handlers[ApplicationActionTypes.SHOW_COLOR_INPUT] = (options) => this.colorInput = StoresUtils.initColorInput(options);
        handlers[ApplicationActionTypes.COLOR_INPUT_SELECT] = (color) => StoresUtils.colorInputSelect(this.colorInput, color);
        handlers[ApplicationActionTypes.COLOR_INPUT_DESELECT] = (value) => StoresUtils.colorInputDeselect(this.colorInput, value);
        handlers[ApplicationActionTypes.COLOR_INPUT_PAGE_CHANGE] = (page) => StoresUtils.colorPageChange(this.colorInput, page);
        handlers[ApplicationActionTypes.HIDE_COLOR_INPUT] = () => StoresUtils.resetColorInput(this.colorInput);

        handlers[ApplicationActionTypes.LOAD_SETTINGS] = (settings) => this.storeSettings(settings);
        handlers[ApplicationActionTypes.STORE_SETTINGS] = (settings) => this.storeSettings(settings);

        handlers[DataActionTypes.LOAD_PRINTERS] = Utils.nop;

        return handlers;
    }

    storeSettings(settings) {
        this.settings = settings || {};
        if (this.settings.clientSettings) {
            this.settings.clientSettings = JSON.parse(this.settings.clientSettings);
            // UTSettings.user = this.settings.clientSettings.utUser;
        }
    }

    buildState() {
        return {
            fullScreen: this.isFullScreen,

            currentPage: this.currentPage,

            floatInput: this.floatInput,
            textInput: this.textInput,
            integerInput: this.integerInput,
            percentInput: this.percentInput,
            selectInput: this.selectInput,
            colorInput: this.colorInput,

            settings: this.settings
        };
    }

    getSettings() {
        return this.settings;
    }

}

const applicationStore = new ApplicationStore();
export default applicationStore;