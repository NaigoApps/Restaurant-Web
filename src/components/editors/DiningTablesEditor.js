import React, {Component} from 'react';
import {EDITING} from "./EditorModes";
import {findByUuid} from "../../utils/Utils";
import diningTablesActions from "../../pages/evening/DiningTablesActions";
import DiningTableEditor from "../DiningTableEditor";
import DiningTableCreator from "../creators/DiningTableCreator";
import DiningTablesList from "../DiningTablesList";

export default class DiningTablesEditor extends Component {
    constructor(props) {
        super(props);
    }

    createDiningTable() {
        diningTablesActions.beginCreateDiningTable();
    }

    render() {
        const diningTables = this.props.diningTables;
        const selectedDiningTable = this.props.selectedDiningTable;
        const selectedOrdination = this.props.selectedOrdination;
        const inCreationDiningTable = this.props.inCreationDiningTable;
        const waiters = this.props.waiters;
        const tables = this.props.tables;

        let diningTableCreator = <div/>;
        let diningTableEditor = <div/>;
        if(!inCreationDiningTable && diningTables && selectedDiningTable){
            diningTableEditor = <DiningTableEditor
                diningTable={findByUuid(diningTables, selectedDiningTable)}
                waiters={waiters}
                tables={tables}/>
        }else if(inCreationDiningTable){
            diningTableCreator = <DiningTableCreator
                    diningTable={inCreationDiningTable}
                    waiters={waiters}
                    tables={tables}/>
        }

        return (
            <div className="row">
                <div className="col-sm-3">
                    <div className="row">
                        <DiningTablesList
                            tables={diningTables}
                            selected={selectedDiningTable}/>
                    </div>
                    <div className="row text-center top-sep">
                        <button className="btn btn-success" onClick={this.createDiningTable}>Nuovo tavolo</button>
                    </div>
                </div>
                <div className="col-sm-9">
                    {diningTableCreator}
                    {diningTableEditor}
                </div>
            </div>
        );
    }
}