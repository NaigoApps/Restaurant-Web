import React from 'react';
import diningTablesEditorActions from "../pages/evening/DiningTablesEditorActions";
import EntitySelectEditor from "./widgets/inputs/EntitySelectEditor";
import IntegerEditor from "./widgets/inputs/IntegerEditor";
import Button from "../widgets/Button";
import {findByUuid} from "../utils/Utils";
import {beautifyTime} from "./widgets/inputs/DateInput";
import OrdinationEditor from "./OrdinationEditor";
import ordinationsCreatorActions from "../pages/evening/OrdinationsCreatorActions";
import OrdinationCreator from "./widgets/inputs/OrdinationCreator";
import ordinationsEditorActions from "../pages/evening/OrdinationsEditorActions";
import ButtonGroup from "../widgets/ButtonGroup";

export default class DiningTableEditor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            configuring: false
        };
    }

    coverChargesChange(value) {
        diningTablesEditorActions.updateDiningTableCoverCharges(this.props.diningTable.uuid, value);
    }

    waiterChange(waiter) {
        diningTablesEditorActions.updateDiningTableWaiter(this.props.diningTable.uuid, waiter);
    }

    tableChange(table) {
        diningTablesEditorActions.updateDiningTableTable(this.props.diningTable.uuid, table);
    }

    deleteDiningTable() {
        // eveningActions.deleteDiningTable(this.state.diningTable);
    }

    createOrdination() {
        ordinationsCreatorActions.beginOrdinationCreation();
    }

    selectOrdination(uuid) {
        ordinationsEditorActions.selectOrdination(uuid);
    }

    setConfiguring(val) {
        this.setState({
            configuring: val
        });
    }

    getConfiguringEditorContent() {
        return <div className="form top-sep">
            <IntegerEditor
                descriptor={DiningTableEditor.getCoverChargesDescriptor()}
                value={this.props.diningTable.coverCharges}
                commitAction={this.coverChargesChange.bind(this)}
            />
            <EntitySelectEditor
                descriptor={DiningTableEditor.getWaitersDescriptor(this.props.waiters)}
                value={this.props.diningTable.waiter}
                commitAction={this.waiterChange.bind(this)}
            />
            <EntitySelectEditor
                descriptor={DiningTableEditor.getTablesDescriptor(this.props.tables)}
                value={this.props.diningTable.table}
                commitAction={this.tableChange.bind(this)}
            />
        </div>
    }

    getOrdinationsEditorContent() {
        let ordinationEditor;
        let ordinationsNav;
        if (this.props.createdOrdination) {
            ordinationEditor = <OrdinationCreator
                table={this.props.diningTable.uuid}
                categories={this.props.categories}
                dishes={this.props.dishes}
                phases={this.props.phases}/>;
        } else {
            if (this.props.selectedOrdination) {
                ordinationEditor = <OrdinationEditor
                    categories={this.props.categories}
                    dishes={this.props.dishes}
                    phases={this.props.phases}
                    editing={this.props.isEditingOrdination}
                    ordination={findByUuid(this.props.ordinations, this.props.selectedOrdination)}/>;
            }
            let ordinationsNavContent = this.props.ordinations.map(o => {
                return <button
                    type="button"
                    className={o.uuid === this.props.selectedOrdination ? "btn btn-primary" : "btn btn-default"}
                    key={o.uuid}
                    onClick={this.selectOrdination.bind(this, o.uuid)}>{beautifyTime(o.creationTime)}</button>;
            });
            ordinationsNav = <ButtonGroup vertical={true} size="lg">{ordinationsNavContent}</ButtonGroup>;
        }
        let creatorButton;
        if (!this.props.createdOrdination) {
            creatorButton =
                <div className="text-center">
                    <Button text="Nuova comanda" type="info" commitAction={this.createOrdination.bind(this)}/>
                </div>;
        }
        return <div className="form top-sep">
            <div className="row">
                <div className="col-sm-12">
                    <div className="row">
                        <div className="col-sm-1">
                            {ordinationsNav}
                        </div>
                        <div className="col-sm-11">
                            {ordinationEditor}
                        </div>
                    </div>
                </div>
            </div>
            <div className="row">
                {creatorButton}
            </div>
        </div>
    }

    getOrdersEditor(ordination) {
        let ordersEditor = ordination.orders.map(o => {
            return <div className="row">{findByUuid(this.props.dishes, o.dish).name}</div>;
        });
        return <div>
            {ordersEditor}
        </div>;
    }

    render() {

        const configuring = this.state.configuring;

        let editorContent;
        if (configuring) {
            editorContent = this.getConfiguringEditorContent();
        } else {
            editorContent = this.getOrdinationsEditorContent();
        }

        return <div className="panel panel-default">
            <div
                className="panel-heading text-center clearfix"
                onClick={diningTablesEditorActions.deselectDiningTable}>
                <div className="panel-title">
                    {this.getEditorTitle.bind(this)()}
                </div>
            </div>
            <div className="panel-body">
                <div className="form">
                    <ul className="nav nav-tabs">
                        <li role="presentation" className={!configuring ? "active" : ""}>
                            <a href="#" onClick={this.setConfiguring.bind(this, false)}>Comande</a>
                        </li>
                        <li role="presentation" className={configuring ? "active" : ""}>
                            <a href="#" onClick={this.setConfiguring.bind(this, true)}>Dati del tavolo</a>
                        </li>
                    </ul>
                    {editorContent}
                </div>
            </div>
        </div>

    }

    getEditorTitle() {
        let table = findByUuid(this.props.tables, this.props.diningTable.table);
        let waiter = findByUuid(this.props.waiters, this.props.diningTable.waiter);
        if (table && waiter) {
            return table.name + " (" + beautifyTime(this.props.diningTable.date) + ") - " + waiter.name;
        }
        return null;
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