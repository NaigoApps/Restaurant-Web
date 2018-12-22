import React from 'react';
import OrdinationsUtils from "../../../OrdinationsUtils";
import Column from "../../../../../widgets/Column";
import Row from "../../../../../widgets/Row";
import Scrollable from "../../../../../components/widgets/Scrollable";
import PhaseGroupReviewComponent from "./PhaseGroupReviewComponent";
import Button from "../../../../../widgets/Button";
import OrdinationsEditorActions from "../OrdinationsEditorActions";
import OrdinationActionsComponent from "../OrdinationActionsComponent";

export default class OrdinationReviewComponent extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let titleComponent;

        let printButton;
        if (this.props.ordination.dirty) {
            printButton = <Column auto>
                <Button
                    commitAction={() => OrdinationsEditorActions.printOrdination(this.props.ordination)}
                    type="warning"
                    icon="print"/>
            </Column>;
        }

        if (this.props.title) {
            titleComponent =
                <Row align="center">
                    <Column auto>
                        <h4><strong>{this.props.title}</strong>
                        </h4>
                    </Column>
                    {printButton}
                    <Column/>
                    <Column auto>
                        <Button icon="gear"
                                commitAction={() => OrdinationsEditorActions.showOptions(this.props.ordination)}/>
                    </Column>
                    <OrdinationActionsComponent
                        ordination={this.props.ordination}
                        visible={this.props.options === this.props.ordination.uuid}/>
                </Row>;
        }

        const ordersContent = this.buildOrdersContent();

        return <Row customCss="bordered" grow bitPadded>
            <Column>
                {titleComponent}
                <Row grow>
                    <Column>
                        {ordersContent}
                    </Column>
                </Row>
            </Column>
        </Row>;
    }

    buildOrdersContent() {
        const ordination = this.props.ordination;
        const phaseGroups = OrdinationsUtils.makePhaseMap(ordination.orders);
        const phaseComponents = [];
        for (const entry of phaseGroups.entries()) {
            const implodedGroups = OrdinationsUtils.implode(entry[1]);
            phaseComponents.push(<Row key={entry[0].uuid} ofList>
                <Column>
                    <PhaseGroupReviewComponent
                        phase={entry[0]}
                        groups={implodedGroups}/>
                </Column>
            </Row>);
        }

        if (this.props.scrollable) {
            return <Scrollable scrollPulse={phaseComponents.length}>
                {phaseComponents}
            </Scrollable>
        } else {
            return phaseComponents;
        }
    }

}