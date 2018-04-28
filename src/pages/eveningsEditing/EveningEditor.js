import React from 'react';
import Button from "../../widgets/Button";
import Row from "../../widgets/Row";
import Column from "../../widgets/Column";
import DiningTablesUtils from "./tables/DiningTablesUtils";
import {iGet} from "../../utils/Utils";
import {EditorStatus} from "../StoresUtils";
import DiningTableEditor from "./diningTablesEditing/DiningTableEditor";
import SelectInput from "../../components/widgets/inputs/SelectInput";
import DiningTableDataEditor from "./diningTablesEditing/DiningTableDataEditor";
import {
    DiningTablesEditorActions,
    DiningTablesEditorActionTypes
} from "./diningTablesEditing/DiningTablesEditorActions";
import {EveningEditorActions} from "./EveningEditorActions";
import {DiningTablesCreatorActions} from "./diningTablesEditing/DiningTablesCreatorActions";

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
            editorContent = <DiningTableDataEditor data={props} actionsProvider={DiningTablesCreatorActions}/>;
        } else {
            editorContent = [
                <Row key="tablesList" grow>
                    <Column>
                        <SelectInput
                            id={table => table.get('uuid')}
                            rows={8}
                            cols={3}
                            page={iGet(props, 'diningTablesEditing.page')}
                            options={iGet(props, "evening.diningTables")}
                            renderer={table => this.renderDiningTable(table)}
                            colorRenderer={table => this.renderDiningTableColor(table)}
                            onSelect={table => DiningTablesEditorActions.select(table)}
                            onDeselect={() => DiningTablesEditorActions.deselect()}
                            onSelectPage={page => DiningTablesEditorActions.selectPage(page)}
                        />
                    </Column>
                </Row>,
                <Row key="newTable" topSpaced>
                    <Column centered={true}>
                        <Button
                            text="Nuovo tavolo"
                            type="info"
                            commitAction={() => DiningTablesCreatorActions.beginDiningTable()}
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