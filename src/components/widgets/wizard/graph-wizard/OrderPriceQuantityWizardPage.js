import React, {Component} from 'react';
import graphWizardActions from "./GraphWizardActions";
import GraphWizardPage from "./GraphWizardPage";
import Row from "../../../../widgets/Row";
import Column from "../../../../widgets/Column";
import OrdersCrudList from "../../../OrdersCrudList";
import FloatInput from "../../inputs/float/FloatInput";
import Button from "../../../../widgets/Button";
import {findByUuid} from "../../../../utils/Utils";
import IntegerInput from "../../inputs/IntegerInput";
import PaginatedList from "../../PaginatedList";
import ordinationsEditorActions from "../../../../pages/evening/OrdinationsEditorActions";
import OrdinationsUtils from "../../../../pages/evening/OrdinationsUtils";

const PRICE = "PRICE";
const QUANTITY = "QUANTITY";
const PHASE = "PHASE";

export default class OrderPriceQuantityWizardPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            editing: null,
            editingQuantity: 0,
            editingPrice: 0
        }
    }

    componentWillReceiveProps(newProps) {
        this.updateState(newProps);
    }

    updateState(props) {
        let selectedOrderUuid = props.wizardData['editing'];
        let orders = props.data.get('editingOrders');
        if (orders && selectedOrderUuid) {
            let selectedOrder = orders.find(order => order.get('uuid') === selectedOrderUuid);
            if(selectedOrder) {
                this.setState({
                    editingQuantity: this.countOrders(orders, selectedOrder),
                    editingPrice: selectedOrder.get('price')
                });
            }
        }
    }

    getSelectedOrder() {
        let selectedOrderUuid = this.props.wizardData["editing"];
        let orders = this.props.data.get('editingOrders');
        return orders.find(order => order.get('uuid') === selectedOrderUuid);
    }

    getSelectedOrderIndex() {
        let selectedOrderUuid = this.props.wizardData["editing"];
        let orders = this.props.data.get('editingOrders');
        return orders.findIndex(order => order.get('uuid') === selectedOrderUuid);
    }

    updateSelectedOrderPrice(price) {
        ordinationsEditorActions.updateOrderPrice(this.getSelectedOrderIndex(), price);
    }

    setQuantity(oldq, newq) {
        newq = Math.max(newq, 1);
        if (newq > oldq) {
            this.moreOrders(newq - oldq);
        } else if (newq < oldq) {
            this.lessOrders(oldq - newq);
        }
    }

    countOrders(orders, sample) {
        return orders.filter(order => OrdinationsUtils.sameOrder(order, sample)).size;
    }

    deleteSelectedOrder(){
        let sampleOrder = this.getSelectedOrder();

        let orders = this.props.data.get('editingOrders');

        let removables = orders.filter(order => OrdinationsUtils.sameOrder(order, sampleOrder))
            .map(order => order.get('uuid'));

        ordinationsEditorActions.removeOrders(removables);

        graphWizardActions.setWizardData(this.props.wizardId, null, "editing");
    }

    lessOrders(times) {
        let sampleOrder = this.getSelectedOrder();
        times = times ? times : 1;

        let orders = this.props.data.get('editingOrders');

        let removables = orders.filter(order => OrdinationsUtils.sameOrder(order, sampleOrder))
            .map(order => order.get('uuid'));

        while (removables.size > times + 1) {
            removables = removables.remove(0);
        }

        let newSelection = removables.get(0);
        removables = removables.remove(0);

        ordinationsEditorActions.removeOrders(removables);

        graphWizardActions.setWizardData(this.props.wizardId, newSelection, "editing");
    }

    moreOrders(times) {
        let sampleOrder = this.getSelectedOrder();
        ordinationsEditorActions.duplicateOrder(sampleOrder.get('uuid'), times);
    }

    changeOrderPhase(phase){
        let orderIndex = this.getSelectedOrderIndex();
        ordinationsEditorActions.updateOrderPhase(orderIndex, phase);
    }

    selectGroup(sampleOrder) {
        graphWizardActions.setWizardData(this.props.wizardId, sampleOrder, "editing");
        this.updateState(this.props);
    }

    render() {
        let props = this.props;
        let selectedOrderUuid = props.wizardData["editing"];
        let selectedOrder = null;
        if (props.data.get('editingOrders')) {
            selectedOrder = findByUuid(props.data.get('editingOrders'), selectedOrderUuid);
        }
        return (
            <GraphWizardPage
                abortAction={props.abortAction}
                confirmAction={props.confirmAction}>
                <Row grow>
                    <Column sm="5">
                        <OrdersCrudList
                            data={this.props.data}
                            selectedOrder={selectedOrderUuid}
                            commitAction={this.selectGroup.bind(this)}
                        />
                    </Column>
                    <Column sm="7">
                        {this.buildAdditionsComponents(props.data.get('editingOrders'), selectedOrder)}
                        <Row topSpaced>
                            <Column>
                                <Button
                                    commitAction={() => this.deleteSelectedOrder()}
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

    setEditingComponent(value) {
        this.setState({
            editing: value
        });
    }

    buildAdditionsComponents(orders, selectedOrder) {
        let refiningComponent = this.buildAdditionComponent(orders, selectedOrder);
        return <Row grow>
            <Column>
                <Row>
                    <Column>
                        <Button text="Cambia quantità"
                                active={this.state.editing === QUANTITY}
                                commitAction={() => this.setEditingComponent(QUANTITY)}/>
                    </Column>
                    <Column>
                        <Button text="Cambia prezzo"
                                active={this.state.editing === PRICE}
                                commitAction={() => this.setEditingComponent(PRICE)}/>
                    </Column>
                    <Column>
                        <Button text="Cambia portata"
                                active={this.state.editing === PHASE}
                                commitAction={() => this.setEditingComponent(PHASE)}/>
                    </Column>
                </Row>
                <Row grow topSpaced>
                    <Column>
                        {refiningComponent}
                    </Column>
                </Row>
            </Column>
        </Row>
    }

    buildAdditionComponent(orders, selectedOrder) {
        if (this.state.editing === PRICE) {
            return <Row>
                <Column>
                    <Row>
                        <Column>
                            <FloatInput
                                default={this.state.editingPrice}
                                commitAction={(value) => this.setState({editingPrice: value})}
                            />
                        </Column>
                    </Row>
                    <Row topSpaced>
                        <Column>
                            <Button
                                type="success"
                                text="Conferma"
                                commitAction={() => this.updateSelectedOrderPrice(this.state.editingPrice)}
                            />
                        </Column>
                    </Row>
                </Column>
            </Row>;
        } else if (this.state.editing === QUANTITY) {
            return <Row>
                <Column>
                    <Row>
                        <Column>
                            <IntegerInput
                                default={this.state.editingQuantity}
                                commitAction={(value) => this.setState({editingQuantity: value})}
                            />
                        </Column>
                    </Row>
                    <Row topSpaced>
                        <Column>
                            <Button
                                type="success"
                                text="Conferma"
                                commitAction={() => this.setQuantity(this.countOrders(orders, selectedOrder), this.state.editingQuantity)}
                            />
                        </Column>
                    </Row>
                </Column>
            </Row>;
        } else if (this.state.editing === PHASE) {
            return <Row>
                <Column>
                    <PaginatedList
                        id={phase => phase.get('uuid')}
                        rows={1}
                        cols={5}
                        selected={selectedOrder ? selectedOrder.get('phase') : null}
                        entities={this.props.data.get('phases')}
                        renderer={phase => phase.get('name')}
                        selectMethod={(phase) => this.changeOrderPhase(phase)}
                    />
                </Column>
            </Row>;
        }
    }

}