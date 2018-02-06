import React, {Component} from 'react';
import eveningSelectionFormActions from "../../actions/pages/EveningSelectionFormActions";
import NavPills from "../../widgets/NavPills";
import NavElement from "../../widgets/NavElement";
import diningTablesEditorActions from "./tables/DiningTablesEditorActions";
import DiningTablesUtils from "./tables/DiningTablesUtils";
import ordinationsEditorActions from "./OrdinationsEditorActions";
import {ORDINATION_TYPE} from "../../stores/EntityEditorStore";
import OrdinationsUtils from "./OrdinationsUtils";

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
                active={!data.get('editingTable')}
                commitAction={diningTablesEditorActions.abortDiningTableEditing}
            />);

            if (data.get('editingTable')) {
                pills.push(<NavElement
                    key="table_editor"
                    text={DiningTablesUtils.renderDiningTable(data.get('editingTable'), data.get('tables'), data.get('waiters'))}
                    active={!!data.get('editingTable') && !data.get('editingOrdination') && !data.get('editingTableData')}
                    commitAction={ordinationsEditorActions.abortOrdinationEditing}
                />);
            }

            if (data.get('editingTableData')) {
                pills.push(<NavElement
                    key="table_data_editor"
                    text="Modifica dati"
                    active={data.get('editingTableData')}
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
        return pills;
    }
}