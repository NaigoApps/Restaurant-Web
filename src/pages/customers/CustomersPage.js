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

const {Map} = require('immutable');

export default class CustomersPage extends ViewController {

    constructor(props) {
        super(props, customersPageStore);
    }

    componentDidMount() {
        super.componentDidMount();
        customersPageActions.initCustomersPage();
    }

    render() {
        let pageContent = CustomersPage.makePageContent(this.state);
        return (
            <Page title="Clienti" {...this.state.general}>
                <CustomersNav {...this.state}/>
                {pageContent}
            </Page>
        )
    }

    static makePageContent(data) {
        const editorMode = data.editor.mode;
        if (editorMode === EditorMode.EDITING) {
            return <CustomerEditor {...data}/>
        } else if (editorMode === EditorMode.CREATING) {
            return <CustomerCreator {...data}/>
        } else {
            return <CustomersNavigator {...data}/>
        }
    }
}