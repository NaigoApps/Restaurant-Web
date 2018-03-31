import React from 'react';
import diningTablesEditorActions from "./tables/DiningTablesEditorActions";
import Button from "../../widgets/Button";
import DiningTableEditor from "./tables/DiningTableEditor";
import diningTablesCreatorActions from "./tables/DiningTablesCreatorActions";
import DiningTableCreator from "./tables/DiningTableCreator";
import Row from "../../widgets/Row";
import Column from "../../widgets/Column";
import eveningEditorActions from "./EveningEditorActions";
import FloatEditor from "../../components/widgets/inputs/float/FloatEditor";
import DiningTablesUtils from "./tables/DiningTablesUtils";
import {NEW_DINING_TABLE_UUID} from "../../utils/EntitiesUtils";
import PaginatedList from "../../components/widgets/PaginatedList";
import {iGet} from "../../utils/Utils";
import {CREATING_MODE, EDITING_MODE} from "../../stores/EntityEditorStore";

export default class EveningEditor extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {

        let props = this.props.data;

        let editorContent = <span/>;

        let diningTableEditorStatus = iGet(props, "diningTableEditor.editorStatus");
        if (diningTableEditorStatus === EDITING_MODE) {
            editorContent = <DiningTableEditor data={props}/>;
        }else if(diningTableEditorStatus === CREATING_MODE){
            editorContent = <DiningTableEditor data={props}/>;
        } else {
            editorContent = [<Row key="coverCharge" topSpaced>
                <Column>
                    <FloatEditor
                    uuid="evening_cc_editor"
                    label="Coperto"
                    visible={iGet(props, "ccEditor.visible")}
                    text={iGet(props, "ccEditor.text")}
                    onShowModal={() => eveningEditorActions.onStartCCEditing()}
                    onChar={char => eveningEditorActions.onCCChar(char)}

                    onConfirm={result => eveningEditorActions.onConfirmCCEditing(iGet(props, "evening.uuid"), result)}
                    onAbort={eveningEditorActions.onAbortCCEditing}/>
                </Column>
            </Row>,
                <Row key="tablesList" grow>
                    <PaginatedList
                        id={table => table.get('uuid')}
                        rows={8}
                        cols={3}
                        entities={props.get('evening').get('diningTables')}
                        renderer={table => this.renderDiningTable(table)}
                        colorRenderer={table => this.renderDiningTableColor(table)}
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

    renderDiningTableColor(dt){
        if(dt.get('status') === "APERTO"){
            return "danger";
        }
        if(dt.get('status') === "IN CHIUSURA"){
            return "warning";
        }
        return "secondary";
    }
}