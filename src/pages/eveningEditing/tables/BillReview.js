import React, {Component} from 'react';
import DiningTablesUtils from "./DiningTablesUtils";
import {iGet} from "../../../utils/Utils";
import Row from "../../../widgets/Row";
import Column from "../../../widgets/Column";
import OrdinationsUtils from "../OrdinationsUtils";
import FormattedParagraph from "../../../widgets/FormattedParagraph";
import Scrollable from "../../../components/widgets/Scrollable";

export default class BillReview extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        let props = this.props.data;
        let orders = [];
        let evening = props.get('evening');
        let table = iGet(props, "diningTableEditing.diningTable");
        let bill = iGet(props, "tableClosingFeature.bill");

        table.get('ordinations').forEach(ordination => {
            ordination.get('orders').forEach(order => {
                orders.push(order);
            });
        });

        orders = orders.filter(order => bill.get('orders').includes(order.get('uuid')));

        let allOrders = orders;
        let groups = DiningTablesUtils.implode(orders);
        groups = OrdinationsUtils.sortByDish(groups, props.get('dishes'), props.get('additions'));
        let ordersComponents = groups.map(grp => {
            let left = OrdinationsUtils.renderImplodedOrder(grp, props.get('dishes'), props.get('additions'));
            return <Row key={grp.get('groupId')}>
                <Column>
                    <FormattedParagraph leftText={left} rightText={OrdinationsUtils.formatGroupPrice(grp)}/>
                </Column>
            </Row>;
        });
        let coverCharges = bill.get('coverCharges');
        let leftCoverCharges = coverCharges + " ";
        if (coverCharges > 1) {
            leftCoverCharges += " COPERTI";
        } else {
            leftCoverCharges += " COPERTO";
        }
        let coverChargesPrice = coverCharges * evening.get('coverCharge');
        let rightCoverCharges = OrdinationsUtils.formatPrice(coverChargesPrice);
        let total = bill.get('total');
        return <Row grow>
            <Column>
                <Row>
                    <Column><h5>Riepilogo {DiningTablesUtils.renderBill(bill, props.get('customers'))}</h5></Column>
                </Row>
                <Row grow>
                    <Column>
                        <Scrollable>
                            <Row>
                                <Column>
                                    <FormattedParagraph leftText={leftCoverCharges} rightText={rightCoverCharges}/>
                                </Column>
                            </Row>
                            {ordersComponents}
                        </Scrollable>
                        <Row>
                            <Column>
                                <h5><b>TOTALE: <span>{OrdinationsUtils.formatPrice(total)}</span></b></h5>
                            </Column>
                        </Row>
                    </Column>
                </Row>
            </Column>
        </Row>;
    }
}