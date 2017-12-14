import React, {Component} from 'react';
import graphWizardActions from "../GraphWizardActions";
import GraphWizardPage from "./GraphWizardPage";
import {distribute, findByUuid, uuid} from "../../../../utils/Utils";
import OrdinationsUtils from "../../../../pages/evening/OrdinationsUtils";
import Button from "../../../../widgets/Button";
import FloatInput from "../../inputs/FloatInput";

export default class OrdinationReviewPage extends Component {
    constructor(props) {
        super(props);
    }

    optionButtonClass(opt) {
        let classes = ["btn", "btn-lg"];
        classes.push(opt.uuid === this.props.wizardData["categories"] ? "btn-primary" : "btn-default");
        return classes.join(" ");
    }

    getOrderClass(ordersGroup) {
        let selectedOrder = this.props.wizardData["editing"];
        let classes = ["col-sm-3 btn"];
        if (OrdinationsUtils.sameOrder(selectedOrder, ordersGroup.order) &&
            selectedOrder.phase === ordersGroup.order.phase) {
            classes.push("btn-primary");
        } else {
            classes.push("btn-default")
        }
        return classes.join(" ");
    }

    selectGroup(ordersGroup) {
        graphWizardActions.setWizardData(this.props.wizardId, ordersGroup.order, "editing")
    }

    getSelectedGroup() {
        let order = this.props.wizardData["editing"];
        if (order) {
            let phasesMap = OrdinationsUtils.makePhaseMap(this.props.wizardData["review"]);
            let ordersGroups = OrdinationsUtils.implode(phasesMap.get(order.phase));
            let ordersGroup = ordersGroups.find(group => OrdinationsUtils.sameOrder(group.order, order));
            return ordersGroup;
        }
        return null;
    }

    getSelectedGroupPrice() {
        let order = this.props.wizardData["editing"];
        if (order) {
            return order.price;
        }
        return 0;
    }

    renderOrder(order) {
        let dish = findByUuid(this.props.dishes, order.order.dish);
        let result = order.quantity + " " + (dish ? dish.name : "?") + " ";

        order.order.additions.forEach(uuid => {
            let addition = findByUuid(this.props.additions, uuid);
            if (addition) {
                result += addition.name + " "
            }
        });

        return result + " (" + order.price + "€)";
    }

    lessOrders() {
        let editingOrder = this.getEditingOrder();
        let orders = this.props.wizardData["review"];

        let targetGroup = this.getSelectedGroup();

        let index = orders.findIndex(order => OrdinationsUtils.sameOrder(order, editingOrder) && order.phase === editingOrder.phase)
        orders.splice(index, 1);

        graphWizardActions.setWizardData(this.props.wizardId, orders, "review");
        if (targetGroup.quantity <= 1) {
            graphWizardActions.setWizardData(this.props.wizardId, null, "editing");
        }
    }

    moreOrders() {
        let editingOrder = this.getEditingOrder();
        let newOrder = OrdinationsUtils.duplicateOrder(editingOrder);
        let orders = this.props.wizardData["review"];

        orders.push(newOrder);

        graphWizardActions.setWizardData(this.props.wizardId, orders, "review");
    }

    updateSelectedOrderPrice(price) {
        let editingOrder = this.getEditingOrder();
        let orders = this.props.wizardData["review"];
        let index = orders.findIndex(order => OrdinationsUtils.sameOrder(order, editingOrder) && order.phase === editingOrder.phase)
        orders[index].price = price;

        graphWizardActions.setWizardData(this.props.wizardId, orders, "review");
    }

    getEditingOrder() {
        return this.props.wizardData["editing"];
    }

    render() {
        let phases = OrdinationsUtils.makePhaseMap(this.props.wizardData["review"]);

        let rows = [];
        let phaseIds = Array.from(phases.keys())
            .sort((k1, k2) => k1.localeCompare(k2));
        phaseIds.forEach(phase => {
            let orders = phases.get(phase);
            orders = OrdinationsUtils.implode(orders);
            orders = OrdinationsUtils.sortByDish(orders, this.props.dishes);
            orders = distribute(orders, 4);
            let subRows = orders.map((orderGroup, index) => {
                return (
                    <div key={index} className="row">
                        <div className="col-sm-12">
                            {orderGroup.map(order => {
                                return <button
                                    key={order.order.dish + uuid()}
                                    className={this.getOrderClass(order)}
                                    onClick={this.selectGroup.bind(this, order)}>
                                    {this.renderOrder(order)}
                                </button>
                            })}
                        </div>
                    </div>
                );
            });
            rows.push(
                <div key={phase} className="row">
                    <div className="col-sm-12">
                        <p>
                            {findByUuid(this.props.phases, phase).name}
                        </p>
                        <div className="row">
                            <div className="col-sm-12">
                                {subRows}
                            </div>
                        </div>
                    </div>
                </div>
            );
        });

        let selectedGroup = this.getSelectedGroup();

        return (
            <GraphWizardPage
                abortAction={this.props.abortAction}
                confirmAction={this.props.confirmAction}>
                <div className="row">
                    <div className="col-sm-9">
                        {rows}
                    </div>
                    <div className="col-sm-3">
                        <div className="row">
                            <div className="col-sm-12 text-center">
                                <p>{selectedGroup ? this.renderOrder(selectedGroup) : "Selezionare un ordine"}</p>
                            </div>
                        </div>
                        <div className="row top-sep">
                            <div className="col-sm-12 text-center">
                                <h4>Modifica quantità</h4>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-sm-6 text-center">
                                <Button
                                    type="danger"
                                    icon="minus"
                                    commitAction={this.lessOrders.bind(this)}
                                    disabled={!this.getEditingOrder.bind(this)()}/>
                            </div>
                            <div className="col-sm-6 text-center">
                                <Button
                                    type="success"
                                    icon="plus"
                                    commitAction={this.moreOrders.bind(this)}
                                    disabled={!this.getEditingOrder.bind(this)()}/>
                            </div>
                        </div>
                        <div className="row top-sep">
                            <div className="col-sm-12 text-center">
                                <h4>Modifica prezzo</h4>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-sm-12">
                                <div className="row">
                                    <div className="col-sm-12">
                                        <FloatInput
                                            default={this.getSelectedGroupPrice.bind(this)(selectedGroup)}
                                            commitAction={this.updateSelectedOrderPrice.bind(this)}
                                            disabled={!this.getEditingOrder.bind(this)()}
                                        />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-sm-12">
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </GraphWizardPage>
        )
    }

}