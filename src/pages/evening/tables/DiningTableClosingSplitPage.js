import React, {Component} from 'react';
import Button from "../../../widgets/Button";
import GraphWizardPage from "../../../components/widgets/wizard/graph-wizard/GraphWizardPage";
import Row from "../../../widgets/Row";
import Column from "../../../widgets/Column";
import OrdinationsUtils from "../OrdinationsUtils";
import {findByUuid} from "../../../utils/Utils";
import Scrollable from "../../../components/widgets/Scrollable";
import diningTablesEditorActions from "./DiningTablesEditorActions";
import DiningTablesUtils from "./DiningTablesUtils";
import FormattedParagraph from "../../../widgets/FormattedParagraph";

export default class DiningTableClosingSplitPage extends Component {
    constructor(props) {
        super(props);
    }

    dishName(dishUuid) {
        let dishes = this.props.data.get('dishes');
        if (dishes) {
            let dish = findByUuid(dishes, dishUuid);
            if (dish) {
                return dish.get('name');
            }
        }
        return "?";
    }

    closeOrder(order) {
        diningTablesEditorActions.closeOrders(order.get('order'), 1);
    }

    closeOrders(order) {
        diningTablesEditorActions.closeOrders(order.get('order'), order.get('quantity'));
    }

    closeCoverCharge() {
        diningTablesEditorActions.closeCoverCharges(1);
    }

    closeCoverCharges() {
        let coverCharges = this.getRemainingCoverCharges();
        diningTablesEditorActions.closeCoverCharges(coverCharges);
    }

    openCoverCharge() {
        diningTablesEditorActions.openCoverCharges(1);
    }

    openCoverCharges() {
        let coverCharges = this.props.wizardData.get('coverCharges');
        diningTablesEditorActions.openCoverCharges(coverCharges);
    }

    closeAllOrders() {
        diningTablesEditorActions.closeAllOrders();
        this.closeCoverCharges();
    }

    openOrder(order) {
        diningTablesEditorActions.openOrders(order.get('order'), 1);
    }

    openOrders(order) {
        diningTablesEditorActions.openOrders(order.get('order'), order.get('quantity'));
    }

    openAllOrders() {
        diningTablesEditorActions.openAllOrders();
        this.openCoverCharges();
    }

    getRemainingCoverCharges() {
        let table = this.props.data.get('editingTable');
        let wizardData = this.props.wizardData;
        let coverCharges = DiningTablesUtils.findTableOpenedCoverCharges(table);
        coverCharges -= wizardData.get('coverCharges');
        return coverCharges;
    }

    buildDiningTableSummary() {
        let data = this.props.data;
        let dishes = data.get('dishes');
        let additions = data.get('additions');
        let table = this.props.data.get('editingTable');
        let orders = DiningTablesUtils.findTableOpenedOrders(table);
        let coverCharges = DiningTablesUtils.findTableOpenedCoverCharges(table);

        let wizardData = this.props.wizardData;

        if (wizardData && wizardData.get('orders')) {
            wizardData.get('orders').forEach(closedOrderUuid => {
                let index = orders.findIndex(o => o.get('uuid') === closedOrderUuid);
                orders = orders.splice(index, 1);
            });
            coverCharges -= wizardData.get('coverCharges');
        }
        let total = OrdinationsUtils.total(orders) + coverCharges * this.props.data.get('evening').get('coverCharge');

        orders = DiningTablesUtils.implode(orders);
        orders = OrdinationsUtils.sortByDish(orders, dishes, additions);

        return (
            <Row grow>
                <Column>
                    <Row grow>
                        <Column>
                            <Scrollable>
                                <Row align="center">
                                    <Column>
                                        <FormattedParagraph leftText={coverCharges + " COPERTI"}
                                                            rightText={OrdinationsUtils.formatPrice(coverCharges * this.props.data.get('evening').get('coverCharge'))}/>
                                    </Column>
                                    <Column auto>
                                        <div className="ml-auto">
                                            <Button icon="caret-right" disabled={coverCharges === 0}
                                                    commitAction={() => this.closeCoverCharge()}/>
                                            &nbsp;<Button icon="step-forward" disabled={coverCharges === 0}
                                                    commitAction={() => this.closeCoverCharges()}/>

                                        </div>
                                    </Column>
                                </Row>
                                {orders.map(order => {
                                    let singleButton = <Button icon="caret-right"
                                                               commitAction={() => this.closeOrder(order)}/>;
                                    let allButton = <Button icon="step-forward"
                                                            commitAction={() => this.closeOrders(order)}/>;
                                    let left = OrdinationsUtils.renderImplodedOrder(order, this.props.data.get('dishes'), this.props.data.get('additions'));
                                    return (
                                        <Row key={order.get('order').get('uuid')} align="center">
                                            <Column>
                                                <FormattedParagraph leftText={left}
                                                                    rightText={OrdinationsUtils.formatPrice(order.get('price'))}/>
                                            </Column>
                                            <Column auto>
                                                <div className="ml-auto">{singleButton} {allButton}</div>
                                            </Column>
                                        </Row>
                                    );
                                })}
                            </Scrollable>
                        </Column>
                    </Row>
                    <Row topSpaced>
                        <Column>
                            <Button icon="fast-forward"
                                    commitAction={() => this.closeAllOrders()}/>
                        </Column>
                    </Row>
                    <Row>
                        <Column>
                            <b>TOTALE RIMANENTE: <span>{OrdinationsUtils.formatPrice(total)}</span></b>
                        </Column>
                    </Row>
                </Column>
            </Row>
        )
    }

