import React from 'react';
import {iGet, uuid} from "../../../../utils/Utils";
import OrdinationsUtils from "../../OrdinationsUtils";
import Scrollable from "../../../../components/widgets/Scrollable";
import Column from "../../../../widgets/Column";
import Row from "../../../../widgets/Row";
import Button from "../../../../widgets/Button";

export default class OrdinationOrdersCrudList extends React.Component {
    constructor(props) {
        super(props);
    }

    renderGroup(ordersGroup) {
        let data = this.props.data;
        let selectedOrder = iGet(data, "ordersEditing.selectedOrder");
        let result = OrdinationsUtils.renderImplodedOrder(ordersGroup, this.props.data.get('dishes'), this.props.data.get('additions'));
        let price = OrdinationsUtils.formatPrice(ordersGroup.get('price'));

        return <Row key={uuid()} topSpaced>
            <Column>
                <Button
                    active={this.groupIncludes(ordersGroup, selectedOrder)}
                    text={result + " " + price}
                    size="lg"
                    commitAction={() => this.props.commitAction(ordersGroup)}/>
            </Column>
        </Row>
    }

    groupIncludes(grp, orderUuid) {
        return grp.get('orders')
            .map(order => order.get('uuid'))
            .includes(orderUuid);
    }

    render() {
        let data = this.props.data;
        let selectedPhase = iGet(data, "ordersEditing.selectedPhase");
        let orders = this.props.orders;

        let phaseOrders = OrdinationsUtils.makePhaseMap(orders, this.props.data.get('phases'));
        let usedOrders = phaseOrders.get(selectedPhase);
        let rows = [];

        if (usedOrders) {
            usedOrders = OrdinationsUtils.implode(usedOrders);
            usedOrders = OrdinationsUtils.sortByDish(usedOrders, data.get('dishes'), data.get('additions'));
            rows = usedOrders.map(group => this.renderGroup(group));
        }
        return <Row grow>
            <Column>
                <Scrollable refreshPulse={this.props.refreshPulse} scrollPulse={this.props.scrollPulse}>
                    {rows}
                </Scrollable>
            </Column>
        </Row>;
    }

}