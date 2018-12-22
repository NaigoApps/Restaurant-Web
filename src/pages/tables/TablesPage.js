import React from 'react';
import Page from "../Page";
import TableEditor from "./TableEditor";
import TablesNavigator from "./TablesNavigator";
import TablesNav from "./TablesNav";
import EditorMode from "../../utils/EditorMode";
import ViewController from "../../widgets/ViewController";
import {TablesPageActions} from "./TablesPageActions";
import tablesPageStore from "./TablesPageStore";
import TableCreator from "./TableCreator";
import applicationStore from "../../stores/ApplicationStore";
import dataStore from "../../stores/DataStore";

export default class TablesPage extends ViewController {

    constructor(props) {
        super(props, tablesPageStore, applicationStore, dataStore);
    }

    componentDidMount() {
        super.componentDidMount();
        TablesPageActions.initTablesPage();
    }

    render() {
        let pageContent = TablesPage.makePageContent(this.state);
        return (
            <Page title="Tavoli">
                <TablesNav {...this.state.tables}/>
                {pageContent}
            </Page>
        )
    }

    static makePageContent(data) {
        const editor = data.tables.editor;
        if (editor.mode === EditorMode.EDITING) {
            return <TableEditor {...data.tables}/>
        } else if (editor.mode === EditorMode.CREATING) {
            return <TableCreator {...data.tables}/>
        } else {
            return <TablesNavigator data={data.data} general={data.general} page={data.tables.navigator.page}/>
        }
    }
}