import React, {Component} from 'react';
import Button from "../../widgets/Button";
import GraphWizardPage from "../../components/widgets/wizard/graph/GraphWizardPage";
import Row from "../../widgets/Row";
import Column from "../../widgets/Column";
import OrdinationsUtils from "./OrdinationsUtils";
import {findByUuid} from "../../utils/Utils";
import Scrollable from "../../components/widgets/Scrollable";
import diningTablesEditorActions from "./DiningTablesEditorActions";

export default class DiningTableClosingWizardPage extends Component {
    constructor(props) {
        super(props);
    }

    dishName(dishUuid) {
        let dishes = this.props.dishes;
        if (dishes) {
            let dish = findByUuid(dishes, dishUuid);
            if (dish) {
                return dish.name;
            }
        }
        return "?";
    }

    closeOrder(order) {
        diningTablesEditorActions.closeOrders(order.order, 1);
    }

    closeOrders(order) {
        diningTablesEditorActions.closeOrders(order.order, order.quantity);
    }

    openOrder(order) {
        diningTablesEditorActions.openOrders(order.order, 1);
    }

    openOrders(order) {
        diningTablesEditorActions.openOrders(order.order, order.quantity);
    }

    buildDiningTableSummary() {
        let table = this.props.diningTable;
        let ordinations = this.props.ordinations;
        let orders = [];
        ordinations.forEach(ordination => {
            orders.push(...ordination.orders);
        });

        if (this.props.invoice) {
            this.props.invoice.orders.forEach(closedOrder => {
                let index = orders.findIndex(o => o.uuid === closedOrder.uuid);
                orders.splice(index, 1);
            });
        }
        let total = OrdinationsUtils.total(orders);

        orders = OrdinationsUtils.implode(orders);
        return (
            <Scrollable>
                {
                    orders.map(order => {
                        let singleButton = <Button icon="angle-right"
                                                   commitAction={this.closeOrder.bind(this, order)}/>;
                        let allButton = <Button icon="angle-double-right"
                                                commitAction={this.closeOrders.bind(this, order)}/>;
                        return (
                            <div key={order.order.uuid} className="d-flex">
                                <span>{this.dishName(order.order.dish)}</span>
                                <div className="ml-auto">{singleButton} {allButton}</div>
                            </div>
                        );
                    })
                }
            </Scrollable>
        )
    }

    buildInvoiceSummary() {
        let invoice = this.props.invoice;
        if (invoice) {
            let orders = OrdinationsUtils.implode(invoice.orders);
            let total = OrdinationsUtils.total(invoice.orders);
            return (
                <Row fullHeight>
                    <Column>
                        <Scrollable>
                            {
                                orders.map(order => {
                                    let singleButton = <Button icon="angle-left"
                                                               commitAction={this.openOrder.bind(this, order)}/>;
                                    let allButton = <Button icon="angle-double-left"
                                                            commitAction={this.openOrders.bind(this, order)}/>;
                                    return (
                                        <div key={order.order.uuid} className="d-flex">
                                            <div className="mr-auto">{singleButton} {allButton}</div>
                                            <span>{this.dishName(order.order.dish)}</span>
                                        </div>
                                    );
                                })
                            }
                        </Scrollable>
                    </Column>
                    <div>{total}</div>
                </Row>
            )
        }
        return null;
    }


    render() {
        let leftContent = this.buildDiningTableSummary();
        let rightContent = this.buildInvoiceSummary();
        return (
            <GraphWizardPage
                abortAction={this.props.abortAction}
                confirmAction={this.props.confirmAction}>
                <Row grow>
                    <Column lg="6">
                        {leftContent}
                    </Column>
                    <Column lg="6">
                        {rightContent}
                    </Column>
                </Row>
            </GraphWizardPage>
        )
    }

}