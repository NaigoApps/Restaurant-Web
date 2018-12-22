import React from 'react';
import Row from "../../../widgets/Row";
import Column from "../../../widgets/Column";
import RoundButton from "../../../widgets/RoundButton";
import DiningTablesEditorActions from "./DiningTablesEditorActions";
import IntegerEditor from "../../../components/widgets/inputs/IntegerEditor";
import SelectEditor from "../../../components/widgets/inputs/SelectEditor";
import DiningTableStatus from "../../../model/DiningTableStatus";
import BaseEntity from "../../../model/BaseEntity";
import RenderingData from "../../../components/widgets/inputs/RenderingData";
import {ApplicationContext} from "../../../pages/Page";

export default class DiningTableCreator extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return <ApplicationContext.Consumer>
            {value => this.buildContent(value)}
        </ApplicationContext.Consumer>
    }

    buildContent(general) {

        const table = this.props.table;
        const waiters = this.props.waiters;
        const tables = this.props.tables;

        let coverChargesComponent = this.buildCoverChargesComponent(general);


        return <Row grow>
            <Column>
                <Row grow>
                    <Column>
                        {coverChargesComponent}
                        <Row ofList>
                            <Column>
                                <SelectEditor
                                    options={{
                                        label: "Cameriere",
                                        values: waiters,
                                        renderer: w => w ? w.name : "",
                                        isValid: waiter => !!waiter,
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
                                        isValid: table => !!table,
                                        renderer: t => this.renderDiningTable(t),
                                        value: table.table,
                                        callback: rTable => DiningTablesEditorActions.setEditorTable(rTable)
                                    }}
                                />
                            </Column>
                        </Row>
                    </Column>
                </Row>
                <Row justify="center">
                    <Column align="end">
                        <RoundButton
                            icon="check"
                            type="success"
                            size="lg"
                            disabled={!this.isValid(general)}
                            commitAction={() => DiningTablesEditorActions.doCreate(table)}
                        />
                    </Column>
                    <Column align="start">
                        <RoundButton
                            icon="remove"
                            type="danger"
                            size="lg"
                            commitAction={() => DiningTablesEditorActions.abortCreation()}
                        />
                    </Column>
                </Row>
            </Column>
        </Row>
    }

    buildCoverChargesComponent(general){
        if(general.settings.coverCharges){
            return <Row>
                <Column>
                    <IntegerEditor
                        options={{
                            label: "Coperti",
                            value: this.props.table.coverCharges,
                            callback: ccs => DiningTablesEditorActions.setEditorCoverCharges(ccs),
                            min: 0
                        }}
                    />
                </Column>
            </Row>
        }
        return null;
    }

    isValid(general) {
        const table = this.props.table;
        return table.waiter && table.table && (!general.coverCharges || table.coverCharges > 0);
    }

    renderDiningTable(table) {
        let diningTables = this.props.evening.tables;
        let color = "secondary";
        diningTables.filter(dTable => BaseEntity.equals(dTable.table, table))
            .forEach(dTable => {
                if (dTable.status === DiningTableStatus.OPEN) {
                    color = "danger";
                }
                if (dTable.status === DiningTableStatus.CLOSING) {
                    color = "warning";
                }
            });
        return new RenderingData(table.name, color);
    }
}