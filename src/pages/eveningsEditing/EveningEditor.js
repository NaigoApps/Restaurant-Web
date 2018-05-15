import React from 'react';
import Row from "../../widgets/Row";
import Column from "../../widgets/Column";
import DiningTablesUtils from "./tables/DiningTablesUtils";
import {iGet} from "../../utils/Utils";
import {EditorStatus} from "../StoresUtils";
import DiningTableEditor from "./diningTablesEditing/DiningTableEditor";
import SelectInput from "../../components/widgets/inputs/SelectInput";
import {DiningTablesEditorActions} from "./diningTablesEditing/DiningTablesEditorActions";
import {EveningEditorActions} from "./EveningEditorActions";
import {DiningTablesCreatorActions} from "./diningTablesEditing/DiningTablesCreatorActions";
import DiningTableCreator from "./diningTablesEditing/DiningTableCreator";
import {beautifyDate} from "../../components/widgets/inputs/DateInput";
import RoundButton from "../../widgets/RoundButton";
import {ApplicationActions} from "../../actions/ApplicationActions";
import OrdinationsUtils from "./OrdinationsUtils";
import Button from "../../widgets/Button";

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
            editorContent = <DiningTableCreator data={props}/>;
        } else {
            editorContent = [
                <Row key="date">
                    <Column>
                        <h3 className="text-center">Serata {beautifyDate(props.get('evening').get('day'))}</h3>
                    </Column>
                </Row>,
                <Row key="cc">
                    <Column auto>
                        <Button
                            type="info"
                            text={"Coperto: " + OrdinationsUtils.formatPrice(props.get('evening').get('coverCharge'))}
                            commitAction={() => ApplicationActions.showFloatInput(props.get('evening').get('coverCharge'),
                                (result) => EveningEditorActions.confirmCoverCharge(iGet(props,'evening.uuid'), result))}
                        />
                    </Column>
                </Row>,
                <Row key="tablesListTitle" topSpaced>
                    <Column>
                        <h5 className="text-center">Elenco tavoli</h5>
                    </Column>
                </Row>,
                <Row key="tablesList" ofList>
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
                <Row key="newTable" topSpaced grow>
                    <Column justify="center" align="center">
                        <RoundButton
                            text="Nuovo tavolo"
                            icon="plus"
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