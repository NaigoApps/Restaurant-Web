import React from 'react';
import Column from "../../../../../widgets/Column";
import Row from "../../../../../widgets/Row";
import OrderGroupReviewComponent from "./OrderGroupReviewComponent";
import {EntitiesUtils} from "../../../../../utils/EntitiesUtils";

export default class PhaseGroupReviewComponent extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {

        const groups = this.props.groups.slice();
        groups.sort((g1, g2) => EntitiesUtils.nameComparator(g1.dish, g2.dish));

        return [
            <Row key={this.props.phase.name}>
                <Column>
                    <h5><u>{this.props.phase.name}</u></h5>
                </Column>
            </Row>,
            <Row key="content">
                <Column>
                    {groups.map(group => <OrderGroupReviewComponent
                        key={group.groupId}
                        group={group}
                        selected={this.isGroupSelected(group, this.props.selectedGroup)}
                    />)
                    }
                </Column>
            </Row>
        ];
    }

    isGroupSelected(group, orders){
        return orders && group.orders.every(order => orders.includes(order)) &&
            orders.every(order => group.orders.includes(order));
    }

}