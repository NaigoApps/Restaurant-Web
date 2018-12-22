import React, {Component} from 'react';
import Row from "../../../../widgets/Row";
import Column from "../../../../widgets/Column";
import SwitchInput from "../../../../components/widgets/SwitchInput";
import DiningTablesClosingActions from "./DiningTablesClosingActions";
import {iGet} from "../../../../utils/Utils";

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
        let quick = this.props.billsEditing.closingWizard.quick;
        return (
            <Row>
                <Column>
                    <Row>
                        <Column align="center">
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
                </Column>
            </Row>
        )
    }

}