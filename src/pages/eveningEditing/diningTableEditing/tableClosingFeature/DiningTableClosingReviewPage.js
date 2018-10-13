import React, {Component} from 'react';
import Row from "../../../../widgets/Row";
import Column from "../../../../widgets/Column";
import OrdinationsUtils from "../../OrdinationsUtils";
import Scrollable from "../../../../components/widgets/Scrollable";
import DiningTablesUtils from "../../tables/DiningTablesUtils";
import FormattedParagraph from "../../../../widgets/FormattedParagraph";
import {DiningTablesClosingActions} from "./DiningTablesClosingActions";
import {iGet} from "../../../../utils/Utils";
import FloatEditor from "../../../../components/widgets/inputs/float/FloatEditor";
import IntegerEditor from "../../../../components/widgets/inputs/IntegerEditor";

export default class DiningTableClosingReviewPage extends Component {
    constructor(props) {
        super(props);
    }

    buildInvoiceSummary() {
        const data = this.props;
        let table = iGet(data, "diningTableEditing.diningTable");
        let dishes = data.get('dishes');
        let additions = data.get('additions');
        let closingData = iGet(data, 'tableClosingFeature');
        if (closingData) {
            let invoiceOrders = iGet(closingData, 'bill.orders');
            let orders = DiningTablesUtils.findTableOrders(table);
            orders = orders.filter(order => invoiceOrders.includes(order.get('uuid')));
            let total = OrdinationsUtils.total(orders);
            orders = DiningTablesUtils.implode(orders);
            orders = OrdinationsUtils.sortByDish(orders, dishes, additions);
            let coverCharges = iGet(closingData, 'bill.coverCharges');
            let coverChargesPrice = coverCharges * iGet(data, "evening.coverCharge");
            total += coverChargesPrice;

            let refinedTotalView = this.buildRefinedTotalView();
            return (
                <Row grow>
                    <Column>
                        <Row grow>
                            <Column>
                                <Scrollable>
                                    <Row align="center">
                                        <Column>
                                            <FormattedParagraph leftText={coverCharges + " COPERTI"}
                                                                rightText={OrdinationsUtils.formatPrice(coverChargesPrice)}/>
                                        </Column>
                                    </Row>
                                    {
                                        orders.map(grp => {
                                            let left = OrdinationsUtils.renderImplodedOrder(grp, data.get('dishes'), this.props.get('additions'));
                                            return (
                                                <Row key={grp.get('groupId')} align="center">
                                                    <Column>
                                                        <FormattedParagraph leftText={left}
                                                                            rightText={OrdinationsUtils.formatGroupPrice(grp)}/>
                                                    </Column>
                                                </Row>
                                            );
                                        })
                                    }
                                </Scrollable>
                            </Column>
                        </Row>
                        <Row>
                            <Column>
                                <FormattedParagraph leftText="TOTALE PROVVISORIO:"
                                                    rightText={OrdinationsUtils.formatPrice(total)} leftBold/>
                            </Column>
                        </Row>
                        {refinedTotalView}
                    </Column>
                </Row>
            );
        }
        return null;
    }


    render() {
        let summary = this.buildInvoiceSummary();
        let refining = this.buildRefiningComponent();
        return (
            <Row grow>
                <Column>
                    {summary}
                </Column>
                <Column>
                    {refining}
                </Column>
            </Row>
        )
    }

    buildRefinedTotalView() {
        const data = this.props;
        let wizardData = iGet(data, 'tableClosingFeature.closingWizard');
        let discount = iGet(wizardData, 'percent');
        let billsNumber = iGet(wizardData, 'split');

        let discountedTotal = OrdinationsUtils.formatPrice(this.calculateDiscountedTotal());
        let totalSplittedPrice = OrdinationsUtils.formatPrice(iGet(data, 'tableClosingFeature.bill.total') / billsNumber);
        if (billsNumber > 1) {
            totalSplittedPrice = totalSplittedPrice + " x " + billsNumber + " = " +
                OrdinationsUtils.formatPrice(iGet(data, 'tableClosingFeature.bill.total'));
        }
        return [
            <Row key="discount">
                <Column>
                    <FormattedParagraph leftText={"TOTALE SCONTATO (" + discount + "%):"} rightText={discountedTotal}
                                        leftBold/>
                </Column>
            </Row>,
            <Row key="total">
                <Column>
                    <FormattedParagraph leftText="TOTALE DEFINITIVO:"
                                        rightText={totalSplittedPrice}
                                        leftBold/>
                </Column>
            </Row>
        ];
    }

    calculateDiscountedTotal() {
        const data = this.props;
        let table = iGet(data, "diningTableEditing.diningTable");
        let wizardData = iGet(data, 'tableClosingFeature.closingWizard');

        let discount = wizardData.get('percent');

        let invoiceOrders = iGet(data, 'tableClosingFeature.bill.orders');
        let orders = DiningTablesUtils.findTableOrders(table);

        orders = orders.filter(order => invoiceOrders.includes(order.get('uuid')));
        let total = OrdinationsUtils.total(orders);
        total += iGet(data, 'tableClosingFeature.bill.coverCharges') * iGet(data, 'evening.coverCharge');
        return total - discount * total / 100;
    }

    setRefiningComponent(value) {
        this.setState({
            refining: value
        });
    }

    buildRefiningComponent() {
        const data = this.props;
        const wizardData = iGet(data, 'tableClosingFeature.closingWizard');
        const billsNumber = wizardData.get('split');
        const singlePartTotal = iGet(data, 'tableClosingFeature.bill.total') / billsNumber;
        return <Row>
            <Column>
                <Row>
                    <Column>
                        <IntegerEditor
                            type="info"
                            options={{
                                label: "Numero di parti",
                                value: billsNumber,
                                callback: result => DiningTablesClosingActions.setSplit(result),
                                min: 1
                            }}
                        />
                    </Column>
                </Row>
                <Row topSpaced>
                    <Column>
                        <IntegerEditor
                            type="info"
                            options={{
                                label: "Sconto percentuale",
                                value: wizardData.get('percent'),
                                callback: result => DiningTablesClosingActions.setPercent(result),
                                min: 0,
                                max: 99
                            }}
                            percent
                        />
                    </Column>
                </Row>
                <Row topSpaced>
                    <Column>
                        <FloatEditor
                            type="info"
                            options={{
                                label: "Totale definitivo",
                                value: parseFloat(singlePartTotal.toFixed(2)),
                                callback: value => DiningTablesClosingActions.setFinalTotal(value * billsNumber)
                            }}
                            currency
                        />
                    </Column>
                </Row>
            </Column>
        </Row>;
    }
}