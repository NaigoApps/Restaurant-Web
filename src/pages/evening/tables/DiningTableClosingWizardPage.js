import React, {Component} from 'react';
import Button from "../../../widgets/Button";
import GraphWizardPage from "../../../components/widgets/wizard/graph/GraphWizardPage";
import Row from "../../../widgets/Row";
import Column from "../../../widgets/Column";
import OrdinationsUtils from "../OrdinationsUtils";
import {findByUuid} from "../../../utils/Utils";
import Scrollable from "../../../components/widgets/Scrollable";
import diningTablesEditorActions from "./DiningTablesEditorActions";
import DiningTablesUtils from "./DiningTablesUtils";

export default class DiningTableClosingWizardPage extends Component {
    constructor(props) {
        super(props);
    }

    dishName(dishUuid) {
        let dishes = this.props.data.dishes;
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
        let data = this.props.data;
        let dishes = data.get('dishes');
        let additions = data.get('additions');
        let table = this.props.data.get('editingTable');
        let orders = DiningTablesUtils.findTableOpenedOrders(table);

        if (data.get('invoice')) {
            data.get('invoice').get('orders').forEach(closedOrderUuid => {
                let index = orders.findIndex(o => o.get('uuid') === closedOrderUuid);
                orders.splice(index, 1);
            });
        }
        let total = OrdinationsUtils.total(orders);

        orders = DiningTablesUtils.implode(orders);
        orders = OrdinationsUtils.sortByDish(orders, dishes, additions);
        return (
            <Scrollable>
                {
                    orders.map(order => {
                        let singleButton = <Button icon="angle-right"
                                                   commitAction={() => this.closeOrder(order)}/>;
                        let allButton = <Button icon="angle-double-right"
                                                commitAction={() => this.closeOrders(order)}/>;
                        return (
                            <div key={order.get('order').get('uuid')} className="d-flex">
                                <span>{OrdinationsUtils.renderImplodedOrder(order, dishes, additions)}</span>
                                <div className="ml-auto">{singleButton} {allButton}</div>
                            </div>
                        );
                    })
                }
            </Scrollable>
        )
    }

    buildInvoiceSummary() {
        let dishes = this.props.data.get('dishes');
        let additions = this.props.data.get('additions');
        let invoice = this.props.data.get('invoice');
        if (invoice) {
            let orders = DiningTablesUtils.findTableOrders(this.props.data.get('editingTable'));
            orders = orders.filter(order => !!invoice.get('orders').find(invoiceOrder => invoiceOrder === order.get('uuid')));
            orders = DiningTablesUtils.implode(orders);
            orders = OrdinationsUtils.sortByDish(orders, dishes, additions);
            let total = OrdinationsUtils.total(orders);
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
                                            <span>{OrdinationsUtils.renderImplodedOrder(order, dishes, additions)}</span>
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