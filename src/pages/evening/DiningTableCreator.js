import React from 'react';
import diningTablesEditorActions from "./DiningTablesEditorActions";
import EntitySelectEditor from "../../components/widgets/inputs/EntitySelectEditor";
import IntegerEditor from "../../components/widgets/inputs/IntegerEditor";
import NavPills from "../../widgets/NavPills";
import NavPillsElement from "../../widgets/NavElement";
import eveningSelectionFormActions from "../../actions/pages/EveningSelectionFormActions";
import diningTablesCreatorActions from "./DiningTablesCreatorActions";
import Button from "../../widgets/Button";

export default class DiningTableCreator extends React.Component {
    constructor(props) {
        super(props);
    }

    coverChargesChange(value) {
        diningTablesCreatorActions.updateDiningTableCoverCharges(null, value);
    }

    waiterChange(waiter) {
        diningTablesCreatorActions.updateDiningTableWaiter(null, waiter);
    }

    tableChange(table) {
        diningTablesCreatorActions.updateDiningTableTable(null, table);
    }

    getTableDataEditorContent() {
        return <div className="form top-sep">
            <IntegerEditor
                label="Coperti"
                value={this.props.data.diningTable.coverCharges}
                commitAction={this.coverChargesChange.bind(this)}
            />
            <EntitySelectEditor
                label="Cameriere"
                options={this.props.data.waiters}
                renderer={waiter => waiter.name}
                value={this.props.data.diningTable.waiter}
                commitAction={this.waiterChange.bind(this)}
            />
            <EntitySelectEditor
                label="Tavolo"
                options={this.props.data.tables}
                renderer={table => table.name}
                value={this.props.data.diningTable.table}
                commitAction={this.tableChange.bind(this)}
            />
        </div>
    }

    render() {

        let editorContent = this.getTableDataEditorContent();

        let table = this.props.data.diningTable;

        return <div className="row">
            <div className="col-sm-12">
                <div className="row">
                    <div className="col-sm-12">
                        <NavPills>
                            <NavPillsElement
                                text="Selezione serata"
                                active={false}
                                commitAction={eveningSelectionFormActions.deselectEvening}
                            />
                            <NavPillsElement
                                text="Elenco tavoli"
                                active={false}
                                commitAction={diningTablesEditorActions.deselectDiningTable}
                            />
                            <NavPillsElement
                                text="Nuovo tavolo"
                                active={true}
                            />
                        </NavPills>
                    </div>
                </div>
                <div className="row top-sep">
                    <div className="col-sm-12">
                        {editorContent}
                    </div>
                </div>
                <div className="row top-sep">
                    <div className="col-sm-12 text-center">
                        <Button
                            text="Conferma"
                            type="success"
                            size="lg"
                            disabled={!table.waiter || !table.table || !table.coverCharges}
                            commitAction={diningTablesCreatorActions.createDiningTable.bind(this,table)}
                        />
                    </div>
                </div>
            </div>
        </div>


    }

}