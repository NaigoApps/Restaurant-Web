import React, {Component} from 'react';
import TextInput from "./widgets/inputs/TextInput";
import DishesManagementComponent from "../old/DishesEditor";
import menuManagementActions from "../pages/menu/CategoriesActions";
import {findByUuid} from "../utils/Utils";
import EntitySelectInput from "./widgets/inputs/EntitySelectInput";
import TableEntitySelectInput from "./widgets/inputs/table/TableEntitySelectInput";
import FloatInput from "./widgets/inputs/FloatInput";
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