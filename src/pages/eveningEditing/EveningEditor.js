import React from 'react';
import Row from "../../widgets/Row";
import Column from "../../widgets/Column";
import DiningTablesUtils from "./tables/DiningTablesUtils";
import {iGet} from "../../utils/Utils";
import {EditorStatus} from "../StoresUtils";
import DiningTableEditor from "./diningTableEditing/DiningTableEditor";
import SelectInput from "../../components/widgets/inputs/SelectInput";
import {DiningTablesEditorActions} from "./diningTableEditing/DiningTablesEditorActions";
import {EveningEditorActions} from "./EveningEditorActions";
import {DiningTablesCreatorActions} from "./diningTableEditing/DiningTablesCreatorActions";
import DiningTableCreator from "./diningTableEditing/DiningTableCreator";
import {beautifyDate} from "../../components/widgets/inputs/DateInput";
import RoundButton from "../../widgets/RoundButton";
import {ApplicationActions} from "../../actions/ApplicationActions";
import OrdinationsUtils from "./OrdinationsUtils";
import Button from "../../widgets/Button";
import {OrdersActions} from "./diningTableEditing/ordinationsEditing/ordersEditing/OrdersActions";
import FloatEditor from "../../components/widgets/inputs/float/FloatEditor";

export default class EveningEditor extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {

        let props = this.props.data;
        let evening = props.get('evening');

        let editorContent = <span/>;

        let editorStatus = iGet(props, "diningTableEditing.status");

        if (editorStatus === EditorStatus.EDITING) {
            editorContent = <DiningTableEditor data={props}/>;
        } else if (editorStatus === EditorStatus.CREATING) {
            editorContent = <DiningTableCreator data={props}/>;
        } else {
            editorContent = [
                <Row key="date">
                    <Column>
                        <h3 className="text-center">Serata {beautifyDate(evening.get('day'))}</h3>
                    </Column>
                </Row>,
                <Row key="cc">
                    <Column auto>
                        <FloatEditor
                            options={{
                                label: "Coperto",
                                value: evening.get('coverCharge'),
                                callback: result => EveningEditorActions.confirmCoverCharge(evening.get('uuid'), result),
                                min: 0,
                            }}
                            currency
                        />
                    </Column>
                </Row>,
                <Row key="tablesListTitle" topSpaced>
                    <Column>
                        <h5 className="text-center">Elenco tavoli</h5>
                    </Column>
                </Row>,
                <Row key="tablesList" ofList grow>
                    <Column>
                        <SelectInput
                            id={table => table.get('uuid')}
                            rows={5}
                            cols={4}
                            page={iGet(props, 'diningTableEditing.page')}
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
                    <Column align="center">
                        <RoundButton
                            text="Nuovo tavolo"
                            icon="plus"
                            type="success"
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