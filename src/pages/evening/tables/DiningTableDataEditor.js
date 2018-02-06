import React from 'react';
import diningTablesEditorActions from "./DiningTablesEditorActions";
import EntitySelectEditor from "../../../components/widgets/inputs/EntitySelectEditor";
import IntegerEditor from "../../../components/widgets/inputs/IntegerEditor";
import EntityEditor from "../../../components/editors/EntityEditor";
import DiningTablesUtils from "./DiningTablesUtils";

export default class DiningTableDataEditor extends React.Component {
    constructor(props) {
        super(props);
    }


    render() {

        let table = this.props.data.get('editingTable');
        let uuid = table.get('uuid');

        return <EntityEditor
            deleteMethod={(uuid) => diningTablesEditorActions.deleteDiningTable(uuid)}
            entity={table}
            render={() => DiningTablesUtils.renderDiningTable(table, this.props.data.get('tables'), this.props.data.get('waiters'))}>
            <IntegerEditor
                label="Coperti"
                value={table.get('coverCharges')}
                commitAction={result => diningTablesEditorActions.updateDiningTableCoverCharges(uuid, result)}
            />
            <EntitySelectEditor
                label="Cameriere"
                options={this.props.data.get('waiters')}
                renderer={w => w.get('name')}
                value={table.get('waiter')}
                commitAction={result => diningTablesEditorActions.updateDiningTableWaiter(uuid, result)}
            />
            <EntitySelectEditor
                label="Tavolo"
                options={this.props.data.get('tables')}
                renderer={t => t.get('name')}
                value={table.get('table')}
                commitAction={result => diningTablesEditorActions.updateDiningTableTable(uuid, result)}
            />
        </EntityEditor>

    }
}