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
                descriptor={DiningTableCreator.getCoverChargesDescriptor()}
                value={this.props.diningTable.coverCharges}
                commitAction={this.coverChargesChange.bind(this)}
            />
            <EntitySelectEditor
                descriptor={DiningTableCreator.getWaitersDescriptor(this.props.waiters)}
                value={this.props.diningTable.waiter}
                commitAction={this.waiterChange.bind(this)}
            />
            <EntitySelectEditor
                descriptor={DiningTableCreator.getTablesDescriptor(this.props.tables)}
                value={this.props.diningTable.table}
                commitAction={this.tableChange.bind(this)}
            />
        </div>
    }

    render() {

        let editorContent = this.getTableDataEditorContent();

        let table = this.props.diningTable;

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

    static getCoverChargesDescriptor() {
        return {
            name: "coverCharges",
            label: "Coperti"
        };
    }

    static getWaitersDescriptor(waiters) {
        return {
            name: "waiter",
            label: "Cameriere",
            options: waiters,
            renderer: w => w.name
        };
    }

    static getTablesDescriptor(tables) {
        return {
            name: "table",
            label: "Tavolo",
            options: tables,
            renderer: t => t.name
        };
    }

}