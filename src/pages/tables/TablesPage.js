import React, {Component} from 'react';
import tablesPageStore from "./TablesPageStore";
import tablesPageActions from "./TablesPageActions";
import Page from "../Page";
import {findByUuid} from "../../utils/Utils";
import tablesEditorActions from "./TablesEditorActions";
import TableEditor from "../locations/TableEditor";
import TableCreator from "../locations/TableCreator";
import TablesNavigator from "../locations/TablesNavigator";
import NavElementLink from "../../widgets/NavElementLink";
import NavElement from "../../widgets/NavElement";
import NavPills from "../../widgets/NavPills";

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
        let navContent = TablesPage.makeNavContent(this.state);
        let pageContent = TablesPage.makePageContent(this.state);
        return (
            <Page title="Tavoli">
                {navContent}
                {pageContent}
            </Page>
        )
    }

    static makePageContent(state) {
        if (state.selectedTable) {
            return <TableEditor data={TablesPage.makeTableEditorDescriptor(state)}/>
        } else if (state.createdTable) {
            return <TableCreator data={TablesPage.makeTableCreatorDescriptor(state)}/>
        } else {
            return <TablesNavigator data={state}/>
        }
    }

    static makeTableEditorDescriptor(data) {
        return {
            table: findByUuid(data.tables, data.selectedTable)
        }
    }

    static makeTableCreatorDescriptor(data) {
        return {
            tablw: data.createdTable
        }
    }

    static makeNavContent(state) {
        let elements = [];
        elements.push(<NavElementLink
            key="settings"
            text="Impostazioni"
            href="/restaurant/settings"
        />);
        elements.push(<NavElement
            key="tables"
            text="Tavoli"
            active={!state.selectedTable && !state.createdTable}
            commitAction={tablesEditorActions.deselectTable}
        />);
        if (state.selectedTable) {
            elements.push(<NavElement
                key="selected"
                text={findByUuid(state.tables, state.selectedTable).name}
                active={true}
            />);
        } else if (state.createdTable) {
            elements.push(<NavElement
                key="selected"
                text={state.createdTable.name || "Nuovo tavolo"}
                active={true}
            />);
        }
        return <NavPills>{elements}</NavPills>;
    }
}