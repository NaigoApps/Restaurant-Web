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
        let dishes = this.props.get('dishes');
        let additions = this.props.get('additions');
        let result = OrdinationsUtils.renderImplodedOrder(group, dishes, additions);

        return <Row key={uuid() + group.get('groupId')}>
            <Column>
                <FormattedParagraph leftText={result} rightText={OrdinationsUtils.formatGroupPrice(group)}/>
            </Column>
        </Row>
    }

    renderOrders(orders) {
        let phaseOrders = OrdinationsUtils.makePhaseMap(orders, this.props.get('phases'));
        let phasesComponents = [];
        phaseOrders.forEach((orders, phase) => {
            orders = OrdinationsUtils.implode(orders);
            orders = OrdinationsUtils.sortByDish(orders, this.props.get('dishes'), this.props.get('additions'));
            phasesComponents.push(<Row key={"phase_" + phase}>
                <Column>
                    <b>{findByUuid(this.props.get('phases'), phase).get('name')}</b>
                </Column>
            </Row>);

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
        let data = this.props;
        let ordination = iGet(data, "ordinationEditing.ordination");
        let orders = ordination.get("orders");
        return <Row grow>
            <Column>
                <Row>
                    <Column>
                        <h5>Riepilogo {OrdinationsUtils.renderOrdination(ordination)}</h5>
                    </Column>
                </Row>
                <Row grow>
                    {this.renderOrders(orders)}
                </Row>
            </Column>
        </Row>;
    }

}