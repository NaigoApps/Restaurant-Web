import React, {Component} from 'react';
import Row from "../../../../widgets/Row";
import OrderEditor from "./OrderEditor";
import Column from "../../../../widgets/Column";

export default class DiningTableClosingFixPage extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        let orders = this.props.table.listOrders()
            .filter(order => order.price === 0);

        const ordersComponents = orders.map(order => <Row key={order.uuid} bitSpaced>
            <Column>
                <OrderEditor order={order}/>
            </Column>
        </Row>);

        return (
            <Row>
                <Column>
                    <Row>
                        <Column>
                            <h4>Inserire un prezzo per i seguenti ordini</h4>
                        </Column>
                    </Row>
                    <Row>
                        <Column>
                            {ordersComponents}
                        </Column>
                    </Row>
                </Column>
            </Row>
        )
    }

}