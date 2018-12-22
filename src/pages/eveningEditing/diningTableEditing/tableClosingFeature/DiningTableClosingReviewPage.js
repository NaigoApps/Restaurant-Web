import React, {Component} from 'react';
import Row from "../../../../widgets/Row";
import Column from "../../../../widgets/Column";
import OrdinationsUtils from "../../OrdinationsUtils";
import Scrollable from "../../../../components/widgets/Scrollable";
import DiningTablesUtils from "../../tables/DiningTablesUtils";
import FormattedParagraph from "../../../../widgets/FormattedParagraph";
import DiningTablesClosingActions from "./DiningTablesClosingActions";
import FloatEditor from "../../../../components/widgets/inputs/float/FloatEditor";
import IntegerEditor from "../../../../components/widgets/inputs/IntegerEditor";
import PercentEditor from "../../../../components/widgets/inputs/PercentEditor";

export default class DiningTableClosingReviewPage extends Component {
    constructor(props) {
        super(props);
    }

    buildInvoiceSummary() {
        const data = this.props;
        let table = data.table;
        let closingData = data.billsEditing;
        if (closingData) {
            let invoiceOrders = closingData.currentBill.orders;
            let tableOrders = table.listOrders();
            tableOrders = tableOrders.filter(order => invoiceOrders.includes(order));
            let total = OrdinationsUtils.total(tableOrders);
            tableOrders = DiningTablesUtils.implode(tableOrders);
            tableOrders = OrdinationsUtils.sortByDish(tableOrders);
            total += closingData.currentBill.coverCharges * data.data.evening.coverCharge;

            let refinedTotalView = this.buildRefinedTotalView();

            const coverChargesComponent = this.buildCoverChargesComponent();
            return (
                <Row grow>
                    <Column>
                        <Row grow>
                            <Column>
                                <Scrollable>
                                    {coverChargesComponent}
                                    {
                                        tableOrders.map(grp => {
                                            let left = OrdinationsUtils.renderImplodedOrder(grp, data.dishes, this.props.additions);
                                            return (
                                                <Row key={grp.groupId} align="center">
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

    buildCoverChargesComponent(){
        const coverCharges = this.props.billsEditing.currentBill.coverCharges;
        if(coverCharges > 0) {
            const coverChargesPrice = coverCharges * this.props.data.evening.coverCharge;
            return <Row align="center">
                <Column>
                    <FormattedParagraph leftText={coverCharges + " COPERTI"}
                                        rightText={OrdinationsUtils.formatPrice(coverChargesPrice)}/>
                </Column>
            </Row>
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
        let wizardData = data.billsEditing.closingWizard;
        let discount = wizardData.percent;
        let billsNumber = wizardData.split;

        let discountedTotal = OrdinationsUtils.formatPrice(this.calculateDiscountedTotal());
        let totalSplittedPrice = OrdinationsUtils.formatPrice(data.billsEditing.currentBill.total / billsNumber);
        if (billsNumber > 1) {
            totalSplittedPrice = totalSplittedPrice + " x " + billsNumber + " = " +
                OrdinationsUtils.formatPrice(data.billsEditing.currentBill.total);
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
        let table = data.table;
        let wizardData = data.billsEditing.closingWizard;

        let discount = wizardData.percent;

        let invoiceOrders = data.billsEditing.currentBill.orders;
        let orders = table.listOrders();

        orders = orders.filter(order => invoiceOrders.includes(order));
        let total = OrdinationsUtils.total(orders);
        total += data.billsEditing.currentBill.coverCharges * data.data.evening.coverCharge;
        return total - discount * total / 100;
    }

    setRefiningComponent(value) {
        this.setState({
            refining: value
        });
    }

    buildRefiningComponent() {
        const data = this.props;
        const wizardData = data.billsEditing.closingWizard;
        const billsNumber = wizardData.split;
        const singlePartTotal = data.billsEditing.currentBill.total / billsNumber;
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
                        <PercentEditor
                            type="info"
                            options={{
                                label: "Sconto percentuale",
                                value: wizardData.percent,
                                callback: result => DiningTablesClosingActions.setPercent(result)
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
                                label: (billsNumber > 1) ? "Totale per parte" : "Totale definitivo",
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