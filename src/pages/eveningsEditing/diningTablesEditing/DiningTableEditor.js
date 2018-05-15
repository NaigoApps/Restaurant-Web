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
import {DiningTablesClosingActions} from "./diningTableClosing/DiningTablesClosingActions";
import DiningTableClosingWizard from "./diningTableClosing/DiningTableClosingWizard";
import {OrdinationsEditorActions} from "./ordinationsEditing/OrdinationsEditorActions";
import OrdinationsUtils from "../OrdinationsUtils";
import SelectInput from "../../../components/widgets/inputs/SelectInput";
import {OrdersActions} from "./ordinationsEditing/ordersEditing/OrdersActions";
import {OrdinationsCreatorActions} from "./ordinationsEditing/OrdinationsCreatorActions";
import {EditorStatus} from "../../StoresUtils";
import DiningTableReview from "../tables/DiningTableReview";
import OrdinationEditor from "./ordinationsEditing/OrdinationEditor";
import BillReview from "../tables/BillReview";

export default class DiningTableEditor extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let data = this.props.data;
        let content = this.buildContent();
        let editorMode = iGet(data, "diningTablesEditing.editorMode");

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
                <Row grow>
                    <Column>
                        {this.buildActions()}
                    </Column>
                </Row>
            </Column>
        </Row>
    }

    buildContent() {
        let data = this.props.data;
        let editorMode = iGet(data, "diningTablesEditing.editorMode");

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
            case EditorStatus.SURFING:
                return <DiningTableReview data={data}/>;
            case EditorStatus.CREATING:
                return <OrdinationEditor data={data} actionsProvider={OrdinationsCreatorActions}/>;
            case EditorStatus.EDITING:
                return <OrdinationEditor data={data} actionsProvider={OrdinationsEditorActions}/>;
        }

        return <div/>;
    }

    buildBillsContent() {
        let data = this.props.data;
        let bill = iGet(data, "diningTableClosing.selectedBill");

        if (bill) {
            return <BillReview data={data}/>;
        } else {
            return <DiningTableBillsReview data={data}/>;
        }
    }

    buildActions() {
        let data = this.props.data;
        let editorMode = iGet(data, "diningTablesEditing.editorMode");

        switch (editorMode) {
            case DiningTableEditorMode.ORDINATIONS:
                return this.buildOrdinationActions();
            case DiningTableEditorMode.DATA:
                return this.buildReviewActions();
            case DiningTableEditorMode.BILLS:
                return this.buildBillActions();
        }

        return <div/>

    }

    buildOrdinationActions() {
        let data = this.props.data;
        let ordination = iGet(data, "ordinationEditing.ordination");
        let table = iGet(data, "diningTablesEditing.diningTable");
        let tableUuid = table.get('uuid');
        let ordinationUuid = ordination ? ordination.get('uuid') : null;
        let ordinationsListPage = iGet(data, "ordinationEditing.page");

        return <Row grow topSpaced>
            <Column>
                <Row grow>
                    <Column>
                        <Button
                            text="Nuova comanda"
                            icon="plus"
                            size="lg"
                            type="info"
                            commitAction={() => OrdinationsCreatorActions.beginOrdinationCreation()}
                            fill
                        />
                    </Column>
                </Row>
                <Row ofList>
                    <Column>
                        <SelectInput
                            id={ordination => ordination.get("uuid")}
                            onSelectPage={page => OrdinationsEditorActions.selectOrdinationPage(page)}
                            onSelect={ordination => OrdinationsEditorActions.beginOrdinationEditing(ordination)}
                            onDeselect={OrdinationsEditorActions.abortOrdinationEditing}
                            selected={ordination ? ordination.get('uuid') : null}
                            page={ordinationsListPage}
                            rows={4}
                            cols={1}
                            options={table.get('ordinations').sort(OrdinationsUtils.ordinationDateSorter)}
                            renderer={ordination => OrdinationsUtils.renderOrdination(ordination)}
                        />
                    </Column>
                </Row>
                <Row topSpaced>
                    <Column>
                        <Button
                            text="Modifica comanda"
                            icon="pencil"
                            size="lg"
                            disabled={!ordination}
                            commitAction={() => OrdersActions.beginOrdersEditing(ordination.get('orders'))}
                            fullHeight/>
                    </Column>
                </Row>
                <Row ofList>
                    <Column>
                        <Button text="Stampa comanda"
                                icon="print"
                                size="lg"
                                disabled={!ordination}
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
                            disabled={!ordination}
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
                                disabled={!ordination}
                                commitAction={() => OrdinationsEditorActions.beginOrdinationDeletion()}
                                fullHeight/>
                    </Column>
                </Row>
                <ConfirmModal
                    visible={iGet(data, "ordinationEditing.deletingOrdination")}
                    message="Elminare la comanda e tutti gli ordini associati?"
                    abortType="secondary"
                    confirmType="danger"
                    abortAction={() => OrdinationsEditorActions.abortOrdinationDeletion()}
                    confirmAction={() => OrdinationsEditorActions.deleteOrdination(tableUuid, ordinationUuid)}/>
            </Column>
        </Row>;
    }

    buildReviewActions() {
        let data = this.props.data;

        let table = iGet(data, "diningTablesEditing.diningTable");

        return <Row grow topSpaced>
            <Column>
                <Row grow>
                    <Column>
                        <DiningTableDataEditor data={data} actionsProvider={DiningTablesEditorActions}/>
                    </Column>
                </Row>
                <Row topSpaced ofList>
                    <Column>
                        <Button
                            text="Fondi tavolo"
                            icon="handshake-o"
                            size="lg"
                            type="info"
                            disabled={() => this.canMerge()}
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
            </Column>
        </Row>;
    }


    buildBillActions() {
        let data = this.props.data;
        let tables = data.get('tables');
        let waiters = data.get('waiters');

        let table = iGet(data, "diningTablesEditing.diningTable");
        let tableUuid = table.get('uuid');

        let bill = iGet(data, "diningTableClosing.selectedBill");
        let billUuid = bill ? bill.get('uuid') : null;

        let billsListPage = iGet(data, "diningTableClosing.page");

        let closingWizard;
        if (bill) {
            closingWizard = <DiningTableClosingWizard
                confirmAction={bill => this.confirmBill(bill)}
                visible={!!iGet(data, "diningTableClosing.wizardVisible")}
                data={data}/>;
        }

        return <Row grow topSpaced>
            <Column>
                <Row grow>
                    <Column>
                        <Button
                            text="Nuovo conto"
                            icon="plus"
                            size="lg"
                            type="info"
                            disabled={this.isCurrentTableClosable()}
                            commitAction={() => DiningTablesClosingActions.beginClosing()}
                            fill
                        />
                    </Column>
                </Row>
                <Row ofList>
                    <Column>
                        <SelectInput
                            id={bill => bill.get("uuid")}
                            onSelectPage={page => DiningTablesClosingActions.selectBillPage(page)}
                            onSelect={bill => DiningTablesClosingActions.selectBill(bill)}
                            onDeselect={() => DiningTablesClosingActions.deselectBill()}
                            selected={bill ? bill.get('uuid') : null}
                            page={billsListPage}
                            rows={4}
                            cols={1}
                            options={table.get('bills')}
                            renderer={bill => DiningTablesUtils.renderBill(bill, data.get('customers'))}
                        />
                    </Column>
                </Row>
                <Row topSpaced>
                    <Column>
                        <Button
                            text="Modifica conto"
                            icon="pencil"
                            size="lg"
                            type="warning"
                            disabled={!bill}
                            commitAction={() => DiningTablesClosingActions.beginBillEditing()}
                            fullHeight/>
                    </Column>
                </Row>
                <Row topSpaced ofList>
                    <Column>
                        <Button
                            text="Stampa pre-conto"
                            icon="print"
                            size="lg"
                            type="success"
                            disabled={!bill}
                            commitAction={() => DiningTablesEditorActions.printPartialBill(bill.get('uuid'))}
                            fullHeight/>
                    </Column>
                </Row>
                <Row ofList>
                    <Column>
                        <Button text="Stampa conto"
                                icon="print"
                                size="lg"
                                type={bill && !bill.get('printed') ? "warning" : "secondary"}
                                commitAction={() => DiningTablesClosingActions.beginBillPrinting(bill.get('uuid'))}
                                disabled={!bill}/>
                    </Column>
                </Row>
                <Row ofList>
                    <Column>
                        <Button text="Elimina conto"
                                icon="trash"
                                type="danger"
                                size="lg"
                                commitAction={() => DiningTablesClosingActions.beginBillDeletion()}
                                disabled={!bill}/>
                    </Column>
                </Row>
                <ConfirmModal
                    visible={iGet(data, "diningTableClosing.deletingBill")}
                    message="Elminare il conto?"
                    abortType="secondary"
                    confirmType="danger"
                    abortAction={() => DiningTablesClosingActions.abortBillDeletion()}
                    confirmAction={() => DiningTablesClosingActions.deleteBill(tableUuid, billUuid)}/>
                {closingWizard}
                <GraphWizard
                    isValid={() => !!iGet(data, "diningTablesEditing.mergeEditor.value")}
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
                        options={this.otherOpenTables()}
                        renderer={table => DiningTablesUtils.renderDiningTable(table, tables, waiters)}
                        selected={iGet(data, "diningTablesEditing.mergeEditor.value")}
                        page={iGet(data, "diningTablesEditing.mergeEditor.page")}
                        onSelect={uuid => DiningTablesEditorActions.selectMergeTarget(uuid)}
                        onSelectPage={page => DiningTablesEditorActions.selectMergePage(page)}
                        final
                    />
                </GraphWizard>
                <GraphWizard
                    page="customer_page"
                    size="lg"
                    visible={iGet(data, "diningTableClosing.printWizard.visible")}
                    message="Stampa conto"
                    commitAction={() => DiningTablesClosingActions.printBill(
                        iGet(data, "diningTableClosing.selectedBill.uuid"),
                        iGet(data, "diningTableClosing.printWizard.customer"))}
                    abortAction={() => DiningTablesClosingActions.abortBillPrinting()}>
                    <SelectWizardPage
                        rows={5}
                        cols={3}
                        identifier="customer_page"
                        id={customer => customer.get('uuid')}
                        options={data.get('customers')}
                        renderer={customer => DiningTablesUtils.renderCustomer(customer)}
                        selected={iGet(data, "diningTableClosing.printWizard.customer")}
                        page={iGet(data, "diningTableClosing.printWizard.page")}
                        onSelect={uuid => DiningTablesClosingActions.selectInvoiceCustomer(uuid)}
                        onDeselect={() => DiningTablesClosingActions.selectInvoiceCustomer(null)}
                        onSelectPage={page => DiningTablesClosingActions.selectInvoiceCustomerPage(page)}
                        final
                    />
                </GraphWizard>
            </Column>
        </Row>;
    }

    isCurrentTableClosable(){
        let data = this.props.data;
        let table = iGet(data, "diningTablesEditing.diningTable");
        return table && DiningTablesUtils.findTableOpenedCoverCharges(table) === 0 &&
            DiningTablesUtils.findTableOpenedOrders(table).size === 0;
    }

    isCurrentBillEditable(){
        let data = this.props.data;
        let bill = iGet(data, "diningTableClosing.selectedBill");
        return bill && !bill.get('progressive');
    }

    confirmBill(bill) {
        let data = this.props.data;
        let tableUuid = iGet(data, "diningTablesEditing.diningTable.uuid");
        let editorStatus = iGet(data, "diningTableClosing.editorStatus");
        if (editorStatus === EditorStatus.CREATING) {
            DiningTablesClosingActions.createBill(tableUuid, bill);
        } else if (editorStatus === EditorStatus.EDITING) {
            DiningTablesClosingActions.updateBill(tableUuid, bill);
        }
    }

    canMerge() {
        return this.otherOpenTables().size > 0;
    }

    otherOpenTables() {
        let data = this.props.data;
        let table = iGet(data, "diningTablesEditing.diningTable");

        return data.get('evening').get('diningTables')
            .filter(t => t.get('status') !== "CHIUSO")
            .filter(t => t.get('uuid') !== table.get('uuid'));
    }
}