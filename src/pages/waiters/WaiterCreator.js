import React from 'react';
import EntityEditor from "../../components/editors/EntityEditor";
import Column from "../../widgets/Column";
import Row from "../../widgets/Row";
import TextEditor from "../../components/widgets/inputs/TextEditor";
import SelectEditor from "../../components/widgets/inputs/SelectEditor";
import {WaitersPageActions} from "./WaitersPageActions";

export default class WaiterCreator extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const data = this.props;

        const editor = data.editor;
        const waiter = editor.waiter;

        const actions = WaiterCreator.buildActions(data);

        return <Row topSpaced grow>
            <Column>
                <Row>
                    <Column>
                        <h3 className="text-center">Creazione cameriere</h3>
                    </Column>
                </Row>
                <Row grow>
                    <Column>
                        <EntityEditor
                            entity={waiter}
                            valid={!!waiter.name}
                            confirmMethod={(waiter) => WaitersPageActions.createWaiter(waiter)}
                            abortMethod={() => WaitersPageActions.selectWaiter(null)}>
                            {actions}
                        </EntityEditor>
                    </Column>
                </Row>
            </Column>
        </Row>;

    }

    static buildActions(data) {
        const actions = [];
        actions.push(WaiterCreator.buildNameEditor(data));
        actions.push(WaiterCreator.buildSurnameEditor(data));
        actions.push(WaiterCreator.buildCfEditor(data));
        actions.push(WaiterCreator.buildStatusEditor(data));
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
            callback: result => WaitersPageActions.setEditorName(result)
        }}/>;
    }

    static buildSurnameEditor(data) {
        return <TextEditor options={{
            label: "Cognome",
            value: data.editor.waiter.surname,
            callback: result => WaitersPageActions.setEditorSurname(result)
        }}/>;
    }

    static buildCfEditor(data) {
        return <TextEditor options={{
            label: "Codice fiscale",
            value: data.editor.waiter.cf,
            callback: result => WaitersPageActions.setEditorCf(result)
        }}/>;
    }

    static buildStatusEditor(data) {
        return <SelectEditor options={{
            label: "Stato",
            value: data.editor.waiter.status,
            values: data.data.waiterStatuses,
            isValid: status => !!status,
            callback: result => WaitersPageActions.setEditorStatus(result)
        }}/>;
    }
}