import React, {Component} from 'react';
import DiningTableView from "./DiningTableView";
import eveningActions from "../actions/pages/EveningSelectionFormActions";
import diningTablesActions from "../pages/evening/DiningTablesActions";

export default class DiningTablesList extends Component {
    constructor(props) {
        super(props);
    }

    selectTable(table) {
        diningTablesActions.selectDiningTable(table);
    }

    tableButtonClass(table){
        const active = this.props.tables.selected;
        if(!active || table.uuid !== active){
            return "btn btn-default";
        }else{
            return "btn btn-info";
        }
    }

    render() {
        let tablesList = <div className="alert alert-info alert-dismissable">
            <button type="button" className="close" data-dismiss="alert">
                <span>&times;</span>
            </button>
            Non sono ancora stati creati tavoli
        </div>
        if(this.props.tables.length > 0) {
            tablesList = this.props.tables.map((table) =>
                <button key={table.uuid} className="btn btn-default" onClick={this.selectTable.bind(this, table.uuid)}>
                    <DiningTableView table={table}/>
                </button>
            );
        }

        return (
            <div className="btn-group-vertical col-sm-12">
                {tablesList}
            </div>
        );
    }
}