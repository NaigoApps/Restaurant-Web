import dispatcher from "../dispatcher/SimpleDispatcher";

export const ApplicationActionTypes = {
    DISMISS_FULL_SCREEN: "DISMISS_FULL_SCREEN",
    TOGGLE_FULL_SCREEN: "TOGGLE_FULL_SCREEN",
    REQUEST_FULL_SCREEN: "REQUEST_FULL_SCREEN",

    GO_TO_PAGE: "GO_TO_PAGE",

    SET_KEYBOARD_VISIBLE: "SET_KEYBOARD_VISIBLE",

    SHOW_FLOAT_INPUT: "SHOW_FLOAT_INPUT",
    FLOAT_INPUT_CHAR: "FLOAT_INPUT_CHAR",
    FLOAT_INPUT_CHANGE: "FLOAT_INPUT_CHANGE",
    HIDE_FLOAT_INPUT: "HIDE_FLOAT_INPUT",

    SHOW_INTEGER_INPUT: "SHOW_INTEGER_INPUT",
    INTEGER_INPUT_CHAR: "INTEGER_INPUT_CHAR",
    INTEGER_INPUT_CHANGE: "INTEGER_INPUT_CHANGE",
    HIDE_INTEGER_INPUT: "HIDE_INTEGER_INPUT",

    SHOW_SELECT_INPUT: "SHOW_SELECT_INPUT",
    SELECT_INPUT_CHANGE: "SELECT_INPUT_CHANGE",
    SELECT_INPUT_PAGE_CHANGE: "SELECT_INPUT_PAGE_CHANGE",
    HIDE_SELECT_INPUT: "HIDE_SELECT_INPUT",
};

export const ApplicationActions = {

    toggleFullScreen: () => dispatcher.fireEnd(ApplicationActionTypes.TOGGLE_FULL_SCREEN),
    requestFullScreen: () => dispatcher.fireEnd(ApplicationActionTypes.REQUEST_FULL_SCREEN),
    dismissFullScreen: () => dispatcher.fireEnd(ApplicationActionTypes.DISMISS_FULL_SCREEN),

    goToPage: (page) => dispatcher.fireEnd(ApplicationActionTypes.GO_TO_PAGE, page),

    setKeyboardVisible: (visible) => dispatcher.fireEnd(ApplicationActionTypes.SET_KEYBOARD_VISIBLE, visible),

    showFloatInput: (value, callback, label) => dispatcher.fireEnd(ApplicationActionTypes.SHOW_FLOAT_INPUT, {
        value: value,
        callback: callback,
        label: label
    }),
    hideFloatInput: () => dispatcher.fireEnd(ApplicationActionTypes.HIDE_FLOAT_INPUT),
    floatInputChar: (char) => dispatcher.fireEnd(ApplicationActionTypes.FLOAT_INPUT_CHAR, char),
    floatInputChange: (text) => dispatcher.fireEnd(ApplicationActionTypes.FLOAT_INPUT_CHANGE, text),

    showIntegerInput: (options) => dispatcher.fireEnd(ApplicationActionTypes.SHOW_INTEGER_INPUT, options),
    hideIntegerInput: () => dispatcher.fireEnd(ApplicationActionTypes.HIDE_INTEGER_INPUT),
    integerInputChar: (char) => dispatcher.fireEnd(ApplicationActionTypes.INTEGER_INPUT_CHAR, char),
    integerInputChange: (text) => dispatcher.fireEnd(ApplicationActionTypes.INTEGER_INPUT_CHANGE, text),

    showSelectInput: (options) => dispatcher.fireEnd(ApplicationActionTypes.SHOW_SELECT_INPUT, options),
    hideSelectInput: () => dispatcher.fireEnd(ApplicationActionTypes.HIDE_SELECT_INPUT),
    selectInputChange: (value) => dispatcher.fireEnd(ApplicationActionTypes.SELECT_INPUT_CHANGE, value),
    selectInputPageChange: (value) => dispatcher.fireEnd(ApplicationActionTypes.SELECT_INPUT_PAGE_CHANGE, value),
};