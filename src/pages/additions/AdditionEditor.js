import React from 'react';
import EntityEditor from "../../components/editors/EntityEditor";
import Column from "../../widgets/Column";
import Row from "../../widgets/Row";
import EditorMode from "../../utils/EditorMode";
import {iGet} from "../../utils/Utils";
import TextEditor from "../../components/widgets/inputs/TextEditor";
import BooleanEditor from "../../components/widgets/inputs/boolean/BooleanEditor";
import FloatEditor from "../../components/widgets/inputs/float/FloatEditor";

export default class AdditionEditor extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const props = this.props.data;
        const actionsProvider = this.props.actionsProvider;

        const addition = props.get('addition');
        const editorStatus = props.get('editorStatus');

        const actions = AdditionEditor.buildActions(props, actionsProvider);

        return <Row topSpaced grow>
            <Column>
                <Row>
                    <Column>
                        <h3 className="text-center">{editorStatus === EditorMode.CREATING ?
                            "Creazione variante" : "Modifica variante"}</h3>
                    </Column>
                </Row>
                <Row grow>
                    <Column>
                        <EntityEditor
                            valid={!!addition.get('name')}
                            entity={addition}
                            confirmMethod={actionsProvider.onConfirm}
                            abortMethod={actionsProvider.onAbort}
                            deleteMessage="Eliminazione variante"
                            deleteMethod={actionsProvider.onDelete}>
                            {actions}
                        </EntityEditor>
                    </Column>
                </Row>
            </Column>
        </Row>;
    }

    static buildActions(data, actionsProvider) {
        let actions = [];
        if (actionsProvider.confirmName) {
            actions.push(AdditionEditor.buildNameEditor(data, actionsProvider));
        }
        if (actionsProvider.confirmGeneric) {
            actions.push(AdditionEditor.buildGenericEditor(data, actionsProvider));
        }
        if (actionsProvider.confirmPrice) {
            actions.push(AdditionEditor.buildPriceEditor(data, actionsProvider));
        }

        return actions.map((action, index) => {
            return <Row key={index} ofList={index > 0}>
                <Column>
                    {action}
                </Column>
            </Row>
        })
    }

    static buildNameEditor(data, actionsProvider) {
        return <TextEditor options={{
            label: "Nome",
            value: iGet(data, 'addition.name'),
            callback: result => actionsProvider.confirmName(iGet(data, 'addition.uuid'), result)
        }}/>;
    }

    static buildGenericEditor(data, actionsProvider) {
        return <BooleanEditor
            label="Generica"
            value={iGet(data, 'addition.generic')}
            onConfirm={result => actionsProvider.confirmGeneric(iGet(data, "addition.uuid"), result)}
        />;
    }

    static buildPriceEditor(data, actionsProvider) {
        return <FloatEditor
            options={{
                label: "Prezzo",
                value: iGet(data, 'addition.price'),
                min: 0,
                callback: result => actionsProvider.confirmPrice(iGet(data, 'addition.uuid'), result)
            }}
        />;
    }
}