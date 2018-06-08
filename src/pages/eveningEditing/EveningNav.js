import React, {Component} from 'react';
import NavElement from "../../widgets/NavElement";
import DiningTablesUtils from "./tables/DiningTablesUtils";
import OrdinationsUtils from "./OrdinationsUtils";
import {iGet} from "../../utils/Utils";
import HiddenFloatEditor from "../../components/widgets/inputs/float/HiddenFloatEditor";
import {OrdinationsEditorActions} from "./diningTableEditing/ordinationsEditing/OrdinationsEditorActions";
import {EveningEditorActions} from "./EveningEditorActions";
import EveningUtils from "./EveningUtils";
import RestaurantNav from "../../components/RestaurantNav";
import {DiningTablesEditorActions} from "./diningTableEditing/DiningTablesEditorActions";
import {ApplicationActions} from "../../actions/ApplicationActions";

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
        let data = this.props.data;
        let pills = [];

        let evening = data.get('evening');

        pills.push(<NavElement
            key="evening_selection"
            text="Selezione serata"
            active={!data.get('evening')}
            commitAction={EveningEditorActions.deselectEvening}
        />);

        if (evening) {
            pills.push(<NavElement
                key="evening_editor"
                text={EveningUtils.renderEvening(evening)}
                active={!iGet(data, "diningTableEditing.diningTable")}
                commitAction={() => DiningTablesEditorActions.deselect()}
            />);

            if (iGet(data, 'diningTableEditing.diningTable')) {
                let table = iGet(data, 'diningTableEditing.diningTable');

                if(iGet(data, 'diningTableEditing.status'))
                pills.push(<NavElement
                    key="table_editor"
                    text={DiningTablesUtils.renderDiningTable(table, data.get('tables'), data.get('waiters'))}
                    active={!!table &&
                    !iGet(data, 'ordinationEditing.ordination') &&
                    !data.get('editingTableBills') &&
                    !iGet(data, "diningTableEditing.editingData")}
                    commitAction={OrdinationsEditorActions.abortOrdinationEditing}
                />);

                if (iGet(data, "diningTableEditing.editingData")) {
                    pills.push(<NavElement
                        key="table_data_editor"
                        text="Modifica dati"
                        active={iGet(data, "diningTableEditing.editingData")}
                    />);
                }

                if (data.get('editingTableBills')) {
                    pills.push(<NavElement
                        key="table_bills_editor"
                        text="Modifica conti"
                        commitAction={DiningTablesEditorActions.deselectBill}
                        active={data.get('editingTableBills') && !data.get('bill')}
                    />);
                }

                if (data.get('bill')) {
                    pills.push(<NavElement
                        key="table_bill_editor"
                        text={DiningTablesUtils.renderBill(data.get('bill'), this.props.data.get('customers'))}
                        commitAction={DiningTablesEditorActions.deselectBill}
                        active={data.get('editingTableBills')}
                    />);
                }

                let ordination = iGet(data, 'ordinationEditing.ordination');
                if (ordination) {
                    pills.push(<NavElement
                        key="ordination_editor"
                        text={OrdinationsUtils.renderOrdination(ordination)}
                        active={!!ordination}
                    />);
                }
            }

        }
        return pills;
    }
}