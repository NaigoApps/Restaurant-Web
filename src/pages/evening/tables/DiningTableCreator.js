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
                label="Tavolo"
                options={this.props.data.get('tables')}
                renderer={table => table.get('name')}
                value={table.get('table')}
                commitAction={this.tableChange.bind(this)}
            />
        </EntityEditor>
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