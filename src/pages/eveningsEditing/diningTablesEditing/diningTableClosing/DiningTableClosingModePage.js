import React, {Component} from 'react';
import GraphWizardPage from "../../../../components/widgets/wizard/graph-wizard/GraphWizardPage";
import Row from "../../../../widgets/Row";
import Column from "../../../../widgets/Column";
import {INVOICE, RECEIPT} from "./DiningTableClosingView";
import SwitchInput from "../../../../components/widgets/SwitchInput";
import {DiningTablesClosingActions} from "./DiningTablesClosingActions";
import {iGet} from "../../../../utils/Utils";
import IntegerInput from "../../../../components/widgets/inputs/IntegerInput";

export default class DiningTableClosingModePage extends Component {
    constructor(props) {
        super(props);
    }

    setType(value) {
        if (!value) {
            DiningTablesClosingActions.setBillType(RECEIPT);
        } else {
            DiningTablesClosingActions.setBillType(INVOICE);
        }
    }

    setQuick(quick) {
        DiningTablesClosingActions.setQuick(quick);
        if (quick) {
            DiningTablesClosingActions.closeAllOrders();
            DiningTablesClosingActions.closeAllCoverCharges();
        } else {
            DiningTablesClosingActions.openAllOrders();
            DiningTablesClosingActions.openAllCoverCharges();
        }
    }

    render() {
        let type = iGet(this.props.data, "diningTableClosing.type");
        let quick = iGet(this.props.data, "diningTableClosing.quick");
        let splitText = iGet(this.props.data, "diningTableClosing.splitInput.text");
        return (
            <GraphWizardPage
                abortAction={this.props.abortAction}
                confirmAction={this.props.confirmAction}>
                <Row>
                    <Column>
                        <Row>
                            <Column>
                                <SwitchInput
                                    value={type === INVOICE}
                                    leftText="Scontrino"
                                    rightText="Fattura"
                                    leftBg="info"
                                    rightBg="info"
                                    onToggle={(value) => this.setType(value)}
                                />
                            </Column>
                        </Row>
                        <Row topSpaced>
                            <Column>
                                <SwitchInput
                                    value={!quick}
                                    leftText="Rapido"
                                    rightText="Dettagliato"
                                    leftBg="info"
                                    rightBg="info"
                                    onToggle={(value) => this.setQuick(!value)}
                                />
                            </Column>
                        </Row>
                        <Row topSpaced>
                            <Column>
                                <h5>Numero di parti</h5>
                            </Column>
                        </Row>
                        <Row>
                            <Column>
                                <IntegerInput
                                    onChar={char => DiningTablesClosingActions.splitChar(char)}
                                    onChange={text => DiningTablesClosingActions.splitChange(text)}
                                    text={splitText}
                                />
                            </Column>
                        </Row>
                    </Column>
                </Row>
            </GraphWizardPage>
        )
    }

}