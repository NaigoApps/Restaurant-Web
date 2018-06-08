import React from 'react';
import {findByUuid, uuid} from "../../../../utils/Utils";
import OrdinationsUtils from "../../OrdinationsUtils";
import Scrollable from "../../../../components/widgets/Scrollable";
import Column from "../../../../widgets/Column";
import Row from "../../../../widgets/Row";
import FormattedParagraph from "../../../../widgets/FormattedParagraph";

export default class OrdinationOrdersReview extends React.Component {
    constructor(props) {
        super(props);
    }

    renderOrder(group) {
        let dishes = this.props.data.get('dishes');
        let additions = this.props.data.get('additions');
        let result = OrdinationsUtils.renderImplodedOrder(group, dishes, additions);

        return <Row key={"order-" + uuid()}>
            <Column>
                <FormattedParagraph leftText={result} rightText={OrdinationsUtils.formatPrice(group.get('price'))}/>
            </Column>
        </Row>
    }

    render() {
        let data = this.props.data;
        let orders = this.props.orders;

        let phaseOrders = OrdinationsUtils.makePhaseMap(orders, data.get('phases'));
        let phasesComponents = [];
        phaseOrders.forEach((orders, phase) => {
            orders = OrdinationsUtils.implode(orders);
            orders = OrdinationsUtils.sortByDish(orders, data.get('dishes'), data.get('additions'));
            phasesComponents.push(<Row key={"phase_" + phase}>
                <Column><b>{findByUuid(data.get('phases'), phase).get('name')}</b></Column>
            </Row>);

            let ordersRenderer = orders.map(o => this.renderOrder(o));

            ordersRenderer.forEach(component => {
                phasesComponents.push(component);
            });
        });

        return <Row grow>
            <Column>
                <Scrollable>
                    <Column>
                        {phasesComponents}
                    </Column>
                </Scrollable>
            </Column>
        </Row>;
    }

}