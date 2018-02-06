import React, {Component} from 'react';
import graphWizardActions from "../GraphWizardActions";
import GraphWizardPage from "./GraphWizardPage";
import PaginatedButtonGroup from "../../../../widgets/PaginatedButtonGroup";
import OrdinationsUtils from "../../../../pages/evening/OrdinationsUtils";
import Button from "../../../../widgets/Button";
import Row from "../../../../widgets/Row";
import Column from "../../../../widgets/Column";
import OrdersCrudList from "../../../OrdersCrudList";
import ordinationsEditorActions from "../../../../pages/evening/OrdinationsEditorActions";
import {findIndexByUuid} from "../../../../utils/Utils";

export default class OrderAdditionsWizardPage extends Component {
    constructor(props) {
        super(props);
    }

    selectGroup(sampleOrder) {
        graphWizardActions.setWizardData(this.props.wizardId, sampleOrder, "editing")
    }

    updateSelectedOrderPrice(price) {
        let sampleOrder = this.props.wizardData["editing"];
        let orders = this.props.data.get('editingOrders');
        let index = orders.findIndex(order => OrdinationsUtils.sameOrder(order, sampleOrder));

        ordinationsEditorActions.updateOrderPrice(index, price);

        let updatedOrder = orders.get(index).set('notes', price);

        graphWizardActions.setWizardData(this.props.wizardId, updatedOrder, "editing");
    }

    lessOrders() {
        let sampleOrder = this.props.wizardData["editing"];
        let orders = this.props.data.get('editingOrders');

        let index = orders.findIndex(order => OrdinationsUtils.sameOrder(order, sampleOrder));
        ordinationsEditorActions.removeOrder(index);

        let another = orders.find(order => OrdinationsUtils.sameOrder(order, sampleOrder));

        if (another) {
            graphWizardActions.setWizardData(this.props.wizardId, another, "editing")
        } else {
            graphWizardActions.setWizardData(this.props.wizardId, null, "editing");
        }
    }

    moreOrders() {
        let sampleOrder = this.props.wizardData["editing"];
        ordinationsEditorActions.addOrder(sampleOrder);
    }

    toggleAddition(addition) {
        let wData = this.props.wizardData;
        if (wData["editing"]) {
            let sampleOrder = wData["editing"];
            let orders = this.props.data.get('editingOrders');
            let orderIndex = orders.findIndex(order => OrdinationsUtils.sameOrder(order, sampleOrder));

            let additionIndex = findIndexByUuid(orders.get(orderIndex).get('additions'), addition.get('uuid'));
            if (additionIndex !== -1) {
                ordinationsEditorActions.removeAddition(orderIndex, additionIndex, addition.get('price'));
            } else {
                ordinationsEditorActions.addAddition(orderIndex, addition.get('uuid'), addition.get('price'));
            }

            graphWizardActions.setWizardData(this.props.wizardId, orders.get(orderIndex), "editing");
        }
    }

    render() {
        let props = this.props;
        let sampleOrder = props.wizardData["editing"];

        let buttons = props.data.get('additions').map(a => {
            return (
                <Button
                    key={a.get('uuid')}
                    size="lg"
                    active={sampleOrder && sampleOrder.get('additions').includes(a.get('uuid'))}
                    commitAction={this.toggleAddition.bind(this, a)}
                    text={a.get('name')}
                />
            );
        });

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
                        <PaginatedButtonGroup
                            showNumbers={true}
                            pageSize={8}>
                            {buttons}
                        </PaginatedButtonGroup>
                    </Column>
                </Row>
            </GraphWizardPage>
        )
    }

}