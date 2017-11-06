import React from 'react';
import IntegerInput from "../widgets/inputs/IntegerInput";
import EntitySelectInput from "../widgets/inputs/EntitySelectInput";
import diningTableCreatorActions from "../../actions/creators/DiningTableCreatorActions";

export default class DiningTableCreator extends React.Component {
    constructor(props) {
        super(props);
    }

    coverChargesChange(number) {
        diningTableCreatorActions.updateCoverCharges(number);
    }

    waiterChange(waiter) {
        diningTableCreatorActions.updateWaiter(waiter.uuid);
    }

    tableChange(table) {
        diningTableCreatorActions.updateTable(table.uuid);
    }

    createDiningTable() {
        diningTableCreatorActions.createDiningTable(this.props.diningTable);
    }

    render() {
        const dTable = this.props.diningTable;
        const waiters = this.props.waiters;
        const tables = this.props.tables;

        const tablesList = this.props.tables.map((table, index) =>
            <option key={table.uuid} value={table.uuid}>{table.name}</option>
        );
        return (
            <div className="form-horizontal">
                <IntegerInput
                    name="Coperti"
                    default={dTable.coverCharges}
                    commitAction={this.coverChargesChange.bind(this)}/>

                <EntitySelectInput
                    label="Cameriere"
                    default={dTable.waiter}
                    options={waiters}
                    render={(waiter => {
                        return waiter.name;
                    })}
                    commitAction={this.waiterChange.bind(this)}/>

                <EntitySelectInput
                    label="Tavolo"
                    options={tables}
                    default={dTable.table}
                    render={(table => {
                        return table.name;
                    })}
                    commitAction={this.tableChange.bind(this)}/>
                <div className="pull-right">
                    <button type="button" className="btn btn-success" onClick={this.createDiningTable.bind(this)}>Crea
                    </button>
                </div>
            </div>
        );
    }

}