import React from 'react';
import {findByUuid, iGet, uuid} from "../../../../utils/Utils";
import OrdinationsUtils from "../../OrdinationsUtils";
import Scrollable from "../../../../components/widgets/Scrollable";
import Column from "../../../../widgets/Column";
import Row from "../../../../widgets/Row";
import FormattedParagraph from "../../../../widgets/FormattedParagraph";

export default class OrdinationReview extends React.Component {
    constructor(props) {
        super(props);
    }

    renderOrder(group) {
        let dishes = this.props.data.get('dishes');
        let additions = this.props.data.get('additions');
        let result = OrdinationsUtils.renderImplodedOrder(group, dishes, additions);

        return <Row key={group.get('groupId')}>
            <Column>
                <FormattedParagraph leftText={result} rightText={OrdinationsUtils.formatPrice(group.get('price'))}/>
            </Column>
        </Row>
    }

    renderOrders(orders) {
        let phaseOrders = OrdinationsUtils.makePhaseMap(orders, this.props.data.get('phases'));
        let phasesComponents = [];
        let ordersEditor = phaseOrders.forEach((orders, phase) => {
            orders = OrdinationsUtils.implode(orders);
            orders = OrdinationsUtils.sortByDish(orders, this.props.data.get('dishes'), this.props.data.get('additions'));
            phasesComponents.push(<div key={phase}>
                <p><b>{findByUuid(this.props.data.get('phases'), phase).get('name')}</b></p>
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
        let data = this.props.data;
        let ordination = iGet(data, "ordinationEditing.ordination");
        let orders = ordination.get("orders");
        return <Row grow>
            {this.renderOrders(orders)}
        </Row>;
    }

}