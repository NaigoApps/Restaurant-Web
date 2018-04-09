import AbstractStore from "../../stores/RootFeatureStore";
import dispatcher from "../../dispatcher/SimpleDispatcher";
import {
    ACT_CREATE_CUSTOMER,
    ACT_DELETE_CUSTOMER,
    ACT_DESELECT_CUSTOMER,
    ACT_RETRIEVE_CUSTOMERS,
    ACT_SELECT_CUSTOMER,
    ACT_UPDATE_CUSTOMER
} from "../../actions/ActionTypes";
import customersStore from "../../stores/generic/CustomersStore";

const {fromJS, Map} = require('immutable');

const EVT_CUSTOMERS_PAGE_STORE_CHANGED = "EVT_CUSTOMERS_PAGE_STORE_CHANGED";

class CustomersPageStore extends AbstractStore {

    constructor() {
        super(EVT_CUSTOMERS_PAGE_STORE_CHANGED);
    }

    handleCompletedAction(action) {
        let changed = true;
        dispatcher.waitFor([customersStore.getToken()]);
        switch (action.type) {
            case ACT_RETRIEVE_CUSTOMERS:
                break;
            case ACT_CREATE_CUSTOMER:
                this.selectedTable = action.body.get('uuid');
                this.inCreationTable = null;
                break;
            case ACT_UPDATE_CUSTOMER:
                this.selectedTable = action.body.get('uuid');
                break;
            case ACT_DELETE_CUSTOMER:
                this.selectedTable = null;
                break;
            case ACT_SELECT_CUSTOMER:
                this.selectedTable = action.body;
                this.inCreationTable = null;
                break;
            case ACT_DESELECT_CUSTOMER:
                this.selectedTable = null;
                this.inCreationTable = null;
                break;
            default:
                changed = false;
                break;
        }
        return changed;
    }

    buildTable() {
        return Map({
            name: ""
        });
    }

    getState() {
        //FIXME
        let customers = customersStore.getCustomers().getPayload();
        let customer = null;
        // if (entityEditorStore.isEditing(CUSTOMER_TYPE)) {
        //     customer = findByUuid(customers, entityEditorStore.find(CUSTOMER_TYPE));
        // } else if (entityEditorStore.isCreating(CUSTOMER_TYPE)) {
        //     customer = entityEditorStore.find(CUSTOMER_TYPE);
        // }
        let result = Map({
            editingCustomer: customer,
            customers: customers,
        });
        return {
            data: result
        }
    }

}

const customersPageStore = new CustomersPageStore();
export default customersPageStore;