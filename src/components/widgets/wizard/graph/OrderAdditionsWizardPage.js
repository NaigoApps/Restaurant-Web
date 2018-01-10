import React, {Component} from 'react';
import graphWizardActions from "../GraphWizardActions";
import GraphWizardPage from "./GraphWizardPage";
import PaginatedButtonGroup from "../../../../widgets/PaginatedButtonGroup";
import OrdinationsUtils from "../../../../pages/evening/OrdinationsUtils";
import Button from "../../../../widgets/Button";
import Row from "../../../../widgets/Row";
import Column from "../../../../widgets/Column";
import OrdinationSelectableReview from "../../../OrdinationSelectableReview";
import FloatInput from "../../inputs/FloatInput";

export default class OrderAdditionsWizardPage extends Component {
    constructor(props) {
        super(props);
    }

    selectGroup(sampleOrder) {
        graphWizardActions.setWizardData(this.props.wizardId, sampleOrder, "editing")
    }

    lessOrders() {
        let sampleOrder = this.props.wizardData["editing"];
        let orders = this.props.wizardData["orders"];

        let index = orders.findIndex(order => OrdinationsUtils.sameOrder(order, sampleOrder));
        orders.splice(index, 1);

        graphWizardActions.setWizardData(this.props.wizardId, orders, "orders");

        let another = orders.find(order => OrdinationsUtils.sameOrder(order, sampleOrder));

        if (another) {
            graphWizardActions.setWizardData(this.props.wizardId, another, "editing")
        }else{
            graphWizardActions.setWizardData(this.props.wizardId, null, "editing");
        }
    }

    moreOrders() {
        let sampleOrder = this.props.wizardData["editing"];
        let newOrder = OrdinationsUtils.duplicateOrder(sampleOrder);
        let orders = this.props.wizardData["orders"];

        orders.unshift(newOrder);

        graphWizardActions.setWizardData(this.props.wizardId, orders, "orders");
    }

    updateSelectedOrderPrice(price) {
        let sampleOrder = this.props.wizardData["editing"];
        let orders = this.props.wizardData["orders"];
        let index = orders.findIndex(order => OrdinationsUtils.sameOrder(order, sampleOrder));

        orders[index].price = price;
        orders.unshift(orders.splice(index, 1)[0]);

        graphWizardActions.setWizardData(this.props.wizardId, orders, "orders");
    }

    toggleAddition(addition) {
        let wData = this.props.wizardData;
        if (wData["editing"]) {
            let sampleOrder = wData["editing"];
            let orders = wData["orders"];
            let orderIndex = orders.findIndex(order => OrdinationsUtils.sameOrder(order, sampleOrder));

            let additionIndex = orders[orderIndex].additions.findIndex(a => a === addition.uuid);
            if (additionIndex !== -1) {
                orders[orderIndex].additions.splice(additionIndex, 1);
            } else {
                orders[orderIndex].additions.push(addition.uuid);
            }

            orders.unshift(orders.splice(orderIndex, 1)[0]);

            graphWizardActions.setWizardData(this.props.wizardId, orders[0], "editing");
            graphWizardActions.setWizardData(this.props.wizardId, orders, "orders");
        }
    }

    render() {
        let props = this.props;
        let sampleOrder = props.wizardData["editing"];

        let buttons = props.additions.map(a => {
            return (
                <Button
                    key={a.uuid}
                    active={sampleOrder && sampleOrder.additions.includes(a.uuid)}
                    commitAction={this.toggleAddition.bind(this, a)}
                    text={a.name}
                />
            );
        });

        return (
            <GraphWizardPage
                abortAction={props.abortAction}
                confirmAction={props.confirmAction}>
                <Row grow>
                    <Column sm="4">
                        <OrdinationSelectableReview
                            data={OrderAdditionsWizardPage.makeOrdinationReviewDescriptor(props)}
                            selectedOrder={sampleOrder}
                            commitAction={this.selectGroup.bind(this)}
                        />
                    </Column>
                    <Column sm="4">
                        <PaginatedButtonGroup
                            showNumbers={true}
                            pageSize={8}>
                            {buttons}
                        </PaginatedButtonGroup>
                    </Column>
                    <Column sm="4">
                        <Row>
                            <Column>
                                <h4>Modifica quantità</h4>
                            </Column>
                        </Row>
                        <Row>
                            <Column>
                                <Button
                                    type="danger"
                                    icon="minus"
                                    commitAction={this.lessOrders.bind(this)}
                                    disabled={!sampleOrder}/>
                            </Column>
                            <Column>
                                <Button
                                    type="success"
                                    icon="plus"
                                    commitAction={this.moreOrders.bind(this)}
                                    disabled={!sampleOrder}/>
                            </Column>
                        </Row>
                        <Row topSpaced>
                            <Column>
                                <h4>Modifica prezzo</h4>
                            </Column>

                        </Row>
                        <Row>
                            <Column>
                                <Row>
                                    <Column>
                                        <FloatInput
                                            default={sampleOrder ? sampleOrder.price : 0}
                                            commitAction={this.updateSelectedOrderPrice.bind(this)}
                                            disabled={!sampleOrder}
                                        />
                                    </Column>
                                </Row>
                            </Column>
                        </Row>
                    </Column>
                </Row>
            </GraphWizardPage>
        )
    }

    static makeOrdinationReviewDescriptor(props) {
        return {
            dishes: props.dishes,
            phases: props.phases,
            additions: props.additions,
            orders: props.wizardData["orders"]
        }
    }

}