import React, {Component} from 'react';
import NavElement from "../../widgets/NavElement";
import EveningEditorActions from "./EveningEditorActions";
import RestaurantNav from "../../components/RestaurantNav";
import {EntitiesUtils} from "../../utils/EntitiesUtils";
import DiningTablesEditorActions from "./diningTableEditing/DiningTablesEditorActions";
import CRUDStatus from "../../utils/CRUDStatus";
import DiningTablesUtils from "./tables/DiningTablesUtils";

export default class EveningNav extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        let nav = this.makeNav();

        return (
            <RestaurantNav>
                {nav}
            </RestaurantNav>
        );
    }

    makeNav() {
        let data = this.props;
        let pills = [];

        let evening = data.data.evening;

        pills.push(<NavElement
            key="evening_selection"
            icon="calendar"
            active={!evening}
            commitAction={() => EveningEditorActions.deselectEvening()}
        />);

        if (evening) {
            pills.push(<NavElement
                key="evening_editor"
                text={EntitiesUtils.renderEvening(evening)}
                active={!data.diningTableEditing.currentTable}
                commitAction={() => DiningTablesEditorActions.deselect()}
            />);

            const dtData = data.diningTableEditing;

            if(dtData.crudStatus === CRUDStatus.UPDATE || dtData.crudStatus === CRUDStatus.DELETE){
                const table = dtData.currentTable;
                pills.push(<NavElement
                    key="table_editor"
                    text={DiningTablesUtils.renderDiningTable(table).text}
                    active={true}
                />);
            }else if(dtData.crudStatus === CRUDStatus.CREATE){
                pills.push(<NavElement
                    key="table_creator"
                    text="Creazione tavolo"
                    active={true}
                />);
            }
            //
            // if (data.diningTableEditing.editor.mode === EditorMode.EDITING) {
            //     let table = data.diningTableEditing.editor.entity;
            //
            //     if (data.diningTableEditing.status)
            //         pills.push(<NavElement
            //             key="table_editor"
            //             text={DiningTablesUtils.renderDiningTable(table, data.data.tables, data.data.waiters)}
            //             active={!!table &&
            //             !data.ordinationEditing.ordination &&
            //             !data.editingTableBills &&
            //             !data.diningTableEditing.editingData}
            //             commitAction={OrdinationsEditorActions.abortOrdinationEditing}
            //         />);
            //
            //     if (data.diningTableEditing.editingData) {
            //         pills.push(<NavElement
            //             key="table_data_editor"
            //             text="Modifica dati"
            //             active={data.diningTableEditing.editingData}
            //         />);
            //     }
            //
            //     if (data.editingTableBills) {
            //         pills.push(<NavElement
            //             key="table_bills_editor"
            //             text="Modifica conti"
            //             commitAction={DiningTablesEditorActions.deselectBill}
            //             active={data.editingTableBills && !data.bill}
            //         />);
            //     }
            //
            //     if (data.bill) {
            //         pills.push(<NavElement
            //             key="table_bill_editor"
            //             text={DiningTablesUtils.renderBill(data.bill, this.props.data.customers)}
            //             commitAction={DiningTablesEditorActions.deselectBill}
            //             active={data.editingTableBills}
            //         />);
            //     }
            //
            //     let ordination = data.ordinationEditing.ordination;
            //     if (ordination) {
            //         pills.push(<NavElement
            //             key="ordination_editor"
            //             text={OrdinationsUtils.renderOrdination(ordination)}
            //             active={!!ordination}
            //         />);
            //     }
            // }

        }
        return pills;
    }
}