import React from 'react';
import diningTablesEditorActions from "./DiningTablesEditorActions";
import Button from "../../widgets/Button";
import {findByUuid} from "../../utils/Utils";
import DiningTableEditor from "./DiningTableEditor";
import PaginatedEntitiesList from "../../components/widgets/PaginatedEntitiesList";
import NavPills from "../../widgets/NavPills";
import NavPillsElement from "../../widgets/NavElement";
import eveningSelectionFormActions from "../../actions/pages/EveningSelectionFormActions";
import diningTablesCreatorActions from "./DiningTablesCreatorActions";
import DiningTableCreator from "./DiningTableCreator";
import Row from "../../widgets/Row";
import Column from "../../widgets/Column";
import eveningEditorActions from "./EveningEditorActions";
import FloatEditor from "../../components/widgets/inputs/FloatEditor";

export default class EveningEditor extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {

        let props = this.props.data;

        const createdDiningTable = props.createdDiningTable;

        if (props.selectedDiningTable) {
            let diningTableProps = EveningEditor.makeDiningTableEditorProps(props);

            return <DiningTableEditor data={diningTableProps}/>;
        } else if (!createdDiningTable) {
            let diningTableRenderer = {
                name: this.renderDiningTable.bind(this)
            };
            return ([
                <Row key="Selection">
                    <Column>
                        <NavPills>
                            <NavPillsElement
                                text="Selezione serata"
                                active={false}
                                commitAction={eveningSelectionFormActions.deselectEvening}
                            />
                            <NavPillsElement text="Elenco tavoli" active={true}/>
                        </NavPills>
                    </Column>
                </Row>,
                <Row key="coverCharge" topSpaced>
                    <Column>
                        <FloatEditor
                            label="Coperto"
                            descriptor={EveningEditor.getCoverChargeDescriptor()}
                            value={props.evening.coverCharge}
                            commitAction={eveningEditorActions.updateCoverCharge.bind(eveningEditorActions, props.evening.uuid)}/>
                    </Column>
                </Row>,
                <Row key="tables" topSpaced>
                    <Column>
                        <PaginatedEntitiesList
                            entities={props.evening.diningTables}
                            renderer={diningTableRenderer}
                            selectMethod={diningTablesEditorActions.selectDiningTable}
                            deselectMethod={diningTablesEditorActions.deselectDiningTable}
                        />
                    </Column>
                </Row>,
                <Row key="new" topSpaced>
                    <Column centered={true}>
                        <Button
                            text="Nuovo tavolo"
                            size="lg"
                            type="success"
                            commitAction={diningTablesCreatorActions.beginDiningTableCreation}
                        />
                    </Column>
                </Row>]);
        } else {
            return <DiningTableCreator
                data={EveningEditor.makeDiningTableCreatorProps(props)}
            />;
        }

    }

    static makeDiningTableEditorProps(props) {
        return {
            diningTable: findByUuid(props.evening.diningTables, props.selectedDiningTable),
            waiters: props.waiters,
            tables: props.tables,
            categories: props.categories,
            dishes: props.dishes,
            phases: props.phases,
            additions: props.additions,

            selectedOrdination: props.selectedOrdination,
            editingOrdination: props.editingOrdination,
            createdOrdination: props.createdOrdination
        };
    }

    static makeDiningTableCreatorProps(props) {
        return {
            tables: props.tables,
            waiters: props.waiters,
            diningTable: props.createdDiningTable
        };
    }

    static getCoverChargeDescriptor() {
        return {
            name: "coverCharge",
            label: "Coperto",
            unit: "€",
            isForNav: true
        }
    }

    renderDiningTable(dt) {
        const table = this.props.data.tables.find(t => t.uuid === dt.table);
        const waiter = this.props.data.waiters.find(w => w.uuid === dt.waiter);
        return DiningTableEditor.renderDiningTable(table, waiter, dt);
    }
}