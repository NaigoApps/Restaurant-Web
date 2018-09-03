import React from 'react';
import {iGet} from "../../../utils/Utils";
import DiningTableDataEditor from "./DiningTableDataEditor";
import DiningTableBillsReview from "../tables/DiningTableBillsReview";
import Row from "../../../widgets/Row";
import GraphWizard from "../../../components/widgets/wizard/graph-wizard/GraphWizard";
import SelectWizardPage from "../../../components/widgets/wizard/SelectWizardPage";
import Column from "../../../widgets/Column";
import Button from "../../../widgets/Button";
import {DiningTableEditorMode} from "./DiningTableEditorStore";
import ConfirmModal from "../../../widgets/ConfirmModal";
import {DiningTablesEditorActions} from "./DiningTablesEditorActions";
import DiningTablesUtils from "../tables/DiningTablesUtils";
import {DiningTablesClosingActions} from "./tableClosingFeature/DiningTablesClosingActions";
import DiningTableClosingWizard from "./tableClosingFeature/DiningTableClosingWizard";
import {OrdinationsEditorActions} from "./ordinationsEditing/OrdinationsEditorActions";
import OrdinationsUtils from "../OrdinationsUtils";
import SelectInput from "../../../components/widgets/inputs/SelectInput";
import {OrdersActions} from "./ordinationsEditing/ordersEditing/OrdersActions";
import {OrdinationsCreatorActions} from "./ordinationsEditing/OrdinationsCreatorActions";
import DiningTableReview from "../tables/DiningTableReview";
import OrdinationEditor from "./ordinationsEditing/OrdinationEditor";
import BillReview from "../tables/BillReview";
import BillPrintWizard from "./BillPrintWizard";
import EditorMode from "../../../utils/EditorMode";

