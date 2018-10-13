import React, {Component} from 'react';
import NavElement from "../../widgets/NavElement";
import EveningEditorActions from "./EveningEditorActions";
import RestaurantNav from "../../components/RestaurantNav";
import {EntitiesUtils} from "../../utils/EntitiesUtils";

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
                active={true}
                commitAction={() => EveningEditorActions.showReview()}
            />);

            // const dtEditor = data.diningTableEditing.editor;

            // if(dtEditor.mode === EditorMode.EDITING){
            //     const table = data.diningTableEditing.editor.entity;
            //     pills.push(<NavElement
            //         key="table_editor"
            //         text={DiningTablesUtils.renderDiningTable(table)}
            //         active={true}
            //     />);
            // }else if(dtEditor.mode === EditorMode.CREATING){
            //     pills.push(<NavElement
            //         key="table_creator"
            //         text="Creazione tavolo"
            //         active={true}
            //     />);
            // }else {
            //     pills.push(<NavElement
            //         key="tables_list"
            //         text="Elenco tavoli"
            //         active={true}
            //     />);
            // }
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