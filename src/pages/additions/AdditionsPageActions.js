import {SettingsPageActions} from "../settings/SettingsPageActions";
import {DataActions} from "../../actions/DataActions";
import dispatcher from "../../dispatcher/SimpleDispatcher";
import asyncActionBuilder from "../../actions/RequestBuilder";

export default class AdditionsPageActions {
    static BEGIN_ADDITION_CREATION = "BEGIN_ADDITION_CREATION";
    static SET_ADDITION_EDITOR_NAME = "SET_ADDITION_EDITOR_NAME";
    static SET_ADDITION_EDITOR_PRICE = "SET_ADDITION_EDITOR_PRICE";
    static SET_ADDITION_EDITOR_GENERIC = "SET_ADDITION_EDITOR_GENERIC";
    static CREATE_ADDITION = "CREATE_ADDITION";

    static SELECT_EDITING_ADDITION = "SELECT_EDITING_ADDITION";
    static UPDATE_EDITING_ADDITION = "UPDATE_EDITING_ADDITION";
    static DELETE_EDITING_ADDITION = "DELETE_EDITING_ADDITION";
    static SELECT_EDITING_ADDITION_PAGE = "SELECT_EDITING_ADDITION_PAGE";

    static initAdditionsPage() {
        DataActions.loadAdditions();
        SettingsPageActions.loadSettings();
    }

    static beginAdditionCreation() {
        dispatcher.fireEnd(this.BEGIN_ADDITION_CREATION);
    }

    static setEditorName(name) {
        dispatcher.fireEnd(this.SET_ADDITION_EDITOR_NAME, name);
    }

    static setEditorPrice(price) {
        dispatcher.fireEnd(this.SET_ADDITION_EDITOR_PRICE, price);
    }

    static setEditorGeneric(generic) {
        dispatcher.fireEnd(this.SET_ADDITION_EDITOR_GENERIC, generic);
    }

    static createAddition(addition) {
        asyncActionBuilder.post(this.CREATE_ADDITION, "additions", addition.toDto());
    }

    static deleteAddition(addition) {
        asyncActionBuilder.remove(this.DELETE_EDITING_ADDITION, "additions", addition.uuid);
    }

    static updateName(uuid, name) {
        asyncActionBuilder.put(this.UPDATE_EDITING_ADDITION, "additions/" + uuid + "/name", name);
    }

    static updatePrice(uuid, price) {
        asyncActionBuilder.put(this.UPDATE_EDITING_ADDITION, "additions/" + uuid + "/price", price);
    }

    static updateGeneric(uuid, generic) {
        asyncActionBuilder.put(this.UPDATE_EDITING_ADDITION, "additions/" + uuid + "/generic", generic.toString());
    }

    static selectAddition(addition) {
        dispatcher.fireEnd(this.SELECT_EDITING_ADDITION, addition);
    }

    static selectAdditionsPage(page) {
        dispatcher.fireEnd(this.SELECT_EDITING_ADDITION_PAGE, page);
    }
}