import React from 'react';
import diningTablesEditorActions from "./DiningTablesEditorActions";
import Button from "../../widgets/Button";
import {findByUuid, uuid} from "../../utils/Utils";
import ButtonGroup from "../../widgets/ButtonGroup";
import OrdinationsUtils from "./OrdinationsUtils";
import Scrollable from "../../components/widgets/Scrollable";
import Column from "../../widgets/Column";
import Row from "../../widgets/Row";
import DiningTableClosingView from "./DiningTableClosingView";

export default class DiningTableReview extends React.Component {
    constructor(props) {
        super(props);
    }

    printPartialBill() {
        diningTablesEditorActions.printPartialBill(this.props.data.table.uuid);
    }

    beginDiningTableClosing() {
        diningTablesEditorActions.beginDiningTableClosing();
    }

    static getReviewContent(props) {
        let orders = [];
        props.ordinations.forEach(ordination => {
            ordination.orders.forEach(order => {
                orders.push(order);
            });
        });
        orders = OrdinationsUtils.implode(orders);
        let ordersComponents = orders.map(o => {
            return <Row key={o.order.dish + uuid()}>
                <Column sm="10">{o.quantity} {findByUuid(props.dishes, o.order.dish).name}</Column>
                <Column sm="2" right={true}>{OrdinationsUtils.formatPrice(o.price)}</Column>
            </Row>;
        });
        return <Scrollable>
            {ordersComponents}
        </Scrollable>;
    }

    render() {

        return <Row topSpaced grow>
            <Column>
                {DiningTableReview.getReviewContent(this.props.data)}
            </Column>
            <Column>
                <ButtonGroup>
                    <Button text="Stampa pre-conto" icon="print"
                            commitAction={this.printPartialBill.bind(this)}/>
                    <Button text="Conto" icon="euro"
                            commitAction={this.beginDiningTableClosing.bind(this)}/>
                </ButtonGroup>
                <DiningTableClosingView
                    dishes={this.props.data.dishes}
                    additions={this.props.data.additions}
                    table={this.props.data.diningTable}
                    ordinations={this.props.data.ordinations}
                    invoice={this.props.data.currentInvoice}
                    visible={this.props.data.closingDiningTable}
                />
            </Column>
        </Row>;
    }
}