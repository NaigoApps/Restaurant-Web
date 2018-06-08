import React, {Component} from 'react';
import SwitchInput from "../../../../components/widgets/SwitchInput";
import Row from "../../../../widgets/Row";
import Column from "../../../../widgets/Column";
import {DiningTablesClosingActions} from "./DiningTablesClosingActions";

export default class PrintWizardModePage extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const data = this.props.data;
        const closingFeature = data.get('tableClosingFeature');
        const printWizard = closingFeature.get('printWizard');

        return (
            <Row>
                <Column>
                    <Row>
                        <Column align="center">
                            <SwitchInput
                                leftBg="info"
                                rightBg="info"
                                leftText={"Ricevuta"}
                                rightText={"Fattura"}
                                value={printWizard.get('isInvoice')}
                                onToggle={value => DiningTablesClosingActions.selectPrintWizardBillType(value)}
                            />
                        </Column>
                    </Row>
                    <Row ofList>
                        <Column align="center">
                            <SwitchInput
                                leftBg="info"
                                rightBg="info"
                                leftText={"Dettagliato"}
                                rightText={"Generico"}
                                value={printWizard.get('generic')}
                                onToggle={value => DiningTablesClosingActions.selectPrintWizardPrintMode(value)}
                            />
                        </Column>
                    </Row>
                </Column>
            </Row>
        )
    }

}