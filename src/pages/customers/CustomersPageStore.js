import AbstractStore from "../../stores/AbstractStore";
import {Utils} from "../../utils/Utils";
import {EntitiesUtils} from "../../utils/EntitiesUtils";
import {ApplicationActionTypes} from "../../actions/ApplicationActions";
import applicationStore from "../../stores/ApplicationStore";
import {DataActionTypes} from "../../actions/DataActions";
import dataStore from "../../stores/DataStore";
import Customer from "../../model/Customer";
import CustomersPageActions from "./CustomersPageActions";
import EditorMode from "../../utils/EditorMode";

const EVT_CUSTOMERS_PAGE_STORE_CHANGED = "EVT_CUSTOMERS_PAGE_STORE_CHANGED";

class CustomersPageStore extends AbstractStore {

    constructor() {
        super("customers", EVT_CUSTOMERS_PAGE_STORE_CHANGED, applicationStore, dataStore);
        this.initEditor();
        this.navigator = {
            page: 0
        };
    }

    getActionsClass() {
        return CustomersPageActions;
    }

    initEditor(customer, creating) {
        this.editor = {
            mode: null,
            customer: null
        };
        if (customer) {
            this.editor.mode = creating ? EditorMode.CREATING : EditorMode.EDITING;
            this.editor.customer = customer;
        }
    }

    getActionCompletedHandlers() {
        const handlers = {};

        handlers[CustomersPageActions.SELECT_CUSTOMER_NAVIGATOR_PAGE] = (page) => this.navigator.page = page;
        handlers[CustomersPageActions.SELECT_EDITING_CUSTOMER] = (customer) => this.initEditor(customer, false);
        handlers[CustomersPageActions.BEGIN_CUSTOMER_CREATION] = () =>
            this.initEditor(new Customer(EntitiesUtils.newCustomer(), dataStore.getPool()), true);
        handlers[CustomersPageActions.SET_CUSTOMER_EDITOR_NAME] = (name) => this.editor.customer.name = name;
        handlers[CustomersPageActions.SET_CUSTOMER_EDITOR_SURNAME] = (surname) => this.editor.customer.surname = surname;
        handlers[CustomersPageActions.SET_CUSTOMER_EDITOR_CF] = (cf) => this.editor.customer.cf = cf;
        handlers[CustomersPageActions.SET_CUSTOMER_EDITOR_PIVA] = (piva) => this.editor.customer.piva = piva;
        handlers[CustomersPageActions.SET_CUSTOMER_EDITOR_ADDRESS] = (address) => this.editor.customer.address = address;
        handlers[CustomersPageActions.SET_CUSTOMER_EDITOR_CITY] = (city) => this.editor.customer.city = city;
        handlers[CustomersPageActions.SET_CUSTOMER_EDITOR_DISTRICT] = (district) => this.editor.customer.district = district;
        handlers[CustomersPageActions.SET_CUSTOMER_EDITOR_CAP] = (cap) => this.editor.customer.cap = cap;
        handlers[CustomersPageActions.CREATE_CUSTOMER] = (customer) =>
            this.initEditor(dataStore.getEntity(customer.uuid), false);
        handlers[CustomersPageActions.UPDATE_EDITING_CUSTOMER] = (customer) =>
            this.initEditor(dataStore.getEntity(customer.uuid), false);

        handlers[CustomersPageActions.DELETE_EDITING_CUSTOMER] = () => this.initEditor();

        handlers[ApplicationActionTypes.LOAD_SETTINGS] = () => Utils.nop();
        handlers[DataActionTypes.LOAD_CUSTOMERS] = () => Utils.nop();

        return handlers;
    }

    buildState() {
        return {
            editor: this.editor,
            navigator: this.navigator,
        };
    }

}

const customersPageStore = new CustomersPageStore();
export default customersPageStore;