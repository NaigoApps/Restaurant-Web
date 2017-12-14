import React from 'react';
import diningTablesEditorActions from "./DiningTablesEditorActions";
import EntitySelectEditor from "../../components/widgets/inputs/EntitySelectEditor";
import IntegerEditor from "../../components/widgets/inputs/IntegerEditor";
import Button from "../../widgets/Button";
import {findByUuid} from "../../utils/Utils";
import {beautifyTime} from "../../components/widgets/inputs/DateInput";
import OrdinationEditor from "../../components/OrdinationEditor";
import ordinationsCreatorActions from "./OrdinationsCreatorActions";
import OrdinationCreator from "../../components/widgets/inputs/OrdinationCreator";
import ordinationsEditorActions from "./OrdinationsEditorActions";
import ButtonGroup from "../../widgets/ButtonGroup";
import OrdinationReview from "../../components/OrdinationReview";
import DiningTableReview from "./DiningTableReview";
import DiningTableEditor from "./DiningTableEditor";
import PaginatedEntitiesList from "../../components/widgets/PaginatedEntitiesList";
import NavPills from "../../widgets/NavPills";
import NavPillsElement from "../../widgets/NavElement";
import eveningSelectionFormActions from "../../actions/pages/EveningSelectionFormActions";
import diningTablesCreatorActions from "./DiningTablesCreatorActions";
import DiningTableCreator from "./DiningTableCreator";
import Row from "../../widgets/Row";
import Column from "../../widgets/Column";

export default class EveningEditor extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {

        const diningTables = this.props.diningTables;
        const selectedDiningTableUuid = this.props.selectedDiningTable;
        const createdDiningTable = this.props.createdDiningTable;

        if (selectedDiningTableUuid) {
            let selectedDiningTable = findByUuid(diningTables, selectedDiningTableUuid);
            return <DiningTableEditor
                tables={this.props.tables}
                waiters={this.props.waiters}
                ordinations={this.props.ordinations.filter(ord => selectedDiningTable && ord.table === selectedDiningTable.uuid)}
                categories={this.props.categories}
                dishes={this.props.dishes}
                phases={this.props.phases}
                additions={this.props.additions}
                diningTable={selectedDiningTable}
                selectedOrdination={this.props.selectedOrdination}
                editingOrdination={this.props.editingOrdination}
                createdOrdination={this.props.createdOrdination}
            />;
        } else if (!createdDiningTable) {
            let diningTableRenderer = {
                name: this.renderDiningTable.bind(this)
            };
            return (
                <Row>
                    <Column>
                        <Row>
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
                        </Row>
                        <Row>
                            <Column>
                                <PaginatedEntitiesList
                                    entities={this.props.diningTables}
                                    renderer={diningTableRenderer}
                                    selectMethod={diningTablesEditorActions.selectDiningTable}
                                    deselectMethod={diningTablesEditorActions.deselectDiningTable}
                                />
                            </Column>
                        </Row>
                        <Row>
                            <Column centered={true}>
                                <Button
                                    text="Nuovo tavolo"
                                    size="lg"
                                    type="success"
                                    commitAction={diningTablesCreatorActions.beginDiningTableCreation}
                                />
                            </Column>
                        </Row>
                    </Column>
                </Row>);
        } else {
            return <DiningTableCreator
                tables={this.props.tables}
                waiters={this.props.waiters}
                diningTable={createdDiningTable}
            />;
        }

    }

    renderDiningTable(dt) {
        const table = this.props.tables.find(t => t.uuid === dt.table);
        const tableName = table ? table.name : "";
        const waiter = this.props.waiters.find(w => w.uuid === dt.waiter);
        const waiterName = waiter ? waiter.name : "";
        const createTime = beautifyTime(dt.date);
        return createTime + " - " + tableName + " (" + waiterName + ")";
    }
}