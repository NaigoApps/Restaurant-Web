import React, {Component} from 'react';
import SwitchInput from "../../../../components/widgets/SwitchInput";
import Row from "../../../../widgets/Row";
import Column from "../../../../widgets/Column";
import DiningTablesClosingActions from "./DiningTablesClosingActions";

export default class PrintWizardModePage extends Component {
    constructor(props) {
        super(props);
    }

    render() {

        let typeComponent;
        if(!this.props.soft){
            typeComponent = <Row>
                <Column align="center">
                    <SwitchInput
                        leftBg="info"
                        rightBg="info"
                        leftText={"Ricevuta"}
                        rightText={"Fattura"}
                        value={this.props.isInvoice}
                        onToggle={value => DiningTablesClosingActions.selectPrintWizardBillType(value)}
                    />
                </Column>
            </Row>;
        }

        return (
            <Row>
                <Column>
                    {typeComponent}
                    <Row ofList>
                        <Column align="center">
                            <SwitchInput
                                leftBg="info"
                                rightBg="info"
                                leftText={"Dettagliato"}
                                rightText={"Generico"}
                                value={this.props.generic}
                                onToggle={value => DiningTablesClosingActions.selectPrintWizardPrintMode(value)}
                            />
                        </Column>
                    </Row>
                </Column>
            </Row>
        )
    }

}