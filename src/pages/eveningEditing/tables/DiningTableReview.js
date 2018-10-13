import React from 'react';
import {iGet} from "../../../utils/Utils";
import OrdinationsUtils from "../OrdinationsUtils";
import Scrollable from "../../../components/widgets/Scrollable";
import Column from "../../../widgets/Column";
import Row from "../../../widgets/Row";
import DiningTablesUtils from "./DiningTablesUtils";
import FormattedParagraph from "../../../widgets/FormattedParagraph";

export default class DiningTableReview extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let props = this.props;
        let orders = [];
        let evening = props.get('evening');
        let table = iGet(props, "diningTableEditing.diningTable");

        table.get('ordinations').forEach(ordination => {
            ordination.get('orders').forEach(order => {
                orders.push(order);
            });
        });
        let allOrders = orders;
        let groups = DiningTablesUtils.implode(orders);
        groups = OrdinationsUtils.sortByDish(groups, props.get('dishes'), props.get('additions'));
        let ordersComponents = groups.map(grp => {
            let left = OrdinationsUtils.renderImplodedOrder(grp, props.get('dishes'), props.get('additions'));
            let textColor;
            if (grp.get('price') === 0) {
                textColor = "danger";
            }
            return <Row key={grp.get('groupId')}>
                <Column>
                    <FormattedParagraph textColor={textColor} leftText={left}
                                        rightText={OrdinationsUtils.formatGroupPrice(grp)}/>
                </Column>
            </Row>;
        });
        let coverCharges = table.get('coverCharges');
        let leftCoverCharges = coverCharges + " ";
        if (coverCharges > 1) {
            leftCoverCharges += " COPERTI";
        } else {
            leftCoverCharges += " COPERTO";
        }
        let coverChargesPrice = coverCharges * evening.get('coverCharge');
        let rightCoverCharges = OrdinationsUtils.formatPrice(coverChargesPrice);
        let total = OrdinationsUtils.total(allOrders) + coverChargesPrice;

        return <Row grow>
            <Column>
                <Row>
                    <Column>
                        <h5>Riepilogo {DiningTablesUtils.renderDiningTable(table, props.get('tables'), props.get('waiters'))}</h5>
                    </Column>
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