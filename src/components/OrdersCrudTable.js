import React, {Component} from 'react';
import Button from "../widgets/Button";
import ordersActions from "../pages/evening/OrdersActions";
import OrderEditor from "./OrderEditor";

export default class OrdersCrudTable extends Component {
    constructor(props) {
        super(props);
    }

    createOrder() {
        ordersActions.createOrder(this.props.table.uuid);
    }

    render() {
        const ordersTable = this.props.table.orders.map((order) =>
            <OrderEditor
                key={order.uuid}
                order={order}
                categories={this.props.categories}
            />
        )

        return (
            <div>
                <div className="panel panel-default">
                    <div className="panel-heading">Ordini</div>
                    <table className="table table-condensed table-bordered">
                        <thead>
                        <tr>
                            <th>Piatto</th>
                            <th>Prezzo</th>
                            <th>Note</th>
                        </tr>
                        </thead>
                        <tbody>
                        {ordersTable}
                        </tbody>
                    </table>
                    <div className="text-center">
                        <Button
                            icon="plus"
                            commitAction={this.createOrder.bind(this)}
                        />
                    </div>
                </div>
            </div>
        );
    }
}