import dispatcher from "../dispatcher/SimpleDispatcher";
import asyncActionBuilder from "./RequestBuilder";
import Color from "../utils/Color";

export const ApplicationActionTypes = {
    DISMISS_FULL_SCREEN: "DISMISS_FULL_SCREEN",
    TOGGLE_FULL_SCREEN: "TOGGLE_FULL_SCREEN",
    REQUEST_FULL_SCREEN: "REQUEST_FULL_SCREEN",

    LOAD_SETTINGS: "LOAD_SETTINGS",
    STORE_SETTINGS: "STORE_SETTINGS",

    GO_TO_PAGE: "GO_TO_PAGE",

    SHOW_TEXT_INPUT: "SHOW_TEXT_INPUT",
    TEXT_INPUT_CHAR: "TEXT_INPUT_CHAR",
    TEXT_INPUT_CARET: "TEXT_INPUT_CARET",
    TEXT_INPUT_CHANGE: "TEXT_INPUT_CHANGE",
    HIDE_TEXT_INPUT: "HIDE_TEXT_INPUT",

    SHOW_FLOAT_INPUT: "SHOW_FLOAT_INPUT",
    FLOAT_INPUT_CHAR: "FLOAT_INPUT_CHAR",
    FLOAT_INPUT_CHANGE: "FLOAT_INPUT_CHANGE",
    HIDE_FLOAT_INPUT: "HIDE_FLOAT_INPUT",

    SHOW_INTEGER_INPUT: "SHOW_INTEGER_INPUT",
    INTEGER_INPUT_CHAR: "INTEGER_INPUT_CHAR",
    INTEGER_INPUT_CHANGE: "INTEGER_INPUT_CHANGE",
    HIDE_INTEGER_INPUT: "HIDE_INTEGER_INPUT",

    SHOW_PERCENT_INPUT: "SHOW_PERCENT_INPUT",
    PERCENT_INPUT_CHAR: "PERCENT_INPUT_CHAR",
    PERCENT_INPUT_CHANGE: "PERCENT_INPUT_CHANGE",
    HIDE_PERCENT_INPUT: "HIDE_PERCENT_INPUT",

    SHOW_SELECT_INPUT: "SHOW_SELECT_INPUT",
    SELECT_INPUT_SELECT: "SELECT_INPUT_SELECT",
    SELECT_INPUT_DESELECT: "SELECT_INPUT_DESELECT",
    SELECT_INPUT_PAGE_CHANGE: "SELECT_INPUT_PAGE_CHANGE",
    HIDE_SELECT_INPUT: "HIDE_SELECT_INPUT",

    SHOW_COLOR_INPUT: "SHOW_COLOR_INPUT",
    COLOR_INPUT_SELECT: "COLOR_INPUT_SELECT",
    COLOR_INPUT_DESELECT: "COLOR_INPUT_DESELECT",
    COLOR_INPUT_PAGE_CHANGE: "COLOR_INPUT_PAGE_CHANGE",
    HIDE_COLOR_INPUT: "HIDE_COLOR_INPUT"
};

export class ApplicationActions {

    static loadSettings = () => asyncActionBuilder.get(ApplicationActionTypes.LOAD_SETTINGS, "settings");

    static storeClientSettings = (value) => asyncActionBuilder.put(ApplicationActionTypes.STORE_SETTINGS, "settings/client", JSON.stringify(value));

    static setMainPrinter = printer => asyncActionBuilder.put(ApplicationActionTypes.STORE_SETTINGS, "settings/main-printer", printer);
    static setFiscalPrinter = printer => asyncActionBuilder.put(ApplicationActionTypes.STORE_SETTINGS, "settings/fiscal-printer", printer);

    static setUseCoverCharges = value => asyncActionBuilder.put(ApplicationActionTypes.STORE_SETTINGS, "settings/cover-charges", value);
    static setShrinkOrdinations = value => asyncActionBuilder.put(ApplicationActionTypes.STORE_SETTINGS, "settings/shrink-ordination", value);

