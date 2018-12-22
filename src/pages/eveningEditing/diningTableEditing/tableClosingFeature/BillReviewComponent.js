import React from 'react';
import DiningTablesUtils from "../../tables/DiningTablesUtils";
import DiningTablesClosingActions from "./DiningTablesClosingActions";
import BillActionsComponent from "./BillActionsComponent";
import OrderGroupReviewComponent from "../ordinationsEditing/review/OrderGroupReviewComponent";
import Row from "../../../../widgets/Row";
import Column from "../../../../widgets/Column";
import Button from "../../../../widgets/Button";
import OrdinationsUtils from "../../OrdinationsUtils";

export default class BillReviewComponent extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let titleComponent;

        const bill = this.props.bill;

        titleComponent =
            <Row align="center">
                <Column auto>
                    <h4><strong>{DiningTablesUtils.renderBill(bill)}</strong></h4>
                </Column>
                <Column/>
                <Column auto>
                    <Button icon="gear"
                            commitAction={() => DiningTablesClosingActions.showOptions(bill)}/>
                </Column>
                <BillActionsComponent
                    bill={this.props.bill}
                    visible={this.props.options === this.props.bill.uuid}/>
            </Row>;

        const ccs = this.buildCCSContent();
        const ordersContent = this.buildOrdersContent();
        const total = this.buildTotalContent();

        return <Row customCss="bordered" grow bitPadded>
            <Column>
                {titleComponent}
                <Row grow>
                    <Column>
                        {ccs}
                        {ordersContent}
                        {total}
                    </Column>
                </Row>
            </Column>
        </Row>;
    }

    buildCCSContent() {
        const ccs = this.props.bill.coverCharges;
        if(ccs > 0) {
            const title = ccs > 1 ? "COPERTI" : "COPERTO";
            const total = ccs * this.props.bill.table.evening.coverCharge;
            return <Row>
                <Column auto>{ccs} {title}</Column>
                <Column/>
                <Column auto>{OrdinationsUtils.formatPrice(total)}</Column>
            </Row>
        }
        return null;
    }

    buildOrdersContent() {
        const bill = this.props.bill;
        const groups = DiningTablesUtils.implode(bill.orders);
        return groups.map(group =>
            <Row key={group.groupId}>
                <Column>
                    <OrderGroupReviewComponent group={group}/>
                </Column>
            </Row>);
    }

    buildTotalContent() {
        const bill = this.props.bill;
        let estimatedTotal = 0;
        bill.orders.forEach(order => estimatedTotal += order.price);
        estimatedTotal += bill.coverCharges * bill.table.evening.coverCharge;

        let realTotal = bill.total;

        let discount;
        if (realTotal > estimatedTotal) {
            discount = <Row key="more">
                <Column auto>MAGGIORAZIONE</Column>
                <Column/>
                <Column auto>{OrdinationsUtils.formatPrice(realTotal - estimatedTotal)}</Column>
            </Row>
        } else if (estimatedTotal > realTotal) {
            discount = <Row key="less">
                <Column auto>SCONTO</Column>
                <Column/>
                <Column auto>{OrdinationsUtils.formatPrice(estimatedTotal - realTotal)}</Column>
            </Row>
        }

        const total = <Row key="tot">
            <Column auto><strong>TOTALE</strong></Column>
            <Column/>
            <Column auto><strong>{OrdinationsUtils.formatPrice(realTotal)}</strong></Column>
        </Row>;

        return [discount, total];
    }
}