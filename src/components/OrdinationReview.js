import React from 'react';
import {findByUuid, uuid} from "../utils/Utils";
import OrdinationsUtils from "../pages/evening/OrdinationsUtils";
import Scrollable from "./widgets/Scrollable";
import PaginatedLines from "../widgets/PaginatedLines";
import Column from "../widgets/Column";
import Row from "../widgets/Row";
import Button from "../widgets/Button";

export default class OrdinationReview extends React.Component {
    constructor(props) {
        super(props);
    }

    renderOrder(order) {
        let result = order.quantity + " " +
            this.props.data.dishes.find(d => d.uuid === order.order.dish).name + " ";

        order.order.additions.forEach(uuid => {
            let addition = findByUuid(this.props.data.additions, uuid);
            if (addition) {
                result += addition.name + " "
            }
        });

        return <Row key={order.order.dish + uuid()}>
            <Column sm="10">
                <p className="text-left">{result}</p>
            </Column>
            <Column sm="2">
                <p className="text-right">{OrdinationsUtils.formatPrice(order.price)}</p>
            </Column>
        </Row>
    }

    renderOrders(orders) {
        let phaseOrders = OrdinationsUtils.makePhaseMap(orders);
        let phasesComponents = [];
        let ordersEditor = phaseOrders.forEach((orders, phase) => {
            orders = OrdinationsUtils.implode(orders);
            orders = OrdinationsUtils.sortByDish(orders, this.props.data.dishes);
            phasesComponents.push(<div key={phase}>
                <p><b>{findByUuid(this.props.data.phases, phase).name}</b></p>
            </div>);

            let ordersRenderer = orders.map(o => this.renderOrder(o));

            ordersRenderer.forEach(component => {
                phasesComponents.push(component);
            });
        });
        return <Column>
            <Scrollable>
                {phasesComponents}
            </Scrollable>
        </Column>;
    }

    render() {
        return <Row grow>
            {this.renderOrders(this.props.data.orders)}
        </Row>;
    }

}