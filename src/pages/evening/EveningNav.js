import React, {Component} from 'react';
import eveningSelectionFormActions from "./eveningSelector/EveningSelectorActions";
import NavPills from "../../widgets/NavPills";
import NavElement from "../../widgets/NavElement";
import diningTablesEditorActions from "./tables/DiningTablesEditorActions";
import DiningTablesUtils from "./tables/DiningTablesUtils";
import ordinationsEditorActions from "./diningTablesEditing/ordinationsEditing/OrdinationsEditorActions";
import OrdinationsUtils from "./OrdinationsUtils";
import {iGet} from "../../utils/Utils";
import eveningEditorActions from "./EveningEditorActions";
import HiddenFloatEditor from "../../components/widgets/inputs/float/HiddenFloatEditor";

export default class EveningNav extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        let nav = this.makeNav();

        return (
            <NavPills>
                {nav}
            </NavPills>
        );
    }

    makeNav() {
        let data = this.props.data;
        let pills = [];

        let evening = data.get('evening');

        if (evening) {
            pills.push(<NavElement
                key="cc_editor"
                type="info"
                text={"Coperto: " + OrdinationsUtils.formatPrice(evening.get('coverCharge'))}
                active={!!data.get('editingOrdination')}
                commitAction={() => eveningEditorActions.onStartCCEditing()}
            />);
            pills.push(<HiddenFloatEditor
                key="cc_editor_modal"
                uuid="evening_cc_editor"
                label="Coperto"
                visible={iGet(data, "ccEditor.visible")}
                text={iGet(data, "ccEditor.text")}
                onChar={char => eveningEditorActions.onCCChar(char)}

                onConfirm={result => eveningEditorActions.onConfirmCCEditing(iGet(data, "evening.uuid"), result)}
                onAbort={eveningEditorActions.onAbortCCEditing}/>);
        }

        pills.push(<NavElement
            key="evening_selection"
            text="Selezione serata"
            active={!data.get('evening')}
            commitAction={eveningSelectionFormActions.deselectEvening}
        />);

        if (data.get('evening')) {
            pills.push(<NavElement
                key="evening_editor"
                text="Elenco tavoli"
                active={!iGet(data, "diningTablesEditing.diningTable")}
                commitAction={diningTablesEditorActions.abortDiningTableEditing}
            />);

            if (iGet(data, 'diningTablesEditing.diningTable')) {
                let table = iGet(data, 'diningTablesEditing.diningTable');

                pills.push(<NavElement
                    key="table_editor"
                    text={DiningTablesUtils.renderDiningTable(table, data.get('tables'), data.get('waiters'))}
                    active={!!table &&
                    !data.get('editingOrdination') &&
                    !data.get('editingTableBills') &&
                    !data.get('editingTableData')}
                    commitAction={ordinationsEditorActions.abortOrdinationEditing}
                />);

                if (data.get('editingTableData')) {
                    pills.push(<NavElement
                        key="table_data_editor"
                        text="Modifica dati"
                        active={data.get('editingTableData')}
                    />);
                }

                if (data.get('editingTableBills')) {
                    pills.push(<NavElement
                        key="table_bills_editor"
                        text="Modifica conti"
                        commitAction={diningTablesEditorActions.deselectBill}
                        active={data.get('editingTableBills') && !data.get('selectedBill')}
                    />);
                }

                if (data.get('selectedBill')) {
                    pills.push(<NavElement
                        key="table_bill_editor"
                        text={DiningTablesUtils.renderBill(data.get('selectedBill'), this.props.data.get('customers'))}
                        commitAction={diningTablesEditorActions.deselectBill}
                        active={data.get('editingTableBills')}
                    />);
                }

                if (data.get('editingOrdination')) {
                    pills.push(<NavElement
                        key="ordination_editor"
                        text={OrdinationsUtils.renderOrdination(data.get('editingOrdination'))}
                        active={!!data.get('editingOrdination')}
                    />);
                }
            }

        }
        return pills;
    }
}