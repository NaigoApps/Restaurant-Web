import React from 'react';
import {findByUuid, uuid} from "../utils/Utils";
import OrdinationsUtils from "../pages/evening/OrdinationsUtils";
import Scrollable from "./widgets/Scrollable";
import PaginatedLines from "../widgets/PaginatedLines";

export default class OrdinationReview extends React.Component {
    constructor(props) {
        super(props);
    }

    renderOrder(order) {
        let result = order.quantity + " " +
            this.props.dishes.find(d => d.uuid === order.order.dish).name + " ";

        order.order.additions.forEach(uuid => {
            let addition = findByUuid(this.props.additions, uuid);
            if (addition) {
                result += addition.name + " "
            }
        });

        return <div key={order.order.dish + uuid()} className="row">
            <div className="col-sm-8">
                <p className="text-left">{result}</p>
            </div>
            <div className="col-sm-4">
                <p className="text-right">{OrdinationsUtils.formatPrice(order.price)}</p>
            </div>
        </div>
    }

    renderOrders(orders) {
        let phaseOrders = OrdinationsUtils.makePhaseMap(orders);
        let phasesComponents = [];
        let ordersEditor = phaseOrders.forEach((orders, phase) => {
            orders = OrdinationsUtils.implode(orders);
            orders = OrdinationsUtils.sortByDish(orders, this.props.dishes);
            let ordersRenderer = orders.map(o => this.renderOrder(o));
            phasesComponents.push(<div key={phase}>
                <p><b>{findByUuid(this.props.phases, phase).name}</b></p>
            </div>);

            ordersRenderer.forEach(component => {
                phasesComponents.push(component);
            });
        });
        return <div className="col-sm-12">
            <PaginatedLines>
                {phasesComponents}
            </PaginatedLines>
        </div>;
    }

    render() {
        return <div className="row">
            {this.renderOrders(this.props.orders)}
        </div>;
    }

}