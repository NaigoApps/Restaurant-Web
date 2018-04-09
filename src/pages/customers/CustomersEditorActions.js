import {
    ACT_ABORT_ENTITY_EDITING,
    ACT_BEGIN_ENTITY_EDITING,
    ACT_DELETE_CUSTOMER,
    ACT_UPDATE_CUSTOMER
} from "../../actions/ActionTypes"
import dispatcher from "../../dispatcher/SimpleDispatcher";
import asyncActionBuilder from "../../actions/RequestBuilder";

const {fromJS} = require('immutable');

class CustomersEditorActions {

    selectCustomer(customer) {
        //FIXME
        // dispatcher.fireEnd(ACT_BEGIN_ENTITY_EDITING, fromJS({
        //     type: CUSTOMER_TYPE,
        //     entity: customer
        // }));
    }

    deselectCustomer(){
        //FIXME
        // dispatcher.fireEnd(ACT_ABORT_ENTITY_EDITING, CUSTOMER_TYPE);
    }

    updateCustomerName(uuid, value) {
        asyncActionBuilder.put(ACT_UPDATE_CUSTOMER, 'customers/' + uuid + '/name', value);
    }

    updateCustomerSurname(uuid, value) {
        asyncActionBuilder.put(ACT_UPDATE_CUSTOMER, 'customers/' + uuid + '/surname', value);
    }

    updateCustomerCf(uuid, value) {
        asyncActionBuilder.put(ACT_UPDATE_CUSTOMER, 'customers/' + uuid + '/cf', value);
    }

    updateCustomerPiva(uuid, value) {
        asyncActionBuilder.put(ACT_UPDATE_CUSTOMER, 'customers/' + uuid + '/piva', value);
    }

    updateCustomerCity(uuid, value) {
        asyncActionBuilder.put(ACT_UPDATE_CUSTOMER, 'customers/' + uuid + '/city', value);
    }

    updateCustomerCap(uuid, value) {
        asyncActionBuilder.put(ACT_UPDATE_CUSTOMER, 'customers/' + uuid + '/cap', value);
    }

    updateCustomerAddress(uuid, value) {
        asyncActionBuilder.put(ACT_UPDATE_CUSTOMER, 'customers/' + uuid + '/address', value);
    }

    updateCustomerDistrict(uuid, value) {
        asyncActionBuilder.put(ACT_UPDATE_CUSTOMER, 'customers/' + uuid + '/district', value);
    }

    deleteCustomer(uuid) {
        asyncActionBuilder.remove(ACT_DELETE_CUSTOMER, 'customers', uuid);
    }

}

const customersEditorActions = new CustomersEditorActions();
export default customersEditorActions;