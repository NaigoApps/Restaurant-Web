import React, {Component} from 'react';
import graphWizardActions from "../GraphWizardActions";
import GraphWizardPage from "./GraphWizardPage";
import {findByUuid} from "../../../../utils/Utils";

export default class OrdinationReviewPage extends Component {
    constructor(props) {
        super(props);
    }

    implode(orders) {
        let result = new Map();
        orders.forEach(order => {
            let found = false;
            let phaseOrders = result.get(order.phase);
            if (!phaseOrders) {
                phaseOrders = [];
                result.set(order.phase, phaseOrders);
            }
            this.addOrder(phaseOrders, order);
        });
        return result;
    }

    addOrder(orders, order) {
        let found = false;
        orders.forEach(o => {
            if (this.areTheSame(o.order, order)) {
                o.quantity += order.quantity;
                found = true;
            }
        });
        if (!found) {
            orders.push({
                order: order,
                quantity: order.quantity
            })
        }
    }

    areTheSame(o1, o2) {
        if (o1.dish !== o2.dish) {
            return false;
        }
        if (o1.notes || o2.notes) {
            return false;
        }
        let ok = true;
        ok &= o1.additions.every(addition => o2.additions.includes(addition));
        ok &= o2.additions.every(addition => o1.additions.includes(addition));
        return ok;
    }

    optionButtonClass(opt) {
        let classes = ["btn", "btn-lg"];
        classes.push(opt.uuid === this.props.wizardData["categories"] ? "btn-primary" : "btn-default");
        return classes.join(" ");
    }

    render() {
        let phases = this.implode(this.props.wizardData["review"]);

        let rows = [];
        phases.forEach((orders, phase) => {
            let subrows = [];
            orders.forEach(order => {
                subrows.push(<li key={order.order.dish} className="list-group-item">
                    {order.quantity + " x " + this.props.dishes.find(d => d.uuid === order.order.dish).name}
                </li>);
            });
            rows.push(
                <li className="list-group-item">
                    {findByUuid(this.props.phases, phase).name}
                    <ul className="list-group">
                        {subrows}
                    </ul>
                </li>
            );
        });

        return (
            <GraphWizardPage
                abortAction={this.props.abortAction}
                confirmAction={this.props.confirmAction}>
                <ul className="list-group">
                    {rows}
                </ul>
            </GraphWizardPage>
        )
    }

}