export default class DiningTableEditor extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let data = this.props.data;
        const content = this.buildContent();
        const side = this.buildSide();
        let editorMode = iGet(data, "diningTableEditing.editorMode");

        return <Row grow>
            <Column>{content}</Column>
            <Column sm="4">
                <Row>
                    <Column>
                        <Button text="Opzioni tavolo"
                                active={editorMode === DiningTableEditorMode.DATA}
                                commitAction={() => DiningTablesEditorActions.beginDataEditing()}
                                fill
                        />
                    </Column>
                    <Column>
                        <Button text="Gestione comande"
                                active={editorMode === DiningTableEditorMode.ORDINATIONS}
                                commitAction={() => DiningTablesEditorActions.beginOrdinationsEditing()}
                                fill
                        />
                    </Column>
                    <Column>
                        <Button text="Gestione conti"
                                active={editorMode === DiningTableEditorMode.BILLS}
                                commitAction={() => DiningTablesEditorActions.beginBillsEditing()}
                                fill
                        />
                    </Column>
                </Row>
                <Row grow topSpaced>
                    <Column>
                        {side}
                    </Column>
                </Row>
            </Column>
        </Row>
    }

    buildContent() {
        let data = this.props.data;
        let editorMode = iGet(data, "diningTableEditing.editorMode");

        switch (editorMode) {
            case DiningTableEditorMode.ORDINATIONS:
                return this.buildOrdinationsContent();
            case DiningTableEditorMode.DATA:
                return <DiningTableReview data={data}/>;
            case DiningTableEditorMode.BILLS:
                return this.buildBillsContent();
        }
    }

    buildOrdinationsContent() {
        let data = this.props.data;
        let ordinationsEditorStatus = iGet(data, "ordinationEditing.status");

        switch (ordinationsEditorStatus) {
            case EditorMode.SURFING:
                return <DiningTableReview data={data}/>;
            case EditorMode.CREATING:
                return <OrdinationEditor data={data} actionsProvider={OrdinationsCreatorActions}/>;
            case EditorMode.EDITING:
                return <OrdinationEditor data={data} actionsProvider={OrdinationsEditorActions}/>;
        }

        return <div/>;
    }

    buildBillsContent() {
        let data = this.props.data;
        const closingFeature = data.get('tableClosingFeature');

        if (closingFeature.get('isEditing')()) {
            return <BillReview data={data}/>;
        } else {
            return <DiningTableBillsReview data={data}/>;
        }
    }

    buildSide() {
        let data = this.props.data;
        let editorMode = iGet(data, "diningTableEditing.editorMode");

        switch (editorMode) {
            case DiningTableEditorMode.ORDINATIONS:
                return this.buildOrdinationSide();
            case DiningTableEditorMode.DATA:
                return this.buildReviewSide();
            case DiningTableEditorMode.BILLS:
                return this.buildBillSide();
        }

        return <div/>

    }

    buildOrdinationSide() {
        let data = this.props.data;
        let table = iGet(data, "diningTableEditing.diningTable");
        let ordination = iGet(data, "ordinationEditing.ordination");
        let status = iGet(data, "ordinationEditing.status");

        if (ordination && status === EditorMode.EDITING) {
            const isDeleting = iGet(data, "ordinationEditing.deletingOrdination");
            return DiningTableEditor.buildOrdinationButtons(table, ordination, isDeleting);
        }else{
            const page = iGet(data, "ordinationEditing.page");
            const ordinations = table.get('ordinations');
            return DiningTableEditor.buildOrdinationsList(ordinations.sort(OrdinationsUtils.ordinationDateSorter), page);
        }
    }

    static buildOrdinationsList(ordinations, page) {
        return <Row grow>
            <Column>
                <Row>
                    <Column>
                        <Button
                            text="Nuova comanda"
                            icon="plus"
                            size="lg"
                            type="success"
                            commitAction={() => OrdinationsCreatorActions.beginOrdinationCreation()}
                            textRows="5"
                        />
                    </Column>
                </Row>
                <Row ofList grow>
                    <Column>
                        <SelectInput
                            id={ordination => ordination.get("uuid")}
                            onSelectPage={page => OrdinationsEditorActions.selectOrdinationPage(page)}
                            onSelect={ordination => OrdinationsEditorActions.beginOrdinationEditing(ordination)}
                            onDeselect={OrdinationsEditorActions.abortOrdinationEditing}
                            selected={null}
                            page={page}
                            rows={6}
                            cols={1}
                            options={ordinations}
                            renderer={ordination => OrdinationsUtils.renderOrdination(ordination)}
                        />
                    </Column>
                </Row>
            </Column>
        </Row>;
    }

    static buildOrdinationButtons(table, ordination, isDeleting) {
        return <Row>
            <Column>
                <Row>
                    <Column auto>
                        <Button
                            text="Torna ad elenco comande"
                            icon="level-up"
                            size="lg"
                            commitAction={() => OrdinationsEditorActions.abortOrdinationEditing()}
                            fullHeight/>
                    </Column>
                </Row>
                <Row ofList>
                    <Column>
                        <Button
                            text="Modifica comanda"
                            icon="pencil"
                            size="lg"
                            type="warning"
                            commitAction={() => OrdersActions.beginOrdersEditing(ordination.get('orders'))}
                            fullHeight/>
                    </Column>
                </Row>
                <Row ofList>
                    <Column>
                        <Button text="Stampa comanda"
                                icon="print"
                                size="lg"
                                type={ordination && ordination.get('dirty') ? "warning" : "secondary"}
                                commitAction={() => OrdinationsEditorActions.printOrdination(ordination.get('uuid'))}
                                fullHeight/>
                    </Column>
                </Row>
                <Row ofList>
                    <Column>
                        <Button
                            text="Annullamento comanda"
                            icon="times-circle"
                            type="danger"
                            size="lg"
                            commitAction={() => OrdinationsEditorActions.abortOrdination(ordination.get('uuid'))}
                            fullHeight/>
                    </Column>
                </Row>
                <Row ofList>
                    <Column>
                        <Button text="Elimina comanda"
                                icon="trash"
                                type="danger"
                                size="lg"
                                commitAction={() => OrdinationsEditorActions.beginOrdinationDeletion()}
                                fullHeight/>
                    </Column>
                </Row>
                <ConfirmModal
                    visible={isDeleting}
                    message="Elminare la comanda e tutti gli ordini associati?"
                    abortType="secondary"
                    confirmType="danger"
                    abortAction={() => OrdinationsEditorActions.abortOrdinationDeletion()}
                    confirmAction={() => OrdinationsEditorActions.deleteOrdination(table.get('uuid'), ordination.get('uuid'))}/>
            </Column>
        </Row>
    }

    buildReviewSide() {
        let data = this.props.data;

        let waiters = iGet(data, "waiters");
        let tables = iGet(data, "tables");

        let table = iGet(data, "diningTableEditing.diningTable");

        return <Row grow>
            <Column>
                <Row grow>
                    <Column>
                        <DiningTableDataEditor data={data} actionsProvider={DiningTablesEditorActions}/>
                    </Column>
                </Row>
                <Row topSpaced ofList>
                    <Column>
                        <Button
                            text="Chiudi tavolo"
                            icon="archive"
                            size="lg"
                            type={DiningTablesUtils.isTableCloseable(table) ? "success" : "danger"}
                            disabled={!DiningTablesUtils.isTableAlmostCloseable(table)}
                            commitAction={() => DiningTablesClosingActions.beginLocking()}/>
                    </Column>
                </Row>
                <Row topSpaced ofList>
                    <Column>
                        <Button
                            text="Fondi tavolo"
                            icon="handshake-o"
                            size="lg"
                            type="warning"
                            disabled={!this.canMerge()}
                            commitAction={() => DiningTablesEditorActions.beginDiningTableMerge()}/>
                    </Column>
                </Row>
                <Row ofList>
                    <Column>
                        <Button text="Elimina tavolo"
                                icon="trash"
                                type="danger"
                                size="lg"
                                commitAction={() => DiningTablesEditorActions.beginDeletion()}/>
                    </Column>
                </Row>
                <ConfirmModal
                    visible={iGet(data, "tableClosingFeature.lockingTable")}
                    message={this.getClosingMessage(table)}
                    abortType="secondary"
                    confirmType={DiningTablesUtils.isTableCloseable(table) ? "success" : "warning"}
                    abortAction={() => DiningTablesClosingActions.abortLocking()}
                    confirmAction={() => DiningTablesClosingActions.lockTable(table.get('uuid'))}/>
                <ConfirmModal
                    visible={iGet(data, "diningTableEditing.deletingDiningTable")}
                    message="Elminare il tavolo?"
                    abortType="secondary"
                    confirmType="danger"
                    abortAction={() => DiningTablesEditorActions.abortDeletion()}
                    confirmAction={() => DiningTablesEditorActions.deleteDiningTable(table.get('uuid'))}/>
                <GraphWizard
                    isValid={() => !!iGet(data, "diningTableEditing.mergeEditor.target")}
                    page="select_page"
                    size="lg"
                    visible={iGet(data, "diningTableEditing.mergeEditor.visible")}
                    message="Scegliere il tavolo destinazione"
                    commitAction={() => DiningTablesEditorActions.confirmMerge(
                        iGet(data, "diningTableEditing.diningTable.uuid"),
                        iGet(data, "diningTableEditing.mergeEditor.target"))}
                    abortAction={() => DiningTablesEditorActions.abortMerge()}>
                    <SelectWizardPage
                        rows={5}
                        cols={3}
                        identifier="select_page"
                        id={table => table.get('uuid')}
                        options={this.otherOpenTables()}
                        renderer={table => DiningTablesUtils.renderDiningTable(table, tables, waiters)}
                        selected={iGet(data, "diningTableEditing.mergeEditor.target")}
                        page={iGet(data, "diningTableEditing.mergeEditor.page")}
                        onSelect={uuid => DiningTablesEditorActions.selectMergeTarget(uuid)}
                        onSelectPage={page => DiningTablesEditorActions.selectMergePage(page)}
                        final
                    />
                </GraphWizard>
            </Column>
        </Row>;
    }

    getClosingMessage(table){
        if(DiningTablesUtils.isTableCloseable(table)){
            return "Chiudere il tavolo?";
        }else{
            return "Chiudere il tavolo? Vi sono conti non ancora contabilizzati";
        }
    }

    buildBillSide() {
        const data = this.props.data;
        const editingFeature = iGet(data, "diningTableEditing");
        const closingFeature = iGet(data, "tableClosingFeature");
        let bill = closingFeature.get('bill');
        let sideContent;
        if (closingFeature.get('isEditing')()) {
            sideContent = DiningTableEditor.buildBillButtons(data);
        }else{
            sideContent = DiningTableEditor.buildBillsList(data);
        }
        return <Row>
            <Column>
                {sideContent}
            </Column>
            <DiningTableClosingWizard
                confirmAction={bill => DiningTableEditor.confirmBill(editingFeature, closingFeature)}
                visible={!!iGet(closingFeature, "closingWizard.visible")}
                data={data}/>
        </Row>
    }

    static buildBillsList(data){
        const editingFeature = data.get('diningTableEditing');
        const closingFeature = data.get('tableClosingFeature');
        const bills = iGet(editingFeature, 'diningTable.bills');
        const billsPage = closingFeature.get('billPage');
        const customers = data.get('customers');
        const table = editingFeature.get('diningTable');
        return <Row grow>
            <Column>
                <Row>
                    <Column>
                        <Button
                            text="Nuovo conto"
                            icon="plus"
                            size="lg"
                            type="success"
                            disabled={DiningTablesUtils.hasZeroPrices(table) || DiningTablesUtils.isTableAlmostCloseable(table)}
                            commitAction={() => DiningTablesClosingActions.beginClosing()}
                            textRows="5"
                        />
                    </Column>
                </Row>
                <Row ofList grow>
                    <Column>
                        <SelectInput
                            id={bill => bill.get("uuid")}
                            onSelectPage={page => DiningTablesClosingActions.selectBillPage(page)}
                            onSelect={bill => DiningTablesClosingActions.selectBill(bill)}
                            onDeselect={() => DiningTablesClosingActions.deselectBill()}
                            selected={null}
                            page={billsPage}
                            rows={6}
                            cols={1}
                            options={bills}
                            renderer={bill => DiningTablesUtils.renderBill(bill, customers)}
                        />
                    </Column>
                </Row>
            </Column>
        </Row>;
    }

    static buildBillButtons(data) {
        const editingFeature = data.get('diningTableEditing');
        const closingFeature = data.get('tableClosingFeature');
        const table = editingFeature.get('diningTable');
        const bill = closingFeature.get('bill');
        const customers = data.get('customers');
        const isDeleting = closingFeature.get('deletingBill');
        const printWizard = closingFeature.get('printWizard');

        return <Row>
            <Column>
                <Row>
                    <Column auto>
                        <Button
                            text="Torna ad elenco conti"
                            icon="level-up"
                            size="lg"
                            type="secondary"
                            commitAction={() => DiningTablesClosingActions.deselectBill()}
                            fullHeight/>
                    </Column>
                </Row>
                <Row ofList>
                    <Column>
                        <Button
                            text="Modifica conto"
                            icon="pencil"
                            size="lg"
                            type="warning"
                            commitAction={() => DiningTablesClosingActions.beginBillEditing()}
                            fullHeight/>
                    </Column>
                </Row>
                <Row ofList>
                    <Column>
                        <Button
                            text="Stampa pre-conto"
                            icon="print"
                            size="lg"
                            type="success"
                            commitAction={() => DiningTablesEditorActions.printPartialBill(bill.get('uuid'))}
                            fullHeight/>
                    </Column>
                </Row>
                <Row ofList>
                    <Column>
                        <Button text="Stampa conto"
                                icon="print"
                                size="lg"
                                type={!bill.get('printed') ? "warning" : "secondary"}
                                commitAction={() => DiningTablesClosingActions.beginBillPrinting()}/>
                    </Column>
                </Row>
                <Row ofList>
                    <Column>
                        <Button text="Elimina conto"
                                icon="trash"
                                type="danger"
                                size="lg"
                                commitAction={() => DiningTablesClosingActions.beginBillDeletion()}/>
                    </Column>
                </Row>
                <ConfirmModal
                    visible={isDeleting}
                    message="Elminare il conto?"
                    abortType="secondary"
                    confirmType="danger"
                    abortAction={() => DiningTablesClosingActions.abortBillDeletion()}
                    confirmAction={() => DiningTablesClosingActions.deleteBill(table.get('uuid'), bill.get('uuid'))}/>
                <BillPrintWizard data={data}/>
            </Column>
        </Row>
    }

    isCurrentBillEditable() {
        let data = this.props.data;
        let bill = iGet(data, "tableClosingFeature.bill");
        return bill && !bill.get('progressive');
    }

    static confirmBill(editingFeature, closingFeature) {
        if (closingFeature.get('isCreating')()){
            DiningTablesClosingActions.createBill(iGet(editingFeature, 'diningTable.uuid'), closingFeature.get('bill'));
        } else if (closingFeature.get('isEditing')()) {
            DiningTablesClosingActions.updateBill(iGet(editingFeature, 'diningTable.uuid'), closingFeature.get('bill'));
        }
    }

    canMerge() {
        return this.otherOpenTables().size > 0;
    }

    otherOpenTables() {
        let data = this.props.data;
        let table = iGet(data, "diningTableEditing.diningTable");

        return data.get('evening').get('diningTables')
            .filter(t => t.get('status') !== "CHIUSO")
            .filter(t => t.get('uuid') !== table.get('uuid'));
    }
}