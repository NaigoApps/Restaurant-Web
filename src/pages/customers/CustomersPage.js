import React from 'react';
import Page from "../Page";
import customersPageStore from "./CustomersPageStore";
import customersPageActions from "./CustomersPageActions";
import CustomerEditor from "./CustomerEditor";
import CustomersNavigator from "./CustomersNavigator";
import CustomersNav from "./CustomersNav";
import EditorMode from "../../utils/EditorMode";
import ViewController from "../../widgets/ViewController";
import CustomerCreator from "./CustomerCreator";
import applicationStore from "../../stores/ApplicationStore";
import dataStore from "../../stores/DataStore";

export default class CustomersPage extends ViewController {

    constructor(props) {
        super(props, customersPageStore, applicationStore, dataStore);
    }

    componentDidMount() {
        super.componentDidMount();
        customersPageActions.initCustomersPage();
    }

    render() {
        let pageContent = CustomersPage.makePageContent(this.state);
        return (
            <Page title="Clienti">
                <CustomersNav {...this.state.customers}/>
                {pageContent}
            </Page>
        )
    }

    static makePageContent(data) {
        const editorMode = data.customers.editor.mode;
        if (editorMode === EditorMode.EDITING) {
            return <CustomerEditor {...data.customers}/>
        } else if (editorMode === EditorMode.CREATING) {
            return <CustomerCreator {...data.customers}/>
        } else {
            return <CustomersNavigator data={data.data} general={data.general} page={data.customers.navigator.page}/>
        }
    }
}