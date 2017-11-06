import React, {Component} from 'react';
import {beautifyDate} from "./widgets/inputs/DateInput";
import FloatInput from "./widgets/inputs/FloatInput";
import diningTablesActions from "../pages/evening/DiningTablesActions";
import eveningEditorActions from "../pages/evening/EveningEditorActions";
import DiningTablesEditor from "./editors/DiningTablesEditor";

const TABLES_VIEW = "TABLES_VIEW";
const TABLE_CREATION = "TABLE_CREATION";

export default class EveningEditor extends Component {
    constructor(props) {
        super(props);
    }

    createTable() {
        diningTablesActions.createDiningTable(this.props.evening.uuid);
    }

    updateCoverCharge(value) {
        eveningEditorActions.updateCoverCharge(this.props.evening.uuid, value);
    }

    render() {
        const evening = this.props.evening;
        const selectedDiningTable = this.props.selectedDiningTable;
        const inCreationDiningTable = this.props.inCreationDiningTable;
        const selectedOrdination = this.props.selectedOrdination;
        const waiters = this.props.waiters;
        const tables = this.props.tables;
        return (
            <div>
                <h1 className="text-center"> Gestione serata {beautifyDate(evening.day)}</h1>

                <div className="row">
                    <div className="form-horizontal">
                        <FloatInput
                            label="Coperto"
                            default={evening.coverCharge}
                            unit="€"
                            commitAction={this.updateCoverCharge.bind(this)}/>
                    </div>
                    <DiningTablesEditor
                        diningTables={evening.diningTables}
                        selectedDiningTable={selectedDiningTable}
                        inCreationDiningTable={inCreationDiningTable}
                        selectedOrdination={selectedOrdination}
                        waiters={waiters}
                        tables={tables}/>
                </div>
            </div>
        );
    }
}