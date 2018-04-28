import React, {Component} from 'react';
import NavElement from "../../widgets/NavElement";
import DiningTablesUtils from "./tables/DiningTablesUtils";
import OrdinationsUtils from "./OrdinationsUtils";
import {iGet} from "../../utils/Utils";
import HiddenFloatEditor from "../../components/widgets/inputs/float/HiddenFloatEditor";
import {OrdinationsEditorActions} from "./diningTablesEditing/ordinationsEditing/OrdinationsEditorActions";
import {EveningEditorActions} from "./EveningEditorActions";
import EveningUtils from "./EveningUtils";
import RestaurantNav from "../../components/RestaurantNav";
import {DiningTablesEditorActions} from "./diningTablesEditing/DiningTablesEditorActions";
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
                active={!iGet(data, "diningTablesEditing.diningTable")}
                commitAction={() => DiningTablesEditorActions.deselect()}
            />);

            pills.push(<NavElement
                key="cc_editor"
                type="info"
                text={"Coperto: " + OrdinationsUtils.formatPrice(evening.get('coverCharge'))}
                active={!!data.get('editingOrdination')}
                commitAction={() => ApplicationActions.showFloatInput(evening.get('coverCharge'),
                    (result) => EveningEditorActions.confirmCoverCharge(iGet(data, "evening.uuid"), result))}
            />);

            if (iGet(data, 'diningTablesEditing.diningTable')) {
                let table = iGet(data, 'diningTablesEditing.diningTable');

                pills.push(<NavElement
                    key="table_editor"
                    text={DiningTablesUtils.renderDiningTable(table, data.get('tables'), data.get('waiters'))}
                    active={!!table &&
                    !iGet(data, 'ordinationEditing.ordination') &&
                    !data.get('editingTableBills') &&
                    !iGet(data, "diningTablesEditing.editingData")}
                    commitAction={OrdinationsEditorActions.abortOrdinationEditing}
                />);

                if (iGet(data, "diningTablesEditing.editingData")) {
                    pills.push(<NavElement
                        key="table_data_editor"
                        text="Modifica dati"
                        active={iGet(data, "diningTablesEditing.editingData")}
                    />);
                }

                if (data.get('editingTableBills')) {
                    pills.push(<NavElement
                        key="table_bills_editor"
                        text="Modifica conti"
                        commitAction={DiningTablesEditorActions.deselectBill}
                        active={data.get('editingTableBills') && !data.get('selectedBill')}
                    />);
                }

                if (data.get('selectedBill')) {
                    pills.push(<NavElement
                        key="table_bill_editor"
                        text={DiningTablesUtils.renderBill(data.get('selectedBill'), this.props.data.get('customers'))}
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