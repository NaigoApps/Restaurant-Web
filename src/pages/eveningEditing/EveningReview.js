import React from 'react';
import Row from "../../widgets/Row";
import Column from "../../widgets/Column";
import EveningEditorActions from "./EveningEditorActions";
import {formatDate} from "../../components/widgets/inputs/DateInput";
import RoundButton from "../../widgets/RoundButton";
import FloatEditor from "../../components/widgets/inputs/float/FloatEditor";
import Button from "../../widgets/Button";
import DiningTablesEditorActions from "./diningTableEditing/DiningTablesEditorActions";

export default class EveningReview extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {

        let props = this.props;
        let evening = props.data.evening;

        return (<Row topSpaced grow>
            <Column>
                <Row>
                    <Column>
                        <h3 className="text-center">Serata {formatDate(evening.day)}</h3>
                    </Column>
                </Row>
                <Row topSpaced grow>
                    <Column>
                        <Row>
                            <Column>
                                <h5 className="text-center">Tavoli totali: {evening.tables.length}</h5>
                            </Column>
                        </Row>
                    </Column>
                </Row>
                <Row grow>
                    <Column align="center">
                        <FloatEditor
                            options={{
                                label: "Coperto",
                                value: evening.coverCharge,
                                callback: result => EveningEditorActions.confirmCoverCharge(evening.uuid, result),
                                min: 0,
                            }}
                            currency
                            round
                            size="xl"
                        />
                    </Column>
                    <Column align="center">
                        <RoundButton
                            text="Vai ai tavoli"
                            icon="search"
                            disabled={evening.tables.length === 0}
                            commitAction={() => EveningEditorActions.showTables()}
                            size="xl"
                        />
                    </Column>
                    <Column align="center">
                        <RoundButton
                            text="Nuovo tavolo"
                            icon="plus"
                            type="success"
                            commitAction={() => DiningTablesEditorActions.beginDiningTableCreation()}
                            size="xl"
                        />
                    </Column>
                    <Column align="center">
                        <RoundButton
                            text="Archivia serata"
                            icon="file-archive-o"
                            type="warning"
                            commitAction={() => {alert("TODO")}}
                            size="xl"
                        />
                    </Column>
                </Row>
            </Column>
        </Row>);

    }
}