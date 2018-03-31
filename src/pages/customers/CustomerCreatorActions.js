import {
    ACT_ABORT_ENTITY_EDITING,
    ACT_BEGIN_ENTITY_EDITING,
    ACT_CREATE_CUSTOMER,
    ACT_SET_ENTITY_PROPERTY
} from "../../actions/ActionTypes"
import dispatcher from "../../dispatcher/SimpleDispatcher";
import asyncActionBuilder from "../../actions/RequestBuilder";
import {CREATING_MODE, CUSTOMER_TYPE} from "../../stores/EntityEditorStore";
import {EntitiesUtils} from "../../utils/EntitiesUtils";

const {fromJS} = require('immutable');

class CustomerCreatorActions {

    updateCustomerProperty(property, value) {
        dispatcher.fireEnd(ACT_SET_ENTITY_PROPERTY, fromJS({
            type: CUSTOMER_TYPE,
            property: property,
            value: value
        }));
    }

    beginCustomerCreation() {
        dispatcher.fireEnd(ACT_BEGIN_ENTITY_EDITING, fromJS({
            type: CUSTOMER_TYPE,
            entity: EntitiesUtils.newCustomer(),
            mode: CREATING_MODE
        }));
    }

    createCustomer(customer) {
        asyncActionBuilder.post(ACT_CREATE_CUSTOMER, 'customers', customer)
            .then(result => {
                dispatcher.fireEnd(ACT_BEGIN_ENTITY_EDITING, fromJS({
                    type: CUSTOMER_TYPE,
                    entity: result
                }));
            });
    }

    deselectCustomer(){
        dispatcher.fireEnd(ACT_ABORT_ENTITY_EDITING, CUSTOMER_TYPE);
    }
}

const customersCreatorActions = new CustomerCreatorActions();
export default customersCreatorActions;