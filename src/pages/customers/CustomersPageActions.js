import asyncActionBuilder from "../../actions/RequestBuilder";
import {ACT_RETRIEVE_CUSTOMERS} from "../../actions/ActionTypes";
import {ApplicationActions} from "../../actions/ApplicationActions";

class CustomersPageActions {

    initCustomersPage(){
        asyncActionBuilder.get(ACT_RETRIEVE_CUSTOMERS, 'customers');
        ApplicationActions.loadSettings();
    }

}

const customersPageActions = new CustomersPageActions();
export default customersPageActions;