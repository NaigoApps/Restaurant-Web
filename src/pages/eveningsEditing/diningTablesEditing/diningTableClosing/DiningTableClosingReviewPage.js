import React, {Component} from 'react';
import Button from "../../../../widgets/Button";
import GraphWizardPage from "../../../../components/widgets/wizard/graph-wizard/GraphWizardPage";
import Row from "../../../../widgets/Row";
import Column from "../../../../widgets/Column";
import OrdinationsUtils from "../../OrdinationsUtils";
import Scrollable from "../../../../components/widgets/Scrollable";
import DiningTablesUtils from "../../tables/DiningTablesUtils";
import FormattedParagraph from "../../../../widgets/FormattedParagraph";
import PercentInput from "../../../../components/widgets/inputs/PercentInput";
import FloatInput from "../../../../components/widgets/inputs/float/FloatInput";
import {DiningTablesClosingActions} from "./DiningTablesClosingActions";
import {iGet} from "../../../../utils/Utils";
import FloatEditor from "../../../../components/widgets/inputs/float/FloatEditor";
import IntegerEditor from "../../../../components/widgets/inputs/IntegerEditor";

export default class DiningTableClosingReviewPage extends Component {
    constructor(props) {
        super(props);
    }

    buildInvoiceSummary() {
        const data = this.props.data;
        let table = iGet(data, "diningTablesEditing.diningTable");
        let dishes = data.get('dishes');
        let additions = data.get('additions');
        let closingData = iGet(data, 'diningTableClosing');
        if (closingData) {
            let invoiceOrders = iGet(closingData, 'selectedBill.orders');
            let orders = DiningTablesUtils.findTableOrders(table);
            orders = orders.filter(order => invoiceOrders.includes(order.get('uuid')));
            let total = OrdinationsUtils.total(orders);
            orders = DiningTablesUtils.implode(orders);
            orders = OrdinationsUtils.sortByDish(orders, dishes, additions);
            let coverCharges = iGet(closingData, 'selectedBill.coverCharges');
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
                                            let left = OrdinationsUtils.renderImplodedOrder(grp, data.get('dishes'), this.props.data.get('additions'));
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
            <GraphWizardPage
                abortAction={this.props.abortAction}
                confirmAction={this.props.confirmAction}>
                <Row grow>
                    <Column>
                        {summary}
                    </Column>
                    <Column>
                        {refining}
                    </Column>
                </Row>
            </GraphWizardPage>
        )
    }

    buildRefinedTotalView() {
        let wizardData = this.props.data.get('diningTableClosing');
        let discount = iGet(wizardData, 'percent');
        let billsNumber = iGet(wizardData, 'split');

        let discountedTotal = OrdinationsUtils.formatPrice(this.calculateDiscountedTotal());
        let totalSplittedPrice = OrdinationsUtils.formatPrice(iGet(wizardData, 'selectedBill.total') / billsNumber);
        if (billsNumber > 1) {
            totalSplittedPrice = totalSplittedPrice + " x " + billsNumber + " = " +
                OrdinationsUtils.formatPrice(iGet(wizardData, 'selectedBill.total'));
        }
        return [
            <Row key="discount">
                <Column>
                    <FormattedParagraph leftText={"TOTALE SCONTATO (" + discount + "%):"} rightText={discountedTotal} leftBold/>
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

    calculateDiscountedTotal(){
        const data = this.props.data;
        let table = iGet(data, "diningTablesEditing.diningTable");
        let wizardData = data.get('diningTableClosing');

        let discount = wizardData.get('percent');

        let invoiceOrders = iGet(wizardData, 'selectedBill.orders');
        let orders = DiningTablesUtils.findTableOrders(table);

        orders = orders.filter(order => invoiceOrders.includes(order.get('uuid')));
        let total = OrdinationsUtils.total(orders);
        total += iGet(wizardData,'selectedBill.coverCharges') * iGet(data, 'evening.coverCharge');
        return total - discount * total / 100;
    }

    setRefiningComponent(value) {
        this.setState({
            refining: value
        });
    }

    buildRefiningComponent() {
        let wizardData = this.props.data.get('diningTableClosing');
        let billsNumber = wizardData.get('split');
        return <Row>
            <Column>
                <Row>
                    <Column>
                        <h5>Sconto percentuale</h5>
                    </Column>
                </Row>
                <Row>
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
                                value: iGet(wizardData, 'selectedBill.total'),
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