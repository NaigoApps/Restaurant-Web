import React, {Component} from 'react';
import TableEntitySelectInput from "./widgets/inputs/table/TableEntitySelectInput";
import TableFloatInput from "./widgets/inputs/table/TableFloatInput";
import TableTextInput from "./widgets/inputs/table/TableTextInput";
import ordersActions from "../pages/evening/OrdersActions";

export default class OrderEditor extends Component {
    constructor(props) {
        super(props);
    }

    changeDish(dish){
        ordersActions.updateDish(this.props.order.uuid, dish.uuid);
    }

    render() {
        const order = this.props.order;
        let dishes = [];
        this.props.categories.forEach(category => {
            dishes = dishes.concat(category.dishes);
        });

        return (
            <tr>
                <td>
                    <TableEntitySelectInput
                        commitAction={this.changeDish.bind(this)}
                        default={(order.dish)?order.dish.uuid : ""}
                        options={dishes}
                        render={dish => {
                            return dish.name
                        }}
                    />
                </td>
                <td>
                    <TableFloatInput
                        default={order.price}
                        unit="€"
                    />
                </td>
                <td>
                    <TableTextInput
                        default={order.notes}
                    />
                </td>
            </tr>
        );
    }

}