import React from 'react';
import diningTablesEditorActions from "./tables/DiningTablesEditorActions";
import Button from "../../widgets/Button";
import {findByUuid, uuid} from "../../utils/Utils";
import OrdinationsUtils from "./OrdinationsUtils";
import Scrollable from "../../components/widgets/Scrollable";
import Column from "../../widgets/Column";
import Row from "../../widgets/Row";
import DiningTablesUtils from "./tables/DiningTablesUtils";
import FormattedParagraph from "../../widgets/FormattedParagraph";

export default class BillReview extends React.Component {
    constructor(props) {
        super(props);
    }

    printBill() {
        diningTablesEditorActions.printBill(this.props.data.bill);
    }

    deleteBill() {
        diningTablesEditorActions.deleteBill(this.props.data.table.uuid, this.props.data.bill);
    }

    static getReviewContent(props) {
        let bill = findByUuid(props.table.bills, props.bill);
        let orders = DiningTablesUtils.findTableOrders(props.table);
        orders = orders.filter(order => bill.orders.includes(order.uuid));
        orders = DiningTablesUtils.implode(orders);
        orders = OrdinationsUtils.sortByDish(orders, props.dishes, props.additions);
        let ordersComponents = orders.map(o => {
            let left = OrdinationsUtils.renderImplodedOrder(o, props.dishes, props.additions);
            return <Row key={o.order.dish + uuid()}>
                <Column>
                    <FormattedParagraph leftText={left} rightText={OrdinationsUtils.formatPrice(o.price)}/>
                </Column>
            </Row>;
        });
        return <Scrollable>
            {ordersComponents}
        </Scrollable>;
    }

    render() {

        return <Row topSpaced grow>
            <Column>
                {BillReview.getReviewContent(this.props.data)}
            </Column>
            <Column>
                <Row grow>
                    <Column>
                        <Button
                            text="Stampa"
                            icon="print"
                            size="lg"
                            commitAction={this.printBill.bind(this)}
                            fullHeight/>
                    </Column>
                    <Column>
                        <Button
                            text="Annulla"
                            icon="remove"
                            size="lg"
                            commitAction={this.deleteBill.bind(this)}
                            fullHeight/>
                    </Column>
                </Row>
            </Column>
        </Row>;
    }

}