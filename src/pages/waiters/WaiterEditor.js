import React from 'react';
import EntityEditor from "../../components/editors/EntityEditor";
import Column from "../../widgets/Column";
import Row from "../../widgets/Row";
import TextEditor from "../../components/widgets/inputs/TextEditor";
import SelectEditor from "../../components/widgets/inputs/SelectEditor";
import {iGet} from "../../utils/Utils";

export default class WaiterEditor extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const data = this.props.data;
        const actionsProvider = this.props.actionsProvider;

        const editorStatus = data.get('editorStatus');
        const waiter = data.get('waiter');
        const uuid = waiter.get('uuid');

        const actions = WaiterEditor.buildActions(data, actionsProvider);

        return <Row topSpaced>
            <Column>
                <EntityEditor
                    entity={waiter}
                    valid={!!waiter.get('name')}
                    confirmMethod={actionsProvider.onConfirm}
                    abortMethod={actionsProvider.onAbort}
                    deleteMessage="Eliminazione cameriere"
                    deleteMethod={actionsProvider.onDelete}>
                    {actions}
                </EntityEditor>
            </Column>
        </Row>;

    }

    static buildActions(data, actionsProvider) {
        const actions = [];
        if (actionsProvider.confirmName) {
            actions.push(WaiterEditor.buildNameEditor(data, actionsProvider));
        }
        if (actionsProvider.confirmSurname) {
            actions.push(WaiterEditor.buildSurnameEditor(data, actionsProvider));
        }
        if (actionsProvider.confirmCf) {
            actions.push(WaiterEditor.buildCfEditor(data, actionsProvider));
        }
        if (actionsProvider.confirmStatus) {
            actions.push(WaiterEditor.buildStatusEditor(data, actionsProvider));
        }
        return actions.map((action, index) => {
            return <Row key={index} ofList={index > 0}>
                <Column>
                    {action}
                </Column>
            </Row>
        });
    }

    static buildNameEditor(data, actionsProvider) {
        return <TextEditor options={{
            label: "Nome",
            value: iGet(data, 'waiter.name'),
            callback: result => actionsProvider.confirmName(iGet(data, 'waiter.uuid'), result)
        }}/>;
    }

    static buildSurnameEditor(data, actionsProvider) {
        return <TextEditor options={{
            label: "Cognome",
            value: iGet(data, 'waiter.surname'),
            callback: result => actionsProvider.confirmSurname(iGet(data, 'waiter.uuid'), result)
        }}/>;
    }

    static buildCfEditor(data, actionsProvider) {
        return <TextEditor options={{
            label: "Codice fiscale",
            value: iGet(data, 'waiter.cf'),
            callback: result => actionsProvider.confirmCf(iGet(data, 'waiter.uuid'), result)
        }}/>;
    }

    static buildStatusEditor(data, actionsProvider) {
        return <SelectEditor options={{
            label: "Stato",
            value: iGet(data, 'waiter.status'),
            values: data.get('waiterStatuses'),
            isValid: status => !!status,
            callback: status => actionsProvider.confirmStatus(iGet(data, 'waiter.uuid'), status)
        }}/>;
    }
}