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

export default class DiningTableClosingReviewPage extends Component {
    constructor(props) {
        super(props);
    }

    buildInvoiceSummary() {
        const data = this.props.data;
        let table = iGet(data, "diningTablesEditing.diningTable");
        let dishes = data.get('dishes');
        let additions = data.get('additions');
        let wizardData = iGet(data, 'diningTableClosing');
        if (wizardData) {
            let invoiceOrders = wizardData.get('orders');
            let orders = DiningTablesUtils.findTableOrders(table);
            orders = orders.filter(order => invoiceOrders.includes(order.get('uuid')));
            let total = OrdinationsUtils.total(orders);
            orders = DiningTablesUtils.implode(orders);
            orders = OrdinationsUtils.sortByDish(orders, dishes, additions);
            let coverCharges = wizardData.get('coverCharges');
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
                                            let singleButton = <Button icon="angle-left"
                                                                       commitAction={() => this.openOrder(grp)}/>;
                                            let allButton = <Button icon="angle-double-left"
                                                                    commitAction={() => this.openOrders(grp)}/>;
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
        let discount = iGet(wizardData, 'percentInput.value');
        let billsNumber = iGet(wizardData, 'splitInput.value');
        let total = this.calculateRealTotal();

        let discountedTotal = OrdinationsUtils.formatPrice(this.calculateDiscountedTotal());
        let totalPrice = OrdinationsUtils.formatPrice(iGet(wizardData, 'finalTotalInput.value'));
        if (billsNumber > 1) {
            totalPrice = totalPrice + " x " + billsNumber + " = " +
                OrdinationsUtils.formatPrice(iGet(wizardData, 'finalTotalInput.value') * billsNumber);
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
                                        rightText={totalPrice}
                                        leftBold/>
                </Column>
            </Row>
        ];
    }

    calculateDiscountedTotal(){
        const data = this.props.data;
        let table = iGet(data, "diningTablesEditing.diningTable");
        let wizardData = data.get('diningTableClosing');
        let dishes = data.get('dishes');
        let additions = data.get('additions');

        let discount = iGet(wizardData, 'percentInput.value');
        let billsNumber = iGet(wizardData, 'splitInput.value');

        let invoiceOrders = wizardData.get('orders');
        let orders = DiningTablesUtils.findTableOrders(table);

        orders = orders.filter(order => invoiceOrders.includes(order.get('uuid')));
        let total = OrdinationsUtils.total(orders);
        total += wizardData.get('coverCharges') * iGet(data, 'evening.coverCharge');
        return total - discount * total / 100;
    }

    calculateRealTotal() {
        let discountedTotal = this.calculateDiscountedTotal();
        const data = this.props.data;
        let wizardData = data.get('diningTableClosing');
        let billsNumber = iGet(wizardData, 'splitInput.value');

        let total = billsNumber > 0 ? discountedTotal / billsNumber : discountedTotal;
        return total.toFixed(2);
    }

    setRefiningComponent(value) {
        this.setState({
            refining: value
        });
    }

    buildRefiningComponent() {
        let wizardData = this.props.data.get('diningTableClosing');
        return <Row>
            <Column>
                <Row>
                    <Column>
                        <h5>Sconto percentuale</h5>
                    </Column>
                </Row>
                <Row>
                    <Column>
                        <PercentInput
                            text={iGet(wizardData, "percentInput.text")}
                            onChar={(char) => DiningTablesClosingActions.percentChar(char)}
                            onChange={(text) => DiningTablesClosingActions.percentChange(text)}
                        />
                    </Column>
                </Row>
                <Row topSpaced>
                    <Column>
                        <h5>Totale</h5>
                    </Column>
                </Row>
                <Row>
                    <Column>
                        <FloatInput
                            text={iGet(wizardData, 'finalTotalInput.text')}
                            onChar={(char) => DiningTablesClosingActions.finalTotalChar(char)}
                            onChange={(text) => DiningTablesClosingActions.finalTotalChange(text)}
                        />
                    </Column>
                </Row>
            </Column>
        </Row>;
    }
}