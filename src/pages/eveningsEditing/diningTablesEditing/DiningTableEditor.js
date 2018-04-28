import React from 'react';
import {findByUuid, iGet} from "../../../utils/Utils";
import DiningTableReview from "../tables/DiningTableReview";
import DiningTableDataEditor from "./DiningTableDataEditor";
import DiningTableBillsEditor from "../tables/DiningTableBillsEditor";
import {OrdinationsCreatorActions} from "./ordinationsEditing/OrdinationsCreatorActions";
import Row from "../../../widgets/Row";
import GraphWizard from "../../../components/widgets/wizard/graph-wizard/GraphWizard";
import SelectWizardPage from "../../../components/widgets/wizard/SelectWizardPage";
import Column from "../../../widgets/Column";
import Button from "../../../widgets/Button";
import {DiningTableEditorMode} from "./DiningTableEditorStore";
import ConfirmModal from "../../../widgets/ConfirmModal";
import {DiningTablesEditorActions} from "./DiningTablesEditorActions";
import DiningTablesUtils from "../tables/DiningTablesUtils";
import {DiningTablesClosingActions} from "./diningTableClosing/DiningTablesClosingActions";
import DiningTableClosingView from "./diningTableClosing/DiningTableClosingView";
import {OrdinationsEditorActions} from "./ordinationsEditing/OrdinationsEditorActions";

export default class DiningTableEditor extends React.Component {
    constructor(props) {
        super(props);
    }

    getOrdersEditor(ordination) {
        let props = this.props.data;
        let ordersEditor = ordination.get('orders').map(o => {
            return <div className="row">{findByUuid(props.get('dishes'), o.get('dish')).get('name')}</div>;
        });
        return <div>
            {ordersEditor}
        </div>;
    }


    render() {
        let content = this.buildContent();

        return <Row grow>
            <Column>{content}</Column>
            <Column sm="3">{this.getReviewActions()}</Column>
        </Row>
    }

    buildContent() {
        let data = this.props.data;
        let editorMode = iGet(data, "diningTablesEditing.editorMode");
        switch (editorMode) {
            case DiningTableEditorMode.ORDINATIONS:
                return <DiningTableReview data={data}/>;
            case DiningTableEditorMode.DATA:
                return <DiningTableDataEditor data={data} actionsProvider={DiningTablesEditorActions}/>;
            case DiningTableEditorMode.BILLS:
                return <DiningTableBillsEditor data={data}/>;
        }
    }

    getReviewActions() {
        let data = this.props.data;
        let editorMode = iGet(data, "diningTablesEditing.editorMode");
        let table = iGet(data, "diningTablesEditing.diningTable");

        let tables = iGet(data, "tables");
        let waiters = iGet(data, "waiters");

        let otherOpenTables = data.get('evening').get('diningTables')
            .filter(t => t.get('status') !== "CHIUSO")
            .filter(t => t.get('uuid') !== table.get('uuid'));

        let btn = <Button
            text="Nuova comanda"
            icon="plus"
            type="info"
            size="lg"
            commitAction={() => OrdinationsCreatorActions.beginOrdinationCreation()}
            fill/>;

        if (editorMode === DiningTableEditorMode.BILLS) {
            btn = <Button
                text="Nuovo conto"
                icon="plus"
                type="info"
                size="lg"
                commitAction={() => DiningTablesClosingActions.beginClosing()}
                disabled={DiningTablesUtils.hasZeroPrices(table)}
                fill/>
        }

        return <Row grow>
            <Column>
                <Row>
                    <Column>
                        <h5 className="text-center">Azioni sul tavolo</h5>
                    </Column>
                </Row>
                <Row grow>
                    <Column>
                        {btn}
                    </Column>
                </Row>
                <Row ofList>
                    <Column>
                        <Button text="Dati"
                                active={editorMode === DiningTableEditorMode.DATA}
                                commitAction={() => DiningTablesEditorActions.beginDataEditing()}/>
                    </Column>
                </Row>
                <Row ofList>
                    <Column>
                        <Button text="Comande"
                                active={editorMode === DiningTableEditorMode.ORDINATIONS}
                                commitAction={() => DiningTablesEditorActions.beginOrdinationsEditing()}/>
                    </Column>
                </Row>
                <Row ofList>
                    <Column>
                        <Button text="Conti"
                                active={editorMode === DiningTableEditorMode.BILLS}
                                commitAction={() => DiningTablesEditorActions.beginBillsEditing()}/>
                    </Column>
                </Row>
                <Row topSpaced ofList>
                    <Column>
                        <Button
                            text="Stampa pre-conto"
                            icon="print"
                            size="lg"
                            type="info"
                            commitAction={() => DiningTablesEditorActions.printPartialBill(table.get('uuid'))}
                            fullHeight/>
                    </Column>
                </Row>
                <Row topSpaced ofList>
                    <Column>
                        <Button
                            text="Fondi tavolo"
                            icon="handshake-o"
                            size="lg"
                            type="info"
                            commitAction={() => DiningTablesEditorActions.beginMerge()}
                            fullHeight/>
                    </Column>
                </Row>
                <Row ofList>
                    <Column>
                        <Button text="Elimina tavolo"
                                icon="trash"
                                type="danger"
                                size="lg"
                                commitAction={() => DiningTablesEditorActions.beginDeletion()}
                                fullHeight/>
                    </Column>
                </Row>
                <ConfirmModal
                    visible={iGet(data, "diningTablesEditing.deletingDiningTable")}
                    message="Elminare il tavolo?"
                    abortType="secondary"
                    confirmType="danger"
                    abortAction={() => DiningTablesEditorActions.abortDeletion()}
                    confirmAction={() => DiningTablesEditorActions.deleteDiningTable(table.get('uuid'))}/>
                <DiningTableClosingView
                    visible={!!iGet(data, "diningTableClosing.wizardVisible")}
                    data={data}/>
                <GraphWizard
                    isValid={() => !!iGet(data, "diningTablesEditing.mergeEditor.value")}
                    hideReview={true}
                    auto={true}
                    page="select_page"
                    size="lg"
                    visible={iGet(data, "diningTablesEditing.mergeEditor.visible")}
                    message="Scegliere il tavolo destinazione"
                    commitAction={() => DiningTablesEditorActions.confirmMerge(
                        iGet(data, "diningTablesEditing.diningTable.uuid"),
                        iGet(data, "diningTablesEditing.mergeEditor.value"))}
                    abortAction={() => DiningTablesEditorActions.abortMerge()}>
                    <SelectWizardPage
                        rows={5}
                        cols={3}
                        identifier="select_page"
                        id={table => table.get('uuid')}
                        options={otherOpenTables}
                        renderer={table => DiningTablesUtils.renderDiningTable(table, tables, waiters)}
                        selected={iGet(data, "diningTablesEditing.mergeEditor.value")}
                        page={iGet(data, "diningTablesEditing.mergeEditor.page")}
                        onSelect={uuid => DiningTablesEditorActions.selectMergeTarget(uuid)}
                        onSelectPage={page => DiningTablesEditorActions.selectMergePage(page)}
                        final
                    />
                </GraphWizard>
            </Column>
        </Row>
    }

}