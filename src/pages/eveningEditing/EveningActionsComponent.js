import React from 'react';
import EveningEditorActions from "./EveningEditorActions";
import FloatEditor from "../../components/widgets/inputs/float/FloatEditor";
import Row from "../../widgets/Row";
import Column from "../../widgets/Column";
import {ApplicationContext} from "../Page";

export default class EveningActionsComponent extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return <ApplicationContext.Consumer>
            {value => this.buildContent(value)}
        </ApplicationContext.Consumer>;
    }

    buildContent(general) {
        let coverChargeRow;
        if (general.settings && general.settings.coverCharges) {
            coverChargeRow = this.buildCoverChargeRow();
        }

        return <Row>
            <Column>
                <Row>
                    <Column>
                        <h3>Opzioni serata</h3>
                    </Column>
                </Row>
                {coverChargeRow}
            </Column>
        </Row>;
    }

    buildCoverChargeRow() {
        return <Row>
            <Column>
                <FloatEditor
                    options={{
                        label: "Coperto",
                        value: this.props.evening.coverCharge,
                        callback: result => EveningEditorActions.confirmCoverCharge(this.props.evening.uuid, result),
                        min: 0,
                    }}
                    currency
                />
            </Column>
        </Row>;
    }
}