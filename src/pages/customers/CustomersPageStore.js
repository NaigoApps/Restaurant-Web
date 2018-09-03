import AbstractStore from "../../stores/RootFeatureStore";
import dispatcher from "../../dispatcher/SimpleDispatcher";
import customersStore from "../../stores/generic/CustomersStore";
import {CustomersCreatorActionTypes} from "./CustomerCreatorActions";
import EditorMode from "../../utils/EditorMode";
import {CustomersEditorActionTypes} from "./CustomersEditorActions";
import {findByUuid} from "../../utils/Utils";
import {EntitiesUtils} from "../../utils/EntitiesUtils";
import {ApplicationActionTypes} from "../../actions/ApplicationActions";
import applicationStore from "../../stores/ApplicationStore";
import {DataActionTypes} from "../../actions/DataActions";

const {fromJS, Map} = require('immutable');

const EVT_CUSTOMERS_PAGE_STORE_CHANGED = "EVT_CUSTOMERS_PAGE_STORE_CHANGED";

class CustomersPageStore extends AbstractStore {

    constructor() {
        super(EVT_CUSTOMERS_PAGE_STORE_CHANGED);
        this.page = 0;
        this.customer = null;
        this.editorStatus = EditorMode.SURFING;
    }

    handleCompletedAction(action) {
        let changed = true;
        dispatcher.waitFor([customersStore.getToken(), applicationStore.getToken()]);
        switch (action.type) {
            case ApplicationActionTypes.LOAD_SETTINGS:
            case ApplicationActionTypes.STORE_SETTINGS:
            case DataActionTypes.LOAD_CUSTOMERS:
                break;
            case CustomersEditorActionTypes.UPDATE_EDITING_CUSTOMER:
            case CustomersCreatorActionTypes.CREATE_CUSTOMER:
                this.customer = action.body.get('uuid');
                this.editorStatus = EditorMode.EDITING;
                break;
            case CustomersCreatorActionTypes.ABORT_CUSTOMER_CREATION:
            case CustomersEditorActionTypes.DESELECT_EDITING_CUSTOMER:
            case CustomersEditorActionTypes.DELETE_EDITING_CUSTOMER:
            case ApplicationActionTypes.GO_TO_PAGE:
                this.customer = null;
                this.editorStatus = EditorMode.SURFING;
                break;
            case CustomersEditorActionTypes.SELECT_EDITING_CUSTOMER:
                this.customer = action.body;
                this.editorStatus = EditorMode.EDITING;
                break;
            case CustomersEditorActionTypes.SELECT_EDITING_CUSTOMER_PAGE:
                this.page = action.body;
                break;
            case CustomersCreatorActionTypes.BEGIN_CUSTOMER_CREATION:
                this.customer = EntitiesUtils.newCustomer();
                this.editorStatus = EditorMode.CREATING;
                break;
            case CustomersCreatorActionTypes.SET_CREATING_CUSTOMER_NAME:
                this.customer = this.customer.set('name', action.body);
                break;
            case CustomersCreatorActionTypes.SET_CREATING_CUSTOMER_SURNAME:
                this.customer = this.customer.set('surname', action.body);
                break;
            case CustomersCreatorActionTypes.SET_CREATING_CUSTOMER_CF:
                this.customer = this.customer.set('cf', action.body);
                break;
            case CustomersCreatorActionTypes.SET_CREATING_CUSTOMER_PIVA:
                this.customer = this.customer.set('piva', action.body);
                break;
            case CustomersCreatorActionTypes.SET_CREATING_CUSTOMER_ADDRESS:
                this.customer = this.customer.set('address', action.body);
                break;
            case CustomersCreatorActionTypes.SET_CREATING_CUSTOMER_CAP:
                this.customer = this.customer.set('cap', action.body);
                break;
            case CustomersCreatorActionTypes.SET_CREATING_CUSTOMER_CITY:
                this.customer = this.customer.set('city', action.body);
                break;
            case CustomersCreatorActionTypes.SET_CREATING_CUSTOMER_DISTRICT:
                this.customer = this.customer.set('district', action.body);
                break;
            default:
                changed = false;
                break;
        }
        return changed;
    }

    getState() {
        let customers = customersStore.getCustomers().getPayload();
        let result = Map({
            customer: this.getSelectedCustomer(),
            page: this.page,
            editorStatus: this.editorStatus,

            customers: customers,

            settings: applicationStore.getSettings()
        });
        return {
            data: result
        }
    }

    getSelectedCustomer() {
        if (this.editorStatus === EditorMode.EDITING) {
            return findByUuid(customersStore.getCustomers().getPayload(), this.customer);
        } else if (this.editorStatus === EditorMode.CREATING) {
            return this.customer;
        }
        return null;
    }

}

const customersPageStore = new CustomersPageStore();
export default customersPageStore;