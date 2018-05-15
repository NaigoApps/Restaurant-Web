import React, {Component} from 'react';
import GraphWizardPage from "../../../../components/widgets/wizard/graph-wizard/GraphWizardPage";
import Row from "../../../../widgets/Row";
import Column from "../../../../widgets/Column";
import {INVOICE, RECEIPT} from "./DiningTableClosingWizard";
import SwitchInput from "../../../../components/widgets/SwitchInput";
import {DiningTablesClosingActions} from "./DiningTablesClosingActions";
import {iGet} from "../../../../utils/Utils";
import IntegerInput from "../../../../components/widgets/inputs/IntegerInput";
import IntegerEditor from "../../../../components/widgets/inputs/IntegerEditor";

export default class DiningTableClosingModePage extends Component {
    constructor(props) {
        super(props);
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
        let quick = iGet(this.props.data, "diningTableClosing.quick");
        let split = iGet(this.props.data, "diningTableClosing.split");
        return (
            <GraphWizardPage
                abortAction={this.props.abortAction}
                confirmAction={this.props.confirmAction}>
                <Row>
                    <Column>
                        <Row>
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
                                <IntegerEditor
                                    type="info"
                                    options={{
                                        label: "Numero di parti",
                                        value: split,
                                        callback: result => DiningTablesClosingActions.setSplit(result),
                                        min: 1
                                    }}
                                />
                            </Column>
                        </Row>
                    </Column>
                </Row>
            </GraphWizardPage>
        )
    }

}