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
import {SETTINGS} from "../../App";

const {Map} = require('immutable');

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
        let navContent = TablesPage.makeNavContent(this.state.data);
        let pageContent = TablesPage.makePageContent(this.state.data);
        return (
            <Page title="Tavoli">
                {navContent}
                {pageContent}
            </Page>
        )
    }

    static makePageContent(state) {
        if (state.get('selectedTable')) {
            return <TableEditor data={TablesPage.makeTableEditorDescriptor(state)}/>
        } else if (state.get('createdTable')) {
            return <TableCreator data={TablesPage.makeTableCreatorDescriptor(state)}/>
        } else {
            return <TablesNavigator data={state}/>
        }
    }

    static makeTableEditorDescriptor(data) {
        return Map({
            table: findByUuid(data.get('tables'), data.get('selectedTable'))
        })
    }

    static makeTableCreatorDescriptor(data) {
        return Map({
            table: data.get('createdTable')
        })
    }

    static makeNavContent(state) {
        let elements = [];
        elements.push(<NavElementLink
            key="settings"
            text="Impostazioni"
            page={SETTINGS}
        />);
        elements.push(<NavElement
            key="tables"
            text="Tavoli"
            active={!state.get('selectedTable') && !state.get('createdTable')}
            commitAction={tablesEditorActions.deselectTable}
        />);
        if (state.get('selectedTable')) {
            elements.push(<NavElement
                key="selected"
                text={findByUuid(state.get('tables'), state.get('selectedTable')).get('name')}
                active={true}
            />);
        } else if (state.get('createdTable')) {
            elements.push(<NavElement
                key="selected"
                text={state.get('createdTable').get('name') || "Nuovo tavolo"}
                active={true}
            />);
        }
        return <NavPills>{elements}</NavPills>;
    }
}