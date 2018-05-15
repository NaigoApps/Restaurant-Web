import React, {Component} from 'react';
import tablesPageStore from "./TablesPageStore";
import tablesPageActions from "./TablesPageActions";
import Page from "../Page";
import TableEditor from "./TableEditor";
import TablesNavigator from "./TablesNavigator";
import {EditorStatus} from "../StoresUtils";
import TablesNav from "./TablesNav";
import {TablesCreatorActions} from "./TablesCreatorActions";
import {TablesEditorActions} from "./TablesEditorActions";

const {Map} = require('immutable');

const {fromJS} = require('immutable');

export default class TablesPage extends Component {

    constructor(props) {
        super(props);
        this.state = tablesPageStore.getState();

        this.updateState = this.updateState.bind(this);
    }

    componentDidMount() {
        tablesPageStore.addChangeListener(this.updateState);

        tablesPageActions.initTablesPage();
    }

    updateState(state) {
        this.setState(state);
    }

    componentWillUnmount() {
        tablesPageStore.removeChangeListener(this.updateState);
    }

    render() {
        let pageContent = TablesPage.makePageContent(this.state.data);
        return (
            <Page title="Tavoli">
                <TablesNav data={this.state.data}/>
                {pageContent}
            </Page>
        )
    }

    static makePageContent(state) {
        let editorStatus = state.get('editorStatus');
        if (editorStatus === EditorStatus.EDITING) {
            return <TableEditor
                data={state}
                actionsProvider={TablesEditorActions}
            />
        } else if (editorStatus === EditorStatus.CREATING) {
            return <TableEditor
                data={state}
                actionsProvider={TablesCreatorActions}
            />
        } else {
            return <TablesNavigator data={state}/>
        }
    }
}