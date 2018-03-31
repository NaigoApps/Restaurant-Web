import React from 'react';
import EntitySelectEditor from "../../../components/widgets/inputs/EntitySelectEditor";
import IntegerEditor from "../../../components/widgets/inputs/IntegerEditor";
import diningTablesCreatorActions from "./DiningTablesCreatorActions";
import Row from "../../../widgets/Row";
import Column from "../../../widgets/Column";
import EntityEditor from "../../../components/editors/EntityEditor";

const NEW_UUID = "new_dining_table";

export default class DiningTableCreator extends React.Component {

    constructor(props) {
        super(props);
    }

    coverChargesChange(value) {
        diningTablesCreatorActions.updateDiningTableCoverCharges(value);
    }

    waiterChange(waiter) {
        diningTablesCreatorActions.updateDiningTableWaiter(waiter);
    }

    tableChange(table) {
        diningTablesCreatorActions.updateDiningTableTable(table);
    }

    getTableDataEditorContent() {
        let table = this.props.data.get('editingTable');
        let waiters = this.props.data.get('waiters');

        return <EntityEditor
            entity={table}
            render={table => table.get('name')}
            valid={!!table.get('waiter') && !!table.get('table') && !!table.get('coverCharges')}
            confirmMethod={table => diningTablesCreatorActions.createDiningTable(table)}
            abortMethod={diningTablesCreatorActions.abortDiningTableEditing}>
            <IntegerEditor
                label="Coperti"
                value={table.get('coverCharges')}
                commitAction={this.coverChargesChange.bind(this)}
            />
            <EntitySelectEditor
                label="Cameriere"
                options={this.props.data.get('waiters')}
                renderer={waiter => waiter.get('name')}
                value={table.get('waiter')}
                commitAction={this.waiterChange.bind(this)}
            />
            <EntitySelectEditor
                rows={8}
                cols={4}
                label="Tavolo"
                options={this.props.data.get('tables')}
                renderer={table => table.get('name')}
                colorRenderer={table => this.diningTableColorRenderer(table)}
                value={table.get('table')}
                commitAction={this.tableChange.bind(this)}
            />
        </EntityEditor>
    }

    diningTableColorRenderer(table) {
        let diningTables = this.props.data.get('evening').get('diningTables');
        let color = null;
        diningTables.filter(dTable => dTable.get('table') === table.get('uuid'))
            .forEach(dTable => {
                if (dTable.get('status') === "APERTO") {
                    color = "danger";
                }
                if (dTable.get('status') === "IN CHIUSURA" && !color) {
                    color = "warning";
                }
            });
        return color || "secondary";
    }

    render() {

        let editorContent = this.getTableDataEditorContent();

        let table = this.props.data.get('editingTable');

        return <Row>
            <Column>
                {editorContent}
            </Column>
        </Row>


    }

}