    static toggleFullScreen = () => dispatcher.fireEnd(ApplicationActionTypes.TOGGLE_FULL_SCREEN);
    static requestFullScreen = () => dispatcher.fireEnd(ApplicationActionTypes.REQUEST_FULL_SCREEN);
    static dismissFullScreen = () => dispatcher.fireEnd(ApplicationActionTypes.DISMISS_FULL_SCREEN);

    static goToPage = (page) => dispatcher.fireEnd(ApplicationActionTypes.GO_TO_PAGE, page);

    static showTextInput = (options) => dispatcher.fireEnd(ApplicationActionTypes.SHOW_TEXT_INPUT, options);
    static hideTextInput = () => dispatcher.fireEnd(ApplicationActionTypes.HIDE_TEXT_INPUT);
    static textInputChar = (char) => dispatcher.fireEnd(ApplicationActionTypes.TEXT_INPUT_CHAR, char);
    static textInputCaret = (pos) => dispatcher.fireEnd(ApplicationActionTypes.TEXT_INPUT_CARET, pos);

    static showFloatInput = (options) => dispatcher.fireEnd(ApplicationActionTypes.SHOW_FLOAT_INPUT, options);
    static hideFloatInput = () => dispatcher.fireEnd(ApplicationActionTypes.HIDE_FLOAT_INPUT);
    static floatInputChar = (char) => dispatcher.fireEnd(ApplicationActionTypes.FLOAT_INPUT_CHAR, char);
    static floatInputChange = (text) => dispatcher.fireEnd(ApplicationActionTypes.FLOAT_INPUT_CHANGE, text);

    static showIntegerInput = (options) => dispatcher.fireEnd(ApplicationActionTypes.SHOW_INTEGER_INPUT, options);
    static hideIntegerInput = () => dispatcher.fireEnd(ApplicationActionTypes.HIDE_INTEGER_INPUT);
    static integerInputChar = (char) => dispatcher.fireEnd(ApplicationActionTypes.INTEGER_INPUT_CHAR, char);
    static integerInputChange = (text) => dispatcher.fireEnd(ApplicationActionTypes.INTEGER_INPUT_CHANGE, text);

    static showPercentInput = (options) => dispatcher.fireEnd(ApplicationActionTypes.SHOW_PERCENT_INPUT, options);
    static hidePercentInput = () => dispatcher.fireEnd(ApplicationActionTypes.HIDE_PERCENT_INPUT);
    static percentInputChar = (char) => dispatcher.fireEnd(ApplicationActionTypes.PERCENT_INPUT_CHAR, char);
    static percentInputChange = (text) => dispatcher.fireEnd(ApplicationActionTypes.PERCENT_INPUT_CHANGE, text);

    static showSelectInput = (options) => dispatcher.fireEnd(ApplicationActionTypes.SHOW_SELECT_INPUT, options);
    static hideSelectInput = () => dispatcher.fireEnd(ApplicationActionTypes.HIDE_SELECT_INPUT);
    static selectInputSelect = (value) => dispatcher.fireEnd(ApplicationActionTypes.SELECT_INPUT_SELECT, value);
    static selectInputDeselect = (value) => dispatcher.fireEnd(ApplicationActionTypes.SELECT_INPUT_DESELECT, value);
    static selectInputPageChange = (value) => dispatcher.fireEnd(ApplicationActionTypes.SELECT_INPUT_PAGE_CHANGE, value);

    static showColorInput = (options) => dispatcher.fireEnd(ApplicationActionTypes.SHOW_COLOR_INPUT, options);
    static hideColorInput = () => dispatcher.fireEnd(ApplicationActionTypes.HIDE_COLOR_INPUT);
    static colorInputSelect = (h, s, l) => dispatcher.fireEnd(ApplicationActionTypes.COLOR_INPUT_SELECT, Color.fromHSL(h, s, l));
    static colorInputDeselect = (value) => dispatcher.fireEnd(ApplicationActionTypes.COLOR_INPUT_DESELECT, value);
    static colorInputPageChange = (value) => dispatcher.fireEnd(ApplicationActionTypes.COLOR_INPUT_PAGE_CHANGE, value);
}