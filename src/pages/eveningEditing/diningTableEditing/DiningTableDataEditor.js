import React from 'react';
import IntegerEditor from "../../../components/widgets/inputs/IntegerEditor";
import {iGet} from "../../../utils/Utils";
import SelectEditor from "../../../components/widgets/inputs/SelectEditor";
import Row from "../../../widgets/Row";
import Column from "../../../widgets/Column";

export default class DiningTableDataEditor extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {

        let actionsProvider = this.props.actionsProvider;
        let table = iGet(this.props.data, "diningTableEditing.diningTable");
        let uuid = table.get('uuid');

        let availableWaiters = this.props.data.get('waiters')
                .filter(waiter => waiter.get('status') === 'ATTIVO' || table.get('waiter') === waiter.get('uuid'));

        return <Row>
            <Column>
                <Row>
                    <Column>
                        <IntegerEditor
                            options={{
                                label: "Coperti",
                                value: table.get('coverCharges'),
                                callback: result => actionsProvider.confirmCoverCharges(uuid, result),
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
                                values: availableWaiters,
                                id: w => w.get('uuid'),
                                renderer: w => w ? w.get('name') : "",
                                value: iGet(table, "waiter"),
                                callback: result => actionsProvider.confirmWaiter(uuid, result)
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
                                values: this.props.data.get('tables'),
                                id: t => t.get('uuid'),
                                renderer: t => t ? t.get('name') : "",
                                colorRenderer: t => this.renderDiningTableColor(t),
                                value: iGet(table, "table"),
                                callback: result => actionsProvider.confirmTable(uuid, result)
                            }}
                        />
                    </Column>
                </Row>
            </Column>
        </Row>
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
}