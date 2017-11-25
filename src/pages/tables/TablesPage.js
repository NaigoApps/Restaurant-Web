import React, {Component} from 'react';
import {ACTIONS, TYPES} from "../../components/editors/EntityEditor";
import EntitiesEditor from "../../components/editors/EntitiesEditor";
import tablesStore from "../../generic/TablesStore";
import tablesActions from "../../generic/TablesActions";
import tablesPageStore from "./TablesPageStore";
import TablesEditor from "./TablesEditor";
import tablesPageActions from "./TablesPageActions";
import Page from "../Page";

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
        const tables = this.state.tables;
        const selectedTable = this.state.selectedTable;
        const inCreationTable = this.state.inCreationTable;

        return (

            <Page title="Tavoli">
                <TablesEditor
                    tables={tables}
                    selected={selectedTable}
                    created={inCreationTable}/>
            </Page>
        )
    }
}