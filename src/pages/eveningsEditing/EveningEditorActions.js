import asyncActionBuilder from '../../actions/RequestBuilder';
import dispatcher from "../../dispatcher/SimpleDispatcher";

const {fromJS, Map} = require('immutable');

export const ACT_UPDATE_EVENING = "ACT_UPDATE_EVENING";

export const EveningEditingActionTypes = {
    GET_SELECTED: "GET_SELECTED",
    DESELECT: "DESELECT",
    CONFIRM_COVER_CHARGE_EDITING: "CONFIRM_COVER_CHARGE_EDITING",
};

export const EveningEditorActions = {

    getSelectedEvening: () => asyncActionBuilder.get(
        EveningEditingActionTypes.GET_SELECTED,
        "evenings/selected"),

    deselectEvening: () => dispatcher.fireEnd(EveningEditingActionTypes.DESELECT),

    //COVER CHARGE EDITING
    confirmCoverCharge: (uuid, value) => asyncActionBuilder.put(
        EveningEditingActionTypes.CONFIRM_COVER_CHARGE_EDITING,
        'evenings/' + uuid + "/coverCharge",
        value
    ),

};