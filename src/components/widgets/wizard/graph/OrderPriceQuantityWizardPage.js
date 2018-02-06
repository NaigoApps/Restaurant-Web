import React, {Component} from 'react';
import graphWizardActions from "../GraphWizardActions";
import GraphWizardPage from "./GraphWizardPage";
import Row from "../../../../widgets/Row";
import Column from "../../../../widgets/Column";
import OrdersCrudList from "../../../OrdersCrudList";
import FloatInput from "../../inputs/FloatInput";
import Button from "../../../../widgets/Button";

export default class OrderPriceQuantityWizardPage extends Component {
    constructor(props) {
        super(props);
    }

    selectGroup(sampleOrder) {
        graphWizardActions.setWizardData(this.props.wizardId, sampleOrder, "editing")
    }

    render() {
        let props = this.props;
        let sampleOrder = props.wizardData["editing"];

        return (
            <GraphWizardPage
                abortAction={props.abortAction}
                confirmAction={props.confirmAction}>
                <Row grow>
                    <Column sm="5">
                        <OrdersCrudList
                            data={this.props.data}
                            selectedOrder={sampleOrder}
                            commitAction={this.selectGroup.bind(this)}
                        />
                    </Column>
                    <Column sm="7">
                        <Row>
                            <Column>
                                <Row>
                                    <Column>
                                        <h3>Prezzo</h3>
                                        <FloatInput default="0"/>
                                    </Column>
                                </Row>
                            </Column>
                            <Column>
                                <Row>
                                    <Column>
                                        <h3>Quantità</h3>
                                        <FloatInput default="0"/>
                                    </Column>
                                </Row>
                            </Column>
                        </Row>
                        <Row topSpaced>
                            <Column>
                                <Button
                                    text="Elimina piatto"
                                    type="danger"
                                    size="lg"/>
                            </Column>
                        </Row>
                    </Column>
                </Row>
            </GraphWizardPage>
        )
    }

}