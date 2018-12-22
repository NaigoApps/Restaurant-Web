import React from 'react';
import {formatDate} from "../../components/widgets/inputs/DateInput";
import Page from "../Page";
import eveningPageActions from "./EveningPageActions";
import EveningNav from "./EveningNav";
import ViewController from "../../widgets/ViewController";
import Row from "../../widgets/Row";
import Column from "../../widgets/Column";
import dataStore from "../../stores/DataStore";
import diningTableEditingStore from "./diningTableEditing/DiningTableEditorStore";
import ordinationEditingStore from "./diningTableEditing/ordinationsEditing/OrdinationEditingStore";
import ordersEditingStore from "./diningTableEditing/ordinationsEditing/OrdersEditingStore";
import CRUDStatus from "../../utils/CRUDStatus";
import BaseEntity from "../../model/BaseEntity";
import DiningTablesEditorActions from "./diningTableEditing/DiningTablesEditorActions";
import WaiterStatus from "../../model/WaiterStatus";
import DiningTableCreator from "./diningTableEditing/DiningTableCreator";
import DiningTableEditor from "./diningTableEditing/DiningTableEditor";
import DiningTablesList from "./DiningTablesList";
import RoundButton from "../../widgets/RoundButton";
import ColumnSeparator from "../../widgets/ColumnSeparator";
import EveningActionsComponent from "./EveningActionsComponent";
import tableClosingFeatureStore from "./diningTableEditing/tableClosingFeature/TableClosingFeatureStore";

export const DataContext = React.createContext(undefined);

export default class EveningPage extends ViewController {
    constructor(props) {
        super(props,
            dataStore,
            diningTableEditingStore,
            ordinationEditingStore,
            ordersEditingStore,
            tableClosingFeatureStore
        );
    }

    render() {
        let pageContent = this.makePageContent();
        let title = EveningPage.makeTitle(this.state);

        return (
            <DataContext.Provider value={this.state.data}>
                <Page title={title}>
                    <EveningNav {...this.state}/>
                    <Row topSpaced grow>
                        <Column>
                            {pageContent}
                        </Column>
                    </Row>
                </Page>
            </DataContext.Provider>
        );
    }

    static makeTitle(state) {
        let title = "Gestione serata";
        if (state.data.evening) {
            title += " " + formatDate(state.data.evening.day);
        }
        return title;
    }

    makePageContent() {
        if (this.state.data.evening) {
            const diningTableContent = this.buildDiningTableContent();

            return <Row grow>
                <Column>
                    {diningTableContent}
                </Column>
            </Row>
        }
        return <div/>;
    }

    buildDiningTableContent() {
        const data = this.state.data;
        const diningTableData = this.state.diningTableEditing;

        const table = diningTableData.currentTable;
        const tables = data.tables;
        if (diningTableData.crudStatus === CRUDStatus.CREATE) {
            const waiters = data.waiters
                .filter(w => w.status === WaiterStatus.ACTIVE || BaseEntity.equals(w, table.waiter));
            return <DiningTableCreator
                evening={data.evening}
                table={table}
                tables={tables}
                waiters={waiters}/>
        } else if (diningTableData.crudStatus === CRUDStatus.UPDATE || diningTableData.crudStatus === CRUDStatus.DELETE) {
            return <DiningTableEditor
                {...diningTableData}
                data={data}
                ordinationEditing={this.state.ordinationEditing}
                ordersEditing={this.state.ordersEditing}
                billsEditing={this.state.tableClosingFeature}
            />
        } else {
            const tables = data.evening.tables;
            const page = diningTableData.page;
            return <Row grow>
                <Column>
                    <Row grow>
                        <Column>
                            <DiningTablesList tables={tables} page={page}/>
                        </Column>
                    </Row>
                    <Row>
                        <Column align="center">
                            <RoundButton
                                type="success"
                                text="Nuovo tavolo"
                                icon="plus"
                                commitAction={() => DiningTablesEditorActions.beginCreation()}/>
                        </Column>
                    </Row>
                </Column>
                <ColumnSeparator/>
                <Column auto>
                    <EveningActionsComponent evening={data.evening}/>
                </Column>
            </Row>
        }
    }
}
