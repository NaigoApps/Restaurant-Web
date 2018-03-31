import React, {Component} from 'react';
import Button from "../../../widgets/Button";
import GraphWizardPage from "../../../components/widgets/wizard/graph-wizard/GraphWizardPage";
import Row from "../../../widgets/Row";
import Column from "../../../widgets/Column";
import diningTablesEditorActions from "./DiningTablesEditorActions";
import {INVOICE, RECEIPT} from "./DiningTableClosingView";
import DiningTablesUtils from "./DiningTablesUtils";

export default class DiningTableClosingModePage extends Component {
    constructor(props) {
        super(props);
    }

    setReceiptType() {
        diningTablesEditorActions.setBillType(RECEIPT);
    }

    setInvoiceType() {
        diningTablesEditorActions.setBillType(INVOICE);
    }

    getRemainingCoverCharges() {
        let table = this.props.data.get('editingTable');
        let wizardData = this.props.wizardData;
        let coverCharges = DiningTablesUtils .findTableOpenedCoverCharges(table);
        coverCharges -= wizardData.get('coverCharges');
        return coverCharges;
    }


    setQuick(quick) {
        diningTablesEditorActions.setQuick(quick);
        if(quick) {
            diningTablesEditorActions.closeAllOrders();
            let coverCharges = this.getRemainingCoverCharges();
            diningTablesEditorActions.closeCoverCharges(coverCharges);
        }else{
            diningTablesEditorActions.openAllOrders();
            let coverCharges = this.props.wizardData.get('coverCharges');
            diningTablesEditorActions.openCoverCharges(coverCharges);
        }
    }

    render() {
        let type = this.props.wizardData ? this.props.wizardData.get('type') : null;
        let quick = this.props.wizardData ? this.props.wizardData.get('quick') : null;
        return (
            <GraphWizardPage
                abortAction={this.props.abortAction}
                confirmAction={this.props.confirmAction}>
                <Row grow>
                    <Column>
                        <Button
                            text="Scontrino"
                            size="lg"
                            active={type === RECEIPT}
                            commitAction={() => this.setReceiptType()}
                            fullHeight/>
                    </Column>
                    <Column>
                        <Button
                            text="Fattura"
                            size="lg"
                            active={type === INVOICE}
                            commitAction={() => this.setInvoiceType()}
                            fullHeight/>
                    </Column>
                </Row>
                <Row topSpaced grow>
                    <Column>
                        <Button
                            text="Rapido"
                            size="lg"
                            active={quick}
                            commitAction={() => this.setQuick(true)}
                            fullHeight/>
                    </Column>
                    <Column>
                        <Button
                            text="Dettagliato"
                            size="lg"
                            active={!quick}
                            commitAction={() => this.setQuick(false)}
                            fullHeight/>
                    </Column>
                </Row>
            </GraphWizardPage>
        )
    }

}