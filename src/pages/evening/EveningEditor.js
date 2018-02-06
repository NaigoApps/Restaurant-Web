import React from 'react';
import diningTablesEditorActions from "./tables/DiningTablesEditorActions";
import Button from "../../widgets/Button";
import DiningTableEditor from "./tables/DiningTableEditor";
import PaginatedEntitiesList from "../../components/widgets/PaginatedEntitiesList";
import diningTablesCreatorActions from "./tables/DiningTablesCreatorActions";
import DiningTableCreator from "./tables/DiningTableCreator";
import Row from "../../widgets/Row";
import Column from "../../widgets/Column";
import eveningEditorActions from "./EveningEditorActions";
import FloatEditor from "../../components/widgets/inputs/FloatEditor";
import DiningTablesUtils from "./tables/DiningTablesUtils";
import {NEW_DINING_TABLE_UUID} from "../../utils/EntitiesUtils";

export default class EveningEditor extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {

        let props = this.props.data;

        let editorContent = <span/>;

        if (props.get('editingTable')) {
            if (props.get('editingTable').get('uuid') === NEW_DINING_TABLE_UUID) {
                editorContent = <DiningTableCreator data={props}/>;
            } else {
                editorContent = <DiningTableEditor data={props}/>;
            }
        } else {
            let diningTableRenderer = {
                name: this.renderDiningTable.bind(this)
            };
            editorContent = [<Row key="coverCharge" topSpaced>
                <Column>
                    <FloatEditor
                        label="Coperto"
                        value={props.get('evening').get('coverCharge')}
                        commitAction={eveningEditorActions.updateCoverCharge
                            .bind(eveningEditorActions, props.get('evening').get('uuid'))}/>
                </Column>
            </Row>,
                <Row key="tablesList" grow>
                    <PaginatedEntitiesList
                        rows={9}
                        cols={3}
                        entities={props.get('evening').get('diningTables')}
                        renderer={diningTableRenderer}
                        selectMethod={diningTablesEditorActions.beginDiningTableEditing}
                        deselectMethod={diningTablesEditorActions.abortDiningTableEditing}/>,
                </Row>,
                <Row key="newTable" topSpaced>
                    <Column centered={true}>
                        <Button
                            text="Nuovo tavolo"
                            type="info"
                            commitAction={diningTablesCreatorActions.beginDiningTableCreation}
                        />
                    </Column>
                </Row>];
        }

        return (<Row topSpaced grow>
            <Column>
                {editorContent}
            </Column>
        </Row>);

    }

    renderDiningTable(dt) {
        return DiningTablesUtils.renderDiningTable(dt, this.props.data.get('tables'), this.props.data.get('waiters'));
    }
}