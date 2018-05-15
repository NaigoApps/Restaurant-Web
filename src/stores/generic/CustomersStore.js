import {
    ACT_BEGIN_CREATE_RESTAURANT_TABLES,
    ACT_CREATE_CUSTOMER,
    ACT_DELETE_CUSTOMER,
    ACT_RETRIEVE_CUSTOMERS,
    ACT_UPDATE_CUSTOMER
} from "../../actions/ActionTypes";
import {STATUSES} from "../LazyData";
import AbstractEntityStore from "./AbstractEntityStore";
import {CustomersCreatorActionTypes} from "../../pages/customers/CustomerCreatorActions";
import {CustomersEditorActionTypes} from "../../pages/customers/CustomersEditorActions";

export const EVT_CUSTOMER_STORE_CHANGED = "EVT_CUSTOMER_STORE_CHANGED";

class CustomersStore extends AbstractEntityStore {

    constructor() {
        super(EVT_CUSTOMER_STORE_CHANGED);
    }

    getCustomers() {
        return this.getData();
    }

    comparator(c1, c2){
        let cmp = c1.get('surname').toLowerCase().localeCompare(c2.get('surname').toLowerCase());
        if(cmp === 0){
            return c1.get('name').toLowerCase().localeCompare(c2.get('name').toLowerCase());
        }
        return cmp;
    }

    handleStartedAction(action){
        let changed = true;
        switch (action.type){
            case ACT_RETRIEVE_CUSTOMERS:
                this.setStatus(STATUSES.LOADING);
                break;
            default:
                changed = false;
                break;
        }
        return changed;
    }

    handleCompletedAction(action) {
        let changed = true;
        switch (action.type) {
            case CustomersCreatorActionTypes.CREATE_CUSTOMER:
                this.createData(action.body);
                break;
            case ACT_RETRIEVE_CUSTOMERS:
                this.setData(action.body);
                this.setStatus(STATUSES.LOADED);
                break;
            case CustomersEditorActionTypes.UPDATE_EDITING_CUSTOMER:
                this.updateData(action.body);
                break;
            case CustomersEditorActionTypes.DELETE_EDITING_CUSTOMER:
                this.deleteData(action.body);
                break;
            default:
                changed = false;
                break;
        }
        return changed;
    }

}

const customersStore = new CustomersStore();
export default customersStore;