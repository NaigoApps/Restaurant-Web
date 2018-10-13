import React from 'react';
import Row from "../../../widgets/Row";
import Column from "../../../widgets/Column";
import RoundButton from "../../../widgets/RoundButton";
import DiningTablesEditorActions from "./DiningTablesEditorActions";
import IntegerEditor from "../../../components/widgets/inputs/IntegerEditor";
import SelectEditor from "../../../components/widgets/inputs/SelectEditor";
import DiningTableStatus from "../../../model/DiningTableStatus";
import BaseEntity from "../../../model/BaseEntity";

/**
 * evening
 * waiters
 * tables
 * table
 */
export default class DiningTableCreator extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {

        const table = this.props.table;
        const waiters = this.props.waiters;
        const tables = this.props.tables;

        return <Row grow>
            <Column>
                <Row grow>
                    <Column>
                        <Row>
                            <Column>
                                <IntegerEditor
                                    options={{
                                        label: "Coperti",
                                        value: table.coverCharges,
                                        callback: ccs => DiningTablesEditorActions.setEditorCoverCharges(ccs),
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
                                        callback: waiter => DiningTablesEditorActions.setEditorWaiter(waiter)
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
                                        callback: rTable => DiningTablesEditorActions.setEditorTable(rTable)
                                    }}
                                />
                            </Column>
                        </Row>
                    </Column>
                </Row>
                <Row justify="center" grow>
                    <Column justify="center" align="center">
                        <RoundButton
                            icon="check"
                            type="success"
                            size="lg"
                            disabled={!this.isValid()}
                            commitAction={() => DiningTablesEditorActions.createDiningTable(table)}
                        />
                    </Column>
                </Row>
            </Column>
        </Row>
    }

    isValid() {
        const table = this.props.table;
        return table.waiter && table.table && table.coverCharges > 0;
    }

    renderDiningTableColor(table) {
        let diningTables = this.props.evening.tables;
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