import React from 'react';
import {findByUuid} from "../utils/Utils";
import {beautifyTime} from "./widgets/inputs/DateInput";
import Button from "../widgets/Button";
import ordinationsEditorActions from "../pages/evening/OrdinationsEditorActions";
import ButtonGroup from "../widgets/ButtonGroup";
import OrdinationsUtils from "../pages/evening/OrdinationsUtils";

export default class OrdinationReview extends React.Component {
    constructor(props) {
        super(props);
    }

    dish(uuid){
        return findByUuid(this.props.dishes, uuid);
    }

    renderOrders(orders) {
        let phaseOrders = OrdinationsUtils.makePhaseMap(orders);
        let phasesComponents = [];
        let ordersEditor = phaseOrders.forEach((orders, phase) => {
            let separator = "";
            let ordersRenderer = OrdinationsUtils.implode(orders)
                .sort((o1, o2) => this.dish(o1.order.dish).name.localeCompare(this.dish(o2.order.dish).name))
                .map(o => {
                    let result = <span className="bg-danger">{separator}{o.quantity}
                        X {this.dish(o.order.dish).name}</span>;
                    separator = ", ";
                    return result;
                });
            phasesComponents.push(<div className="row">
                <div className="col-sm-12">
                    <p><b>{findByUuid(this.props.phases, phase).name}</b></p>
                    {ordersRenderer}
                </div>
            </div>);
        });
        return <div className="col-sm-12">
            {phasesComponents}
        </div>;
    }

    render() {
        return <div className="row">
            {this.renderOrders(this.props.orders)}
        </div>;
    }

    printOrdination(ordination) {
        ordinationsEditorActions.printOrdination(ordination.uuid);
    }

}