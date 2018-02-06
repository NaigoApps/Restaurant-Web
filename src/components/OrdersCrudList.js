import React from 'react';
import {findByUuid, uuid} from "../utils/Utils";
import OrdinationsUtils from "../pages/evening/OrdinationsUtils";
import Scrollable from "./widgets/Scrollable";
import Column from "../widgets/Column";
import Row from "../widgets/Row";
import FormattedButton from "../widgets/FormattedButton";
import ButtonGroup from "../widgets/ButtonGroup";
import Button from "../widgets/Button";

export default class OrdersCrudList extends React.Component {
    constructor(props) {
        super(props);
    }

    renderOrder(order) {
        let result = OrdinationsUtils.renderImplodedOrder(order, this.props.data.get('dishes'), this.props.data.get('additions'));
        let price = OrdinationsUtils.formatPrice(order.get('price'));

        return <FormattedButton key={order.get('order').get('dish') + uuid()}
                                active={OrdinationsUtils.sameOrder(this.props.selectedOrder, order.get('order'))}
                                leftText={result}
                                rightText={price}
                                size="lg"
                                commitAction={() => this.props.commitAction(order.get('order'))}/>
    }

    renderOrders(orders) {
        let phaseOrders = OrdinationsUtils.makePhaseMap(orders, this.props.data.get('phases'));
        let phasesComponents = [];
        let ordersEditor = phaseOrders.forEach((orders, phaseUuid) => {
            orders = OrdinationsUtils.implode(orders);
            orders = OrdinationsUtils.sortByDish(orders, this.props.data.get('dishes'), this.props.data.get('additions'));

            let phase = findByUuid(this.props.data.get('phases'), phaseUuid);
            phasesComponents.push(
                <Button key={phase.get('uuid')}
                        type="info"
                        text={phase ? phase.get('name') : "?"}
                        disabled/>);

            let ordersComponents = orders.map(o => this.renderOrder(o));

            ordersComponents.forEach(component => {
                phasesComponents.push(component);
            });
        });
        return <Column>
            <Scrollable refreshPulse={this.props.refreshPulse} scrollPulse={this.props.scrollPulse}>
                <ButtonGroup vertical justified>
                    {phasesComponents}
                </ButtonGroup>
            </Scrollable>
        </Column>;
    }

    render() {
        let orders = this.props.data.get('editingOrders');
        if (!orders) {
            orders = this.props.data.get('editingOrdination').get('orders');
        }
        return <Row grow>
            {this.renderOrders(orders)}
        </Row>;
    }

}