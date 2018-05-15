import React, {Component} from 'react';
import Page from "../Page";
import customersPageStore from "./CustomersPageStore";
import customersPageActions from "./CustomersPageActions";
import CustomerEditor from "./CustomerEditor";
import CustomersNavigator from "./CustomersNavigator";
import {EditorStatus} from "../StoresUtils";
import CustomersNav from "./CustomersNav";
import {CustomersEditorActions} from "./CustomersEditorActions";
import {CustomersCreatorActions} from "./CustomerCreatorActions";

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
        let pageContent = CustomersPage.makePageContent(this.state.data);
        return (
            <Page title="Clienti">
                <CustomersNav data={this.state.data}/>
                {pageContent}
            </Page>
        )
    }

    static makePageContent(state) {
        const editorStatus = state.get('editorStatus');
        if (editorStatus === EditorStatus.EDITING) {
            return <CustomerEditor data={state} actionsProvider={CustomersEditorActions}/>
        } else if (editorStatus === EditorStatus.CREATING) {
            return <CustomerEditor data={state} actionsProvider={CustomersCreatorActions}/>
        } else {
            return <CustomersNavigator data={state}/>
        }
    }
}