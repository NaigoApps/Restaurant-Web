import React from 'react';
import Row from "../../../../../widgets/Row";
import Column from "../../../../../widgets/Column";
import PhaseGroupSelectableComponent from "./PhaseGroupSelectableComponent";
import OrdinationsUtils from "../../../OrdinationsUtils";
import Scrollable from "../../../../../components/widgets/Scrollable";

export default class OrdinationSelectableComponent extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const ordersContent = this.buildOrdersContent();

        return <Row grow bitPadded>
            <Column>
                {ordersContent}
            </Column>
        </Row>;
    }

    buildOrdersContent() {
        const ordination = this.props.ordination;
        let phaseGroups = OrdinationsUtils.makePhaseList(ordination.orders);

        const phaseComponents = phaseGroups.map(pair => {
            const implodedGroups = OrdinationsUtils.implode(pair.orders);
            return <PhaseGroupSelectableComponent
                key={pair.phase.uuid}
                phase={pair.phase}
                groups={implodedGroups}
                selectedGroup={this.props.selectedGroup}/>;
        });

        return <Scrollable>
            {phaseComponents}
        </Scrollable>
    }

}