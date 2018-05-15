import dispatcher from "../../dispatcher/SimpleDispatcher";
import asyncActionBuilder from "../../actions/RequestBuilder";

const {fromJS} = require('immutable');

export const CustomersCreatorActionTypes = {
    BEGIN_CUSTOMER_CREATION: "BEGIN_CUSTOMER_CREATION",
    SET_CREATING_CUSTOMER_NAME: "SET_CREATING_CUSTOMER_NAME",
    SET_CREATING_CUSTOMER_SURNAME: "SET_CREATING_CUSTOMER_SURNAME",
    SET_CREATING_CUSTOMER_CF: "SET_CREATING_CUSTOMER_CF",
    SET_CREATING_CUSTOMER_PIVA: "SET_CREATING_CUSTOMER_PIVA",
    SET_CREATING_CUSTOMER_ADDRESS: "SET_CREATING_CUSTOMER_ADDRESS",
    SET_CREATING_CUSTOMER_CAP: "SET_CREATING_CUSTOMER_CAP",
    SET_CREATING_CUSTOMER_CITY: "SET_CREATING_CUSTOMER_CITY",
    SET_CREATING_CUSTOMER_DISTRICT: "SET_CREATING_CUSTOMER_DISTRICT",
    CREATE_CUSTOMER: "CREATE_CUSTOMER",
    ABORT_CUSTOMER_CREATION: "ABORT_CUSTOMER_CREATION",
};

export const CustomersCreatorActions = {

    beginCustomerCreation: () =>
        dispatcher.fireEnd(
            CustomersCreatorActionTypes.BEGIN_CUSTOMER_CREATION
        ),

    confirmName: (uuid, value) =>
        dispatcher.fireEnd(
            CustomersCreatorActionTypes.SET_CREATING_CUSTOMER_NAME,
            value
        ),
    confirmSurname: (uuid, value) =>
        dispatcher.fireEnd(
            CustomersCreatorActionTypes.SET_CREATING_CUSTOMER_SURNAME,
            value
        ),
    confirmCf: (uuid, value) =>
        dispatcher.fireEnd(
            CustomersCreatorActionTypes.SET_CREATING_CUSTOMER_CF,
            value
        ),
    confirmPiva: (uuid, value) =>
        dispatcher.fireEnd(
            CustomersCreatorActionTypes.SET_CREATING_CUSTOMER_PIVA,
            value
        ),
    confirmAddress: (uuid, value) =>
        dispatcher.fireEnd(
            CustomersCreatorActionTypes.SET_CREATING_CUSTOMER_ADDRESS,
            value
        ),
    confirmCap: (uuid, value) =>
        dispatcher.fireEnd(
            CustomersCreatorActionTypes.SET_CREATING_CUSTOMER_CAP,
            value
        ),
    confirmCity: (uuid, value) =>
        dispatcher.fireEnd(
            CustomersCreatorActionTypes.SET_CREATING_CUSTOMER_CITY,
            value
        ),
    confirmDistrict: (uuid, value) =>
        dispatcher.fireEnd(
            CustomersCreatorActionTypes.SET_CREATING_CUSTOMER_DISTRICT,
            value
        ),

    onConfirm: (customer) =>
        asyncActionBuilder.post(CustomersCreatorActionTypes.CREATE_CUSTOMER,
            'customers',
            customer
        ),

    onAbort: () =>
        dispatcher.fireEnd(
            CustomersCreatorActionTypes.ABORT_CUSTOMER_CREATION
        ),
};