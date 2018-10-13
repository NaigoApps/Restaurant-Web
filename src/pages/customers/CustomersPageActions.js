import {DataActions} from "../../actions/DataActions";
import {SettingsPageActions} from "../settings/SettingsPageActions";
import dispatcher from "../../dispatcher/SimpleDispatcher";
import asyncActionBuilder from "../../actions/RequestBuilder";

export default class CustomersPageActions {

    static SELECT_EDITING_CUSTOMER = "SELECT_EDITING_CUSTOMER";
    static SELECT_CUSTOMER_NAVIGATOR_PAGE = "SELECT_CUSTOMER_NAVIGATOR_PAGE";

    static UPDATE_EDITING_CUSTOMER = "UPDATE_EDITING_CUSTOMER";
    static DELETE_EDITING_CUSTOMER = "DELETE_EDITING_CUSTOMER";

    static BEGIN_CUSTOMER_CREATION = "BEGIN_CUSTOMER_CREATION";
    static SET_CUSTOMER_EDITOR_NAME = "SET_CUSTOMER_EDITOR_NAME";
    static SET_CUSTOMER_EDITOR_SURNAME = "SET_CUSTOMER_EDITOR_SURNAME";
    static SET_CUSTOMER_EDITOR_CF = "SET_CUSTOMER_EDITOR_CF";
    static SET_CUSTOMER_EDITOR_PIVA = "SET_CUSTOMER_EDITOR_PIVA";
    static SET_CUSTOMER_EDITOR_CITY = "SET_CUSTOMER_EDITOR_CITY";
    static SET_CUSTOMER_EDITOR_DISTRICT = "SET_CUSTOMER_EDITOR_DISTRICT";
    static SET_CUSTOMER_EDITOR_CAP = "SET_CUSTOMER_EDITOR_CAP";
    static SET_CUSTOMER_EDITOR_ADDRESS = "SET_CUSTOMER_EDITOR_ADDRESS";
    static CREATE_CUSTOMER = "CREATE_CUSTOMER";

    static initCustomersPage() {
        DataActions.loadCustomers();
        SettingsPageActions.loadSettings();
    }

    static selectCustomer(customer) {
        dispatcher.fireEnd(
            this.SELECT_EDITING_CUSTOMER,
            customer
        );
    }

    static selectCustomerPage(page) {
        dispatcher.fireEnd(
            this.SELECT_CUSTOMER_NAVIGATOR_PAGE,
            page
        );
    }

    static updateName(uuid, value) {
        asyncActionBuilder.put(
            this.UPDATE_EDITING_CUSTOMER,
            'customers/' + uuid + '/name',
            value
        );
    }

    static updateSurname(uuid, value) {
        asyncActionBuilder.put(
            this.UPDATE_EDITING_CUSTOMER,
            'customers/' + uuid + '/surname',
            value
        );
    }

    static updateCf(uuid, value) {
        asyncActionBuilder.put(
            this.UPDATE_EDITING_CUSTOMER,
            'customers/' + uuid + '/cf',
            value
        );
    }

    static updatePiva(uuid, value) {
        asyncActionBuilder.put(
            this.UPDATE_EDITING_CUSTOMER,
            'customers/' + uuid + '/piva',
            value
        );
    }

    static updateCity(uuid, value) {
        asyncActionBuilder.put(
            this.UPDATE_EDITING_CUSTOMER,
            'customers/' + uuid + '/city',
            value
        );
    }

    static updateCap(uuid, value) {
        asyncActionBuilder.put(
            this.UPDATE_EDITING_CUSTOMER,
            'customers/' + uuid + '/cap',
            value
        );
    }

    static updateAddress(uuid, value) {
        asyncActionBuilder.put(
            this.UPDATE_EDITING_CUSTOMER,
            'customers/' + uuid + '/address',
            value
        );
    }

    static updateDistrict(uuid, value) {
        asyncActionBuilder.put(
            this.UPDATE_EDITING_CUSTOMER,
            'customers/' + uuid + '/district',
            value
        );
    }

    static deleteCustomer(customer) {
        asyncActionBuilder.remove(
            this.DELETE_EDITING_CUSTOMER,
            'customers',
            customer.uuid
        );
    }

    static beginCustomerCreation() {
        dispatcher.fireEnd(
            this.BEGIN_CUSTOMER_CREATION
        );
    }

    static setEditorName(value) {
        dispatcher.fireEnd(
            this.SET_CUSTOMER_EDITOR_NAME,
            value
        );
    }

    static setEditorSurname(value) {
        dispatcher.fireEnd(
            this.SET_CUSTOMER_EDITOR_SURNAME,
            value
        );
    }

    static setEditorCf(value) {
        dispatcher.fireEnd(
            this.SET_CUSTOMER_EDITOR_CF,
            value
        );
    }

    static setEditorPiva(value) {
        dispatcher.fireEnd(
            this.SET_CUSTOMER_EDITOR_PIVA,
            value
        );
    }

    static setEditorAddress(value) {
        dispatcher.fireEnd(
            this.SET_CUSTOMER_EDITOR_ADDRESS,
            value
        );
    }

    static setEditorCap(value) {
        dispatcher.fireEnd(
            this.SET_CUSTOMER_EDITOR_CAP,
            value
        );
    }

    static setEditorCity(value) {
        dispatcher.fireEnd(
            this.SET_CUSTOMER_EDITOR_CITY,
            value
        );
    }

    static setEditorDistrict(value) {
        dispatcher.fireEnd(
            this.SET_CUSTOMER_EDITOR_DISTRICT,
            value
        );
    }

    static createCustomer(customer) {
        asyncActionBuilder.post(this.CREATE_CUSTOMER,
            'customers',
            customer.toDto()
        );
    }

}