    buildInvoiceSummary() {
        let dishes = this.props.data.get('dishes');
        let additions = this.props.data.get('additions');
        if (this.props.wizardData) {
            let invoiceOrders = this.props.wizardData.get('orders');
            let orders = DiningTablesUtils.findTableOrders(this.props.data.get('editingTable'));
            orders = orders.filter(order => invoiceOrders.includes(order.get('uuid')));
            orders = DiningTablesUtils.implode(orders);
            orders = OrdinationsUtils.sortByDish(orders, dishes, additions);
            let coverCharges = this.props.wizardData.get('coverCharges');
            let total = OrdinationsUtils.total(orders) + coverCharges * this.props.data.get('evening').get('coverCharge');
            return (
                <Row grow>
                    <Column>
                        <Row grow>
                            <Column>
                                <Scrollable>
                                    <Row align="center">
                                        <Column auto>
                                            <div className="ml-auto">
                                                <Button icon="caret-left" disabled={coverCharges === 0}
                                                        commitAction={() => this.openCoverCharge()}/>
                                                &nbsp;<Button icon="step-backward" disabled={coverCharges === 0}
                                                              commitAction={() => this.openCoverCharges()}/>

                                            </div>
                                        </Column>
                                        <Column>
                                            <FormattedParagraph leftText={coverCharges + " COPERTI"}
                                                                rightText={OrdinationsUtils.formatPrice(coverCharges * this.props.data.get('evening').get('coverCharge'))}/>
                                        </Column>
                                    </Row>
                                    {
                                        orders.map(order => {
                                            let singleButton = <Button icon="caret-left"
                                                                       commitAction={() => this.openOrder(order)}/>;
                                            let allButton = <Button icon="step-backward"
                                                                    commitAction={() => this.openOrders(order)}/>;
                                            let left = OrdinationsUtils.renderImplodedOrder(order, this.props.data.get('dishes'), this.props.data.get('additions'));
                                            return (
                                                <Row key={order.get('order').get('uuid')} align="center">
                                                    <Column auto>
                                                        <div className="ml-auto">{singleButton} {allButton}</div>
                                                    </Column>
                                                    <Column>
                                                        <FormattedParagraph leftText={left}
                                                                            rightText={OrdinationsUtils.formatPrice(order.get('price'))}/>
                                                    </Column>
                                                </Row>
                                            );
                                        })
                                    }
                                </Scrollable>
                            </Column>
                        </Row>
                        <Row topSpaced>
                            <Column>
                                <Button icon="fast-backward"
                                        commitAction={() => this.openAllOrders()}/>
                            </Column>
                        </Row>
                        <Row>
                            <Column>
                                <b>TOTALE SCONTRINO: <span>{OrdinationsUtils.formatPrice(total)}</span></b>
                            </Column>
                        </Row>
                    </Column>
                </Row>
            );
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