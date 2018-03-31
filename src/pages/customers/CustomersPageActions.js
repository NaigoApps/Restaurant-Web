import asyncActionBuilder from "../../actions/RequestBuilder";
import {ACT_RETRIEVE_CUSTOMERS} from "../../actions/ActionTypes";

class CustomersPageActions {

    initCustomersPage(){
        asyncActionBuilder.get(ACT_RETRIEVE_CUSTOMERS, 'customers');
    }

}

const customersPageActions = new CustomersPageActions();
export default customersPageActions;