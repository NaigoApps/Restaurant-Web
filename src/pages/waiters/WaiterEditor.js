import React from 'react';
import EntityEditor from "../../components/editors/EntityEditor";
import Column from "../../widgets/Column";
import Row from "../../widgets/Row";
import TextEditor from "../../components/widgets/inputs/TextEditor";
import SelectEditor from "../../components/widgets/inputs/SelectEditor";
import {WaitersPageActions} from "./WaitersPageActions";

export default class WaiterEditor extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const data = this.props;

        const editor = data.editor;
        const waiter = editor.waiter;

        const actions = WaiterEditor.buildActions(data);

        return <Row topSpaced grow>
            <Column>
                <Row>
                    <Column>
                        <h3 className="text-center">Modifica cameriere</h3>
                    </Column>
                </Row>
                <Row grow>
                    <Column>
                        <EntityEditor
                            entity={waiter}
                            valid={!!waiter.name}
                            deleteMessage="Eliminazione cameriere"
                            deleteMethod={(waiter) => WaitersPageActions.deleteWaiter(waiter)}>
                            {actions}
                        </EntityEditor>
                    </Column>
                </Row>
            </Column>
        </Row>;

    }

    static buildActions(data) {
        const actions = [];
        actions.push(WaiterEditor.buildNameEditor(data));
        actions.push(WaiterEditor.buildSurnameEditor(data));
        actions.push(WaiterEditor.buildCfEditor(data));
        actions.push(WaiterEditor.buildStatusEditor(data));
        return actions.map((action, index) => {
            return <Row key={index} ofList={index > 0}>
                <Column>
                    {action}
                </Column>
            </Row>
        });
    }

    static buildNameEditor(data) {
        return <TextEditor options={{
            label: "Nome",
            value: data.editor.waiter.name,
            callback: result => WaitersPageActions.updateWaiterName(data.editor.waiter.uuid, result)
        }}/>;
    }

    static buildSurnameEditor(data) {
        return <TextEditor options={{
            label: "Cognome",
            value: data.editor.waiter.surname,
            callback: result => WaitersPageActions.updateWaiterSurname(data.editor.waiter.uuid, result)
        }}/>;
    }

    static buildCfEditor(data) {
        return <TextEditor options={{
            label: "Codice fiscale",
            value: data.editor.waiter.cf,
            callback: result => WaitersPageActions.updateWaiterCf(data.editor.waiter.uuid, result)
        }}/>;
    }

    static buildStatusEditor(data) {
        return <SelectEditor options={{
            label: "Stato",
            value: data.editor.waiter.status,
            values: data.data.waiterStatuses,
            isValid: status => !!status,
            callback: result => WaitersPageActions.updateWaiterStatus(data.editor.waiter.uuid, result)
        }}/>;
    }
}