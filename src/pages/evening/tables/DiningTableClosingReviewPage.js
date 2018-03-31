import React, {Component} from 'react';
import Button from "../../../widgets/Button";
import GraphWizardPage from "../../../components/widgets/wizard/graph-wizard/GraphWizardPage";
import Row from "../../../widgets/Row";
import Column from "../../../widgets/Column";
import OrdinationsUtils from "../OrdinationsUtils";
import Scrollable from "../../../components/widgets/Scrollable";
import diningTablesEditorActions from "./DiningTablesEditorActions";
import DiningTablesUtils from "./DiningTablesUtils";
import FormattedParagraph from "../../../widgets/FormattedParagraph";
import IntegerInput from "../../../components/widgets/inputs/IntegerInput";
import PercentInput from "../../../components/widgets/inputs/PercentInput";
import FloatInput from "../../../components/widgets/inputs/float/FloatInput";

const BILLS_NUMBER = 0;
const PERC_DISCOUNT = 1;
const TOTAL = 2;

export default class DiningTableClosingReviewPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            refining: null
        };
    }

    setSplit(value) {
        diningTablesEditorActions.setSplit(value);
    }

    setPercent(value) {
        diningTablesEditorActions.setPercent(value);
    }

    setFinalTotal(value) {
        diningTablesEditorActions.setFinalTotal(value);
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
            let total = OrdinationsUtils.total(orders);
            let coverCharges = this.props.wizardData.get('coverCharges');
            let coverChargesPrice = coverCharges * this.props.data.get('evening').get('coverCharge');
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
                                        orders.map(order => {
                                            let singleButton = <Button icon="angle-left"
                                                                       commitAction={() => this.openOrder(order)}/>;
                                            let allButton = <Button icon="angle-double-left"
                                                                    commitAction={() => this.openOrders(order)}/>;
                                            let left = OrdinationsUtils.renderImplodedOrder(order, this.props.data.get('dishes'), this.props.data.get('additions'));
                                            return (
                                                <Row key={order.get('order').get('uuid')} align="center">
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
        let refining = this.buildRefiningComponents();
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
        let discount = this.props.wizardData.get('percent');
        let billsNumber = this.props.wizardData.get('split');
        let total = this.calculateRealTotal();
        return [
            <Row>
                <Column>
                    <FormattedParagraph leftText="SCONTO:" rightText={discount + "%"} leftBold/>
                </Column>
            </Row>,
            <Row>
                <Column>
                    <FormattedParagraph leftText="NUMERO SCONTRINI:" rightText={billsNumber || 1} leftBold/>
                </Column>
            </Row>,
            <Row>
                <Column>
                    <FormattedParagraph leftText="TOTALE DEFINITIVO:"
                                        rightText={OrdinationsUtils.formatPrice(this.props.wizardData.get('finalTotal'))}
                                        leftBold/>
                </Column>
            </Row>
        ];
    }

    calculateRealTotal() {
        let dishes = this.props.data.get('dishes');
        let additions = this.props.data.get('additions');
        let discount = this.props.wizardData.get('percent');
        let billsNumber = this.props.wizardData.get('split');
        let invoiceOrders = this.props.wizardData.get('orders');
        let orders = DiningTablesUtils.findTableOrders(this.props.data.get('editingTable'));

        orders = orders.filter(order => invoiceOrders.includes(order.get('uuid')));
        orders = DiningTablesUtils.implode(orders);
        orders = OrdinationsUtils.sortByDish(orders, dishes, additions);
        let total = OrdinationsUtils.total(orders);
        total += this.props.wizardData.get('coverCharges') * this.props.data.get('evening').get('coverCharge');
        total = total - discount * total / 100;
        total = billsNumber > 0 ? total / billsNumber : total;
        return Math.floor(total * 100) / 100;
    }

    buildRefiningComponents() {
        let split = this.props.wizardData.get('split');
        let refiningComponent = this.buildRefiningComponent();
        return <Row>
            <Column>
                <Row>
                    <Column>
                        <Button text="Sconto percentuale"
                                commitAction={() => this.setRefiningComponent(PERC_DISCOUNT)}/>
                    </Column>
                    <Column>
                        <Button text="Dividi in parti uguali"
                                commitAction={() => this.setRefiningComponent(BILLS_NUMBER)}/>
                    </Column>
                    <Column>
                        <Button text="Aggiusta totale"
                                commitAction={() => this.setRefiningComponent(TOTAL)}/>
                    </Column>
                </Row>
                <Row topSpaced>
                    <Column>
                        {refiningComponent}
                    </Column>
                </Row>
            </Column>
        </Row>
    }

    setRefiningComponent(value) {
        this.setState({
            refining: value
        });
    }

    buildRefiningComponent() {
        if (this.state.refining === BILLS_NUMBER) {
            return <Row>
                <Column>
                    <IntegerInput
                        default={this.props.wizardData.get('split')}
                        commitAction={(value) => this.setSplit(value)}
                    />
                </Column>
            </Row>;
        } else if (this.state.refining === PERC_DISCOUNT) {
            return <Row>
                <Column>
                    <PercentInput
                        default={this.props.wizardData.get('percent')}
                        commitAction={(value) => this.setPercent(value)}
                    />
                </Column>
            </Row>;
        } else if (this.state.refining === TOTAL) {
            return <Row>
                <Column>
                    <FloatInput
                        default={this.props.wizardData.get("finalTotal")}
                        commitAction={(value) => this.setFinalTotal(value)}
                    />
                </Column>
            </Row>;
        }
    }
}