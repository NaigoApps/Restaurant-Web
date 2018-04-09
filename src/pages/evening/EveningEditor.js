import React from 'react';
import diningTablesEditorActions from "./tables/DiningTablesEditorActions";
import Button from "../../widgets/Button";
import diningTablesCreatorActions from "./diningTablesEditing/DiningTablesCreatorActions";
import Row from "../../widgets/Row";
import Column from "../../widgets/Column";
import DiningTablesUtils from "./tables/DiningTablesUtils";
import {iGet} from "../../utils/Utils";
import {EditorStatus} from "../StoresUtils";
import DiningTableEditor from "./diningTablesEditing/DiningTableEditor";
import SelectInput from "../../components/widgets/inputs/SelectInput";
import DiningTableDataEditor from "./diningTablesEditing/DiningTableDataEditor";

export default class EveningEditor extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {

        let props = this.props.data;

        let editorContent = <span/>;

        let editorStatus = iGet(props, "diningTablesEditing.status");

        if (editorStatus === EditorStatus.EDITING) {
            editorContent = <DiningTableEditor data={props}/>;
        } else if (editorStatus === EditorStatus.CREATING) {
            editorContent = <DiningTableDataEditor data={props} actionsProvider={diningTablesCreatorActions}/>;
        } else {
            editorContent = [
                <Row key="tablesList" grow>
                    <SelectInput
                        id={table => table.get('uuid')}
                        rows={8}
                        cols={3}
                        page={iGet(props, 'diningTablesEditing.page')}
                        options={iGet(props, "evening.diningTables")}
                        renderer={table => this.renderDiningTable(table)}
                        colorRenderer={table => this.renderDiningTableColor(table)}
                        onSelect={table => diningTablesEditorActions.beginDiningTableEditing(table)}
                        onDeselect={diningTablesEditorActions.abortDiningTableEditing}
                        onSelectPage={page => diningTablesEditorActions.onSelectPage(page)}
                    />
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

    renderDiningTableColor(dt) {
        if (dt.get('status') === "APERTO") {
            return "danger";
        }
        if (dt.get('status') === "IN CHIUSURA") {
            return "warning";
        }
        return "secondary";
    }
}