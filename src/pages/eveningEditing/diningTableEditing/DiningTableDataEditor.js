import React from 'react';
import IntegerEditor from "../../../components/widgets/inputs/IntegerEditor";
import {iGet} from "../../../utils/Utils";
import SelectEditor from "../../../components/widgets/inputs/SelectEditor";
import Row from "../../../widgets/Row";
import Column from "../../../widgets/Column";
import WaiterStatus from "../../../model/WaiterStatus";
import DiningTablesEditorActions from "./DiningTablesEditorActions";
import DiningTableStatus from "../../../model/DiningTableStatus";
import BaseEntity from "../../../model/BaseEntity";

export default class DiningTableDataEditor extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {

        const table = this.props.table;
        const waiters = this.props.waiters.filter(w => w.status === WaiterStatus.ACTIVE || table.waiter.equals(w));
        const tables = this.props.tables;

        return <Row>
            <Column>
                <Row>
                    <Column>
                        <IntegerEditor
                            options={{
                                label: "Coperti",
                                value: table.coverCharges,
                                callback: result => DiningTablesEditorActions.updateCoverCharges(table.uuid, result),
                                min: 1
                            }}
                        />
                    </Column>
                </Row>
                <Row ofList>
                    <Column>
                        <SelectEditor
                            options={{
                                label: "Cameriere",
                                values: waiters,
                                renderer: w => w ? w.name : "",
                                value: table.waiter,
                                callback: result => DiningTablesEditorActions.updateWaiter(table.uuid, result),
                            }}
                        />
                    </Column>
                </Row>
                <Row ofList>
                    <Column>
                        <SelectEditor
                            options={{
                                label: "Tavolo",
                                rows: 8,
                                cols: 4,
                                values: tables,
                                renderer: t => t ? t.name : "",
                                colorRenderer: t => this.renderDiningTableColor(t),
                                value: table.table,
                                callback: result => DiningTablesEditorActions.updateTable(table.uuid, result),
                            }}
                        />
                    </Column>
                </Row>
            </Column>
        </Row>
    }

    renderDiningTableColor(table) {
        let diningTables = this.props.data.evening.tables;
        let color = "secondary";
        diningTables.filter(dTable => BaseEntity.equals(dTable, table))
            .forEach(dTable => {
                if (dTable.status === DiningTableStatus.OPEN) {
                    color = "danger";
                }
                if (dTable.status === DiningTableStatus.CLOSING) {
                    color = "warning";
                }
            });
        return color;
    }
}