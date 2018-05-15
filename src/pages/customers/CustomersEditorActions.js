import dispatcher from "../../dispatcher/SimpleDispatcher";
import asyncActionBuilder from "../../actions/RequestBuilder";

const {fromJS} = require('immutable');

export const CustomersEditorActionTypes = {
    SELECT_EDITING_CUSTOMER: "SELECT_EDITING_CUSTOMER",
    SELECT_EDITING_CUSTOMER_PAGE: "SELECT_EDITING_CUSTOMER_PAGE",
    DESELECT_EDITING_CUSTOMER: "DESELECT_EDITING_CUSTOMER",
    UPDATE_EDITING_CUSTOMER: "UPDATE_EDITING_CUSTOMER",
    DELETE_EDITING_CUSTOMER: "DELETE_EDITING_CUSTOMER",
};

export const CustomersEditorActions = {

    selectCustomer: (customer) =>
        dispatcher.fireEnd(
            CustomersEditorActionTypes.SELECT_EDITING_CUSTOMER,
            customer
        ),

    selectCustomerPage: (page) =>
        dispatcher.fireEnd(
            CustomersEditorActionTypes.SELECT_EDITING_CUSTOMER_PAGE,
            page
        ),

    deselectCustomer: () =>
        dispatcher.fireEnd(
            CustomersEditorActionTypes.DESELECT_EDITING_CUSTOMER
        ),

    confirmName: (uuid, value) =>
        asyncActionBuilder.put(
            CustomersEditorActionTypes.UPDATE_EDITING_CUSTOMER,
            'customers/' + uuid + '/name',
            value
        ),

    confirmSurname: (uuid, value) =>
        asyncActionBuilder.put(
            CustomersEditorActionTypes.UPDATE_EDITING_CUSTOMER,
            'customers/' + uuid + '/surname',
            value
        ),

    confirmCf: (uuid, value) =>
        asyncActionBuilder.put(
            CustomersEditorActionTypes.UPDATE_EDITING_CUSTOMER,
            'customers/' + uuid + '/cf',
            value
        ),

    confirmPiva: (uuid, value) =>
        asyncActionBuilder.put(
            CustomersEditorActionTypes.UPDATE_EDITING_CUSTOMER,
            'customers/' + uuid + '/piva',
            value
        ),

    confirmCity: (uuid, value) =>
        asyncActionBuilder.put(
            CustomersEditorActionTypes.UPDATE_EDITING_CUSTOMER,
            'customers/' + uuid + '/city',
            value
        ),

    confirmCap: (uuid, value) =>
        asyncActionBuilder.put(
            CustomersEditorActionTypes.UPDATE_EDITING_CUSTOMER,
            'customers/' + uuid + '/cap',
            value
        ),

    confirmAddress: (uuid, value) =>
        asyncActionBuilder.put(
            CustomersEditorActionTypes.UPDATE_EDITING_CUSTOMER,
            'customers/' + uuid + '/address',
            value
        ),

    confirmDistrict: (uuid, value) =>
        asyncActionBuilder.put(
            CustomersEditorActionTypes.UPDATE_EDITING_CUSTOMER,
            'customers/' + uuid + '/district',
            value
        ),

    onDelete: (uuid) =>
        asyncActionBuilder.remove(
            CustomersEditorActionTypes.DELETE_EDITING_CUSTOMER,
            'customers',
            uuid
        ),
};