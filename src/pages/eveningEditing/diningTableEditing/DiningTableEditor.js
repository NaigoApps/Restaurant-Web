import React from 'react';
import {iGet} from "../../../utils/Utils";
import DiningTableDataEditor from "./DiningTableDataEditor";
import DiningTableBillsReview from "../tables/DiningTableBillsReview";
import Row from "../../../widgets/Row";
import GraphWizard from "../../../components/widgets/wizard/graph-wizard/GraphWizard";
import SelectWizardPage from "../../../components/widgets/wizard/SelectWizardPage";
import Column from "../../../widgets/Column";
import Button from "../../../widgets/Button";
import {DiningTableEditorTabs} from "./DiningTableEditorStore";
import ConfirmModal from "../../../widgets/ConfirmModal";
import DiningTablesEditorActions from "./DiningTablesEditorActions";
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
import OrdinationsSection from "./ordinationsEditing/OrdinationsSection";
import BillsSection from "./tableClosingFeature/BillsSection";

export default class DiningTableEditor extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let data = this.props;
        const content = this.buildContent();
        const side = <div/>//this.buildSide();
        let tab = data.diningTableEditing.tab;

        return <Row grow>
            <Column>
                <Row>
                    <Column>
                        <Button text="Opzioni tavolo"
                                active={tab === DiningTableEditorTabs.DATA}
                                commitAction={() => DiningTablesEditorActions.selectTab(DiningTableEditorTabs.DATA)}
                                fill
                        />
                    </Column>
                    <Column>
                        <Button text="Gestione comande"
                                active={tab === DiningTableEditorTabs.ORDINATIONS}
                                commitAction={() => DiningTablesEditorActions.selectTab(DiningTableEditorTabs.ORDINATIONS)}
                                fill
                        />
                    </Column>
                    <Column>
                        <Button text="Gestione conti"
                                active={tab === DiningTableEditorTabs.BILLS}
                                commitAction={() => DiningTablesEditorActions.selectTab(DiningTableEditorTabs.BILLS)}
                                fill
                        />
                    </Column>
                </Row>
                <Row>
                    <Column>{content}</Column>
                </Row>
            </Column>
        </Row>
    }

    buildContent() {
        let data = this.props;
        let tab = data.diningTableEditing.tab;

        switch (tab) {
            case DiningTableEditorTabs.ORDINATIONS:
                return <OrdinationsSection {...data}/>;
            case DiningTableEditorTabs.DATA:
                return <DiningTableDataEditor {...data}/>;
            case DiningTableEditorTabs.BILLS:
                return <BillsSection {...data}/>;
        }
    }

    buildBillsContent() {
        return <div/>;
        let data = this.props;
        const closingFeature = data.get('tableClosingFeature');

        if (closingFeature.get('isEditing')()) {
            return <BillReview data={data}/>;
        } else {
            return <DiningTableBillsReview data={data}/>;
        }
    }

    buildSide() {
        let data = this.props;
        let tab = data.diningTableEditing.tab;

        switch (tab) {
            case DiningTableEditorTabs.ORDINATIONS:
                return this.buildOrdinationSide();
            case DiningTableEditorTabs.DATA:
                return this.buildReviewSide();
            case DiningTableEditorTabs.BILLS:
                return this.buildBillSide();
        }

        return <div/>

    }


    buildReviewSide() {
        let data = this.props;

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

    getClosingMessage(table) {
        if (DiningTablesUtils.isTableCloseable(table)) {
            return "Chiudere il tavolo?";
        } else {
            return "Chiudere il tavolo? Vi sono conti non ancora contabilizzati";
        }
    }

    buildBillSide() {
        const data = this.props;
        const editingFeature = iGet(data, "diningTableEditing");
        const closingFeature = iGet(data, "tableClosingFeature");
        let bill = closingFeature.get('bill');
        let sideContent;
        if (closingFeature.get('isEditing')()) {
            sideContent = DiningTableEditor.buildBillButtons(data);
        } else {
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

    static buildBillsList(data) {
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
        let data = this.props;
        let bill = iGet(data, "tableClosingFeature.bill");
        return bill && !bill.get('progressive');
    }

    static confirmBill(editingFeature, closingFeature) {
        if (closingFeature.get('isCreating')()) {
            DiningTablesClosingActions.createBill(iGet(editingFeature, 'diningTable.uuid'), closingFeature.get('bill'));
        } else if (closingFeature.get('isEditing')()) {
            DiningTablesClosingActions.updateBill(iGet(editingFeature, 'diningTable.uuid'), closingFeature.get('bill'));
        }
    }

    canMerge() {
        return this.otherOpenTables().size > 0;
    }

    otherOpenTables() {
        let data = this.props;
        let table = iGet(data, "diningTableEditing.diningTable");

        return data.get('evening').get('diningTables')
            .filter(t => t.get('status') !== "CHIUSO")
            .filter(t => t.get('uuid') !== table.get('uuid'));
    }
}