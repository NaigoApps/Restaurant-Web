import React from 'react';
import IntegerInput from "./widgets/inputs/IntegerInput";
import EntitySelectInput from "./widgets/inputs/EntitySelectInput";
import OrdersCrudTable from "./OrdersCrudTable";
import diningTablesActions from "../pages/evening/DiningTablesActions";

export default class DiningTableEditor extends React.Component {
    constructor(props) {
        super(props);
    }

    coverChargesChange(value) {
        diningTablesActions.updateCoverCharges(this.props.diningTable.uuid, value);
    }

    waiterChange(waiter) {
        diningTablesActions.updateWaiter(this.props.diningTable.uuid, waiter.uuid);
    }

    tableChange(table) {
        diningTablesActions.updateTable(this.props.diningTable.uuid, table.uuid);
    }

    deleteDiningTable() {
        // eveningActions.deleteDiningTable(this.state.diningTable);
    }

    render() {
        const dTable = this.props.diningTable;
        const tablesList = this.props.tables.map((table, index) =>
            <option key={table.uuid} value={table.uuid}>{table.name}</option>
        );
        return (
            <div className="panel-group">
                <div className="panel panel-default">
                    <div className="panel-heading">
                        Dati del tavolo
                        <button className="btn btn-xs btn-info pull-right" data-toggle="collapse" data-target="#table-data-panel">
                            <span className="glyphicon glyphicon-link"></span>
                        </button>
                    </div>
                    <div id="table-data-panel" className="panel-collapse collapse">
                        <div className="panel-body">
                            <div className="form-horizontal">
                                <IntegerInput
                                    name="Coperti"
                                    default={dTable.coverCharges}
                                    commitAction={this.coverChargesChange.bind(this)}/>

                                <EntitySelectInput
                                    label="Cameriere"
                                    default={(dTable.waiter) ? dTable.waiter.uuid : ""}
                                    options={this.props.waiters}
                                    render={(waiter => {
                                        return waiter.name;
                                    })}
                                    commitAction={this.waiterChange.bind(this)}/>

                                <EntitySelectInput
                                    label="Tavolo"
                                    default={(dTable.table) ? dTable.table.uuid : ""}
                                    options={this.props.tables}
                                    render={(table => {
                                        return table.name;
                                    })}
                                    commitAction={this.tableChange.bind(this)}/>
                                {/*<div className="pull-right">*/}
                                {/*<button type="button" className="btn btn-danger" onClick={this.deleteDiningTable.bind(this)}>*/}
                                {/*Elimina*/}
                                {/*</button>*/}
                                {/*</div>*/}
                            </div>
                        </div>
                    </div>
                </div>
                <OrdersCrudTable
                    table={dTable}
                    categories={this.props.categories}
                />
            </div>
        );
    }

}