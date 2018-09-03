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

export default class TablesPage extends ViewController {

    constructor(props) {
        super(props, tablesPageStore);
    }

    componentDidMount() {
        super.componentDidMount();
        TablesPageActions.initTablesPage();
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

    static makePageContent(data) {
        const editor = data.editor;
        if (editor.mode === EditorMode.EDITING) {
            return <TableEditor data={data}/>
        } else if (editor.mode === EditorMode.CREATING) {
            return <TableCreator data={data}/>
        } else {
            return <TablesNavigator data={data}/>
        }
    }
}