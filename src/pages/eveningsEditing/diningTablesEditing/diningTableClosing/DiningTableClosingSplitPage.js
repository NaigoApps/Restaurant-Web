import React, {Component} from 'react';
import Button from "../../../../widgets/Button";
import GraphWizardPage from "../../../../components/widgets/wizard/graph-wizard/GraphWizardPage";
import Row from "../../../../widgets/Row";
import Column from "../../../../widgets/Column";
import OrdinationsUtils from "../../OrdinationsUtils";
import {findByUuid, iGet, uuid} from "../../../../utils/Utils";
import Scrollable from "../../../../components/widgets/Scrollable";
import DiningTablesUtils from "../../tables/DiningTablesUtils";
import FormattedParagraph from "../../../../widgets/FormattedParagraph";
import {DiningTablesEditorActions} from "../DiningTablesEditorActions";
import {DiningTablesClosingActions} from "./DiningTablesClosingActions";

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
        let table = iGet(data, "diningTablesEditing.diningTable");
        let orders = DiningTablesUtils.findTableOpenedOrders(table);
        let coverCharges = DiningTablesUtils.findTableOpenedCoverCharges(table);

        let wizardData = iGet(data, "diningTableClosing");

        if (wizardData && wizardData.get('orders')) {
            wizardData.get('orders').forEach(closedOrderUuid => {
                let index = orders.findIndex(o => o.get('uuid') === closedOrderUuid);
                orders = orders.splice(index, 1);
            });
            coverCharges -= wizardData.get('coverCharges');
        }
        let total = OrdinationsUtils.total(orders) + coverCharges * iGet(data, "evening.coverCharge");

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
                                                            rightText={OrdinationsUtils.formatPrice(coverCharges * iGet(data, 'evening.coverCharge'))}/>
                                    </Column>
                                    <Column auto>
                                        <div className="ml-auto">
                                            <Button highPadding
                                                    icon="caret-right" disabled={coverCharges === 0}
                                                    commitAction={() => DiningTablesClosingActions.closeCoverCharges(1)}/>
                                            &nbsp;<Button highPadding
                                                          icon="step-forward" disabled={coverCharges === 0}
                                                          commitAction={() => DiningTablesClosingActions.closeAllCoverCharges()}/>

                                        </div>
                                    </Column>
                                </Row>
                                {orders.map(order => {
                                    let singleButton = <Button highPadding
                                                               icon="caret-right"
                                                               commitAction={() => DiningTablesClosingActions.closeOrders(order, 1)}/>;
                                    let allButton = <Button highPadding
                                                            icon="step-forward"
                                                            commitAction={() => DiningTablesClosingActions.closeOrders(order, order.get('orders').size)}/>;
                                    let left = OrdinationsUtils.renderImplodedOrder(order, dishes, additions);
                                    return (
                                        <Row key={uuid()} align="center">
                                            <Column>
                                                <FormattedParagraph leftText={left}
                                                                    rightText={OrdinationsUtils.formatGroupPrice(order)}/>
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
                            <Button highPadding
                                    icon="fast-forward"
                                    commitAction={() => DiningTablesClosingActions.closeAllOrders()}/>
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
        let data = this.props.data;
        let dishes = data.get('dishes');
        let additions = data.get('additions');
        let wizardData = iGet(data, "diningTableClosing");
        let invoiceOrders = wizardData.get('orders');
        let table = iGet(data, "diningTablesEditing.diningTable");
        let orders = DiningTablesUtils.findTableOrders(table);
        orders = orders.filter(order => invoiceOrders.includes(order.get('uuid')));
        let total = OrdinationsUtils.total(orders);
        orders = DiningTablesUtils.implode(orders);
        orders = OrdinationsUtils.sortByDish(orders, dishes, additions);
        let coverCharges = wizardData.get('coverCharges');
        total += coverCharges * iGet(data, "evening.coverCharge");
        return (
            <Row grow>
                <Column>
                    <Row grow>
                        <Column>
                            <Scrollable>
                                <Row align="center">
                                    <Column auto>
                                        <div className="ml-auto">
                                            <Button highPadding
                                                    icon="caret-left" disabled={coverCharges === 0}
                                                    commitAction={() => DiningTablesClosingActions.openCoverCharges(1)}/>
                                            &nbsp;<Button highPadding
                                                          icon="step-backward" disabled={coverCharges === 0}
                                                          commitAction={() => DiningTablesClosingActions.openAllCoverCharges()}/>

                                        </div>
                                    </Column>
                                    <Column>
                                        <FormattedParagraph leftText={coverCharges + " COPERTI"}
                                                            rightText={OrdinationsUtils.formatPrice(coverCharges * iGet(data, "evening.coverCharge"))}/>
                                    </Column>
                                </Row>
                                {
                                    orders.map(order => {
                                        let singleButton = <Button highPadding
                                                                   icon="caret-left"
                                                                   commitAction={() => DiningTablesClosingActions.openOrders(order, 1)}/>;
                                        let allButton = <Button highPadding
                                                                icon="step-backward"
                                                                commitAction={() => DiningTablesClosingActions.openOrders(order, order.get('orders').size)}/>;
                                        let left = OrdinationsUtils.renderImplodedOrder(order, dishes, additions);
                                        return (
                                            <Row key={uuid()} align="center">
                                                <Column auto>
                                                    <div className="ml-auto">{singleButton} {allButton}</div>
                                                </Column>
                                                <Column>
                                                    <FormattedParagraph leftText={left}
                                                                        rightText={OrdinationsUtils.formatGroupPrice(order)}/>
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
                            <Button highPadding
                                    icon="fast-backward"
                                    commitAction={() => DiningTablesClosingActions.openAllOrders()}/>
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