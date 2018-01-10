import React from 'react';
import {findByUuid, uuid} from "../utils/Utils";
import OrdinationsUtils from "../pages/evening/OrdinationsUtils";
import Scrollable from "./widgets/Scrollable";
import Column from "../widgets/Column";
import Row from "../widgets/Row";
import FormattedButton from "../widgets/FormattedButton";

export default class OrdinationSelectableReview extends React.Component {
    constructor(props) {
        super(props);
    }

    renderOrder(order) {
        let result = OrdinationsUtils.renderImplodedOrder(order, this.props.data.dishes, this.props.data.additions);
        let price = OrdinationsUtils.formatPrice(order.price);

        return <Row key={order.order.dish + uuid()}>
            <Column>
                <FormattedButton
                    active={OrdinationsUtils.sameOrder(this.props.selectedOrder, order.order)}
                    leftText={result}
                    rightText={price}
                    commitAction={() => this.props.commitAction(order.order)}/>
            </Column>
        </Row>
    }

    renderOrders(orders) {
        let phaseOrders = OrdinationsUtils.makePhaseMap(orders);
        let phasesComponents = [];
        let ordersEditor = phaseOrders.forEach((orders, phaseUuid) => {
            orders = OrdinationsUtils.implode(orders);
            orders = OrdinationsUtils.sortByDish(orders, this.props.data.dishes);

            let phase = findByUuid(this.props.data.phases, phaseUuid);
            phasesComponents.push(<div key={phase}>
                <p><b>{phase ? phase.name : "?"}</b></p>
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