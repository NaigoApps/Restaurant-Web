import React, {Component} from 'react';
import Page from "../Page";
import NavElementLink from "../../widgets/NavElementLink";
import NavElement from "../../widgets/NavElement";
import NavPills from "../../widgets/NavPills";
import customersPageStore from "./CustomersPageStore";
import customersPageActions from "./CustomersPageActions";
import {NEW_CUSTOMER_UUID} from "../../utils/EntitiesUtils";
import CustomerCreator from "./CustomerCreator";
import CustomerEditor from "./CustomerEditor";
import CustomersNavigator from "./CustomersNavigator";
import customersEditorActions from "./CustomersEditorActions";
import {SETTINGS} from "../../App";

const {Map} = require('immutable');

export default class CustomersPage extends Component {

    constructor(props) {
        super(props);
        this.state = customersPageStore.getState();

        this.updateState = this.updateState.bind(this);
    }

    componentDidMount() {
        customersPageStore.addChangeListener(this.updateState);

        customersPageActions.initCustomersPage();
    }

    updateState(state) {
        this.setState(state);
    }

    componentWillUnmount() {
        customersPageStore.removeChangeListener(this.updateState);
    }

    render() {
        let navContent = CustomersPage.makeNavContent(this.state.data);
        let pageContent = CustomersPage.makePageContent(this.state.data);
        return (
            <Page title="Clienti">
                {navContent}
                {pageContent}
            </Page>
        )
    }

    static makePageContent(props) {
        let editorContent = <CustomersNavigator data={props}/>;

        if (props.get('editingCustomer')) {
            if (props.get('editingCustomer').get('uuid') === NEW_CUSTOMER_UUID) {
                editorContent = <CustomerCreator data={props}/>;
            } else {
                editorContent = <CustomerEditor data={props}/>;
            }
        }
        return editorContent;
    }

    static makeNavContent(state) {
        let elements = [];
        elements.push(<NavElementLink
            key="settings"
            text="Impostazioni"
            page={SETTINGS}
        />);
        elements.push(<NavElement
            key="customers"
            text="Clienti"
            active={!state.get('editingCustomer')}
            commitAction={customersEditorActions.deselectCustomer}
        />);
        if (state.get('editingCustomer')) {
            elements.push(<NavElement
                key="selected"
                text={state.get('editingCustomer').get('surname') + " " + state.get('editingCustomer').get('name')}
                active={true}
            />);
        }
        return <NavPills>{elements}</NavPills>;
    }
}