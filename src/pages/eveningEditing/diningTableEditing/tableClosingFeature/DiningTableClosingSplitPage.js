import React, {Component} from 'react';
import Button from "../../../../widgets/Button";
import Row from "../../../../widgets/Row";
import Column from "../../../../widgets/Column";
import OrdinationsUtils from "../../OrdinationsUtils";
import {uuid} from "../../../../utils/Utils";
import Scrollable from "../../../../components/widgets/Scrollable";
import DiningTablesUtils from "../../tables/DiningTablesUtils";
import FormattedParagraph from "../../../../widgets/FormattedParagraph";
import DiningTablesClosingActions from "./DiningTablesClosingActions";

export default class DiningTableClosingSplitPage extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        let leftContent = this.buildDiningTableSummary();
        let rightContent = this.buildInvoiceSummary();
        return (
            <Row grow>
                <Column lg="6">
                    {leftContent}
                </Column>
                <Column lg="6">
                    {rightContent}
                </Column>
            </Row>
        )
    }

    buildDiningTableSummary() {
        let data = this.props;
        let table = data.table;

        let orders = table.listOpenedOrders();
        let coverCharges = table.listOpenedCoverCharges();

        let total = OrdinationsUtils.total(orders) + coverCharges * data.data.evening.coverCharge;

        orders = DiningTablesUtils.implode(orders);
        orders = OrdinationsUtils.sortByDish(orders);

        let coverChargesCloseRow;
        if(table.coverCharges > 0){
            coverChargesCloseRow = this.buildCoverChargesCloseRow();
        }

        return (
            <Row grow>
                <Column>
                    <Row grow>
                        <Column>
                            <Scrollable>
                                {coverChargesCloseRow}
                                {orders.map(order => {
                                    let singleButton = <Button highPadding
                                                               icon="caret-right"
                                                               commitAction={() => DiningTablesClosingActions.closeOrders(order, 1)}/>;
                                    let allButton = <Button highPadding
                                                            icon="step-forward"
                                                            commitAction={() => DiningTablesClosingActions.closeOrders(order, order.orders.length)}/>;
                                    let left = OrdinationsUtils.renderImplodedOrder(order);
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
                                    commitAction={() => DiningTablesClosingActions.closeAll()}/>
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

    buildCoverChargesCloseRow(){
        const table = this.props.table;
        let coverCharges = table.listOpenedCoverCharges();
        return <Row align="center">
            <Column>
                <FormattedParagraph leftText={coverCharges + " COPERTI"}
                                    rightText={OrdinationsUtils.formatPrice(coverCharges * table.evening.coverCharge)}/>
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
    }

    buildInvoiceSummary() {
        let data = this.props;
        let invoiceOrders = data.billsEditing.currentBill.orders;
        let table = data.table;
        let orders = table.listOrders();
        orders = orders.filter(order => invoiceOrders.includes(order));
        let total = OrdinationsUtils.total(orders);
        orders = DiningTablesUtils.implode(orders);
        orders = OrdinationsUtils.sortByDish(orders);
        let coverCharges = data.billsEditing.currentBill.coverCharges;
        total += coverCharges * data.data.evening.coverCharge;

        let coverChargesOpenRow;
        if(table.coverCharges > 0){
            coverChargesOpenRow = this.buildCoverChargesOpenRow();
        }

        return (
            <Row grow>
                <Column>
                    <Row grow>
                        <Column>
                            <Scrollable>
                                {coverChargesOpenRow}
                                {
                                    orders.map(order => {
                                        let singleButton = <Button highPadding
                                                                   icon="caret-left"
                                                                   commitAction={() => DiningTablesClosingActions.openOrders(order, 1)}/>;
                                        let allButton = <Button highPadding
                                                                icon="step-backward"
                                                                commitAction={() => DiningTablesClosingActions.openOrders(order, order.orders.length)}/>;
                                        let left = OrdinationsUtils.renderImplodedOrder(order);
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
                                    commitAction={() => DiningTablesClosingActions.openAll()}/>
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

    buildCoverChargesOpenRow(){
        let table = this.props.table;
        let coverCharges = this.props.billsEditing.currentBill.coverCharges;
        return <Row align="center">
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
                                    rightText={OrdinationsUtils.formatPrice(coverCharges * table.evening.coverCharge)}/>
            </Column>
        </Row>
    }


}