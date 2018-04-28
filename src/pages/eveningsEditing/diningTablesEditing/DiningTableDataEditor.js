import React from 'react';
import IntegerEditor from "../../../components/widgets/inputs/IntegerEditor";
import EntityEditor from "../../../components/editors/EntityEditor";
import DiningTablesUtils from "../tables/DiningTablesUtils";
import {iGet} from "../../../utils/Utils";
import SelectEditor from "../../../components/widgets/inputs/SelectEditor";
import {DiningTablesEditorActions} from "./DiningTablesEditorActions";

export default class DiningTableDataEditor extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {

        let actionsProvider = this.props.actionsProvider;
        let table = iGet(this.props.data, "diningTablesEditing.diningTable");
        let uuid = table.get('uuid');
        let editorData = iGet(this.props.data, 'diningTablesEditing.editor');

        return <EntityEditor
            confirmMethod={actionsProvider.onConfirm}
            abortMethod={actionsProvider.onAbort}
            deleteMethod={actionsProvider.onDelete}
            valid={this.isValid()}
            entity={table}
            render={() => DiningTablesUtils.renderDiningTable(table, this.props.data.get('tables'), this.props.data.get('waiters'))}>
            <IntegerEditor
                options={{
                    label: "Coperti",
                    value: table.get('coverCharges'),
                    callback: result => actionsProvider.confirmCoverCharges(uuid, result),
                    min: 1
                }}
            />
            <SelectEditor
                label="Cameriere"
                options={this.props.data.get('waiters')}
                id={w => w.get('uuid')}
                renderer={w => w ? w.get('name') : "?"}
                value={iGet(editorData, "waiter.value")}
                page={iGet(editorData, "waiter.page")}
                visible={iGet(editorData, "waiter.visible")}
                onShowModal={() => DiningTablesEditorActions.beginWaiter()}
                onSelectPage={page => DiningTablesEditorActions.selectWaiterPage(page)}
                onSelect={waiter => DiningTablesEditorActions.selectWaiter(waiter)}
                onConfirm={result => actionsProvider.confirmWaiter(uuid, result)}
                onAbort={result => DiningTablesEditorActions.abortWaiter()}
            />
            <SelectEditor
                label="Tavolo"
                rows={8}
                cols={4}
                options={this.props.data.get('tables')}
                id={t => t.get('uuid')}
                renderer={t => t ? t.get('name') : "?"}
                colorRenderer={t => this.renderDiningTableColor(t)}
                value={iGet(editorData, "table.value")}
                page={iGet(editorData, "table.page")}
                visible={iGet(editorData, "table.visible")}
                onShowModal={() => DiningTablesEditorActions.beginTable()}
                onSelectPage={page => DiningTablesEditorActions.selectTablePage(page)}
                onSelect={table => DiningTablesEditorActions.selectTable(table)}
                onAbort={() => DiningTablesEditorActions.abortTable()}
                onConfirm={result => actionsProvider.confirmTable(uuid, result)}
            />
        </EntityEditor>

    }

    renderDiningTableColor(table) {

        let diningTables = this.props.data.get('evening').get('diningTables');
        let color = "secondary";
        diningTables.filter(dTable => dTable.get('table') === table.get('uuid'))
            .forEach(dTable => {
                if (dTable.get('status') === "APERTO") {
                    color = "danger";
                }
                if (dTable.get('status') === "IN CHIUSURA") {
                    color = "warning";
                }
            });
        return color;
    }

    isValid() {
        let table = iGet(this.props.data, "diningTablesEditing.diningTable");
        return table.get("waiter") && table.get("table") && table.get("coverCharges") > 0;
    }
}