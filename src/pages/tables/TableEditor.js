import React from 'react';
import EntityEditor from "../../components/editors/EntityEditor";
import Column from "../../widgets/Column";
import Row from "../../widgets/Row";
import TextEditor from "../../components/widgets/inputs/TextEditor";
import {EditorStatus} from "../StoresUtils";

export default class TableEditor extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const editorData = this.props.data;
        const actionsProvider = this.props.actionsProvider;

        const table = editorData.get('table');
        const editorStatus = editorData.get('editorStatus');

        const components = TableEditor.buildComponents(editorData, actionsProvider, table);

        return <Row key="editor" topSpaced grow>
            <Column>
                <Row>
                    <Column>
                        <h3 className="text-center">{editorStatus === EditorStatus.CREATING ?
                            "Creazione tavolo" : "Modifica tavolo"}</h3>
                    </Column>
                </Row>
                <Row grow>
                    <Column>
                        <EntityEditor
                            valid={!!table.get('name')}
                            entity={table}
                            confirmMethod={actionsProvider.onConfirm}
                            abortMethod={actionsProvider.onAbort}
                            deleteMessage="Eliminazione tavolo"
                            deleteMethod={actionsProvider.onDelete}>
                            <Row grow>
                                {components}
                            </Row>
                        </EntityEditor>
                    </Column>
                </Row>
            </Column>
        </Row>;
    }

    static buildComponents(editorData, actionsProvider, printer) {
        let components = [];
        if (actionsProvider.confirmName) {
            components.push(TableEditor.buildNameEditor(editorData, actionsProvider, printer));
        }
        return components.map((component, index) => <Column key={index}>{component}</Column>);
    }

    static buildNameEditor(editorData, actionsProvider, table) {
        return <TextEditor
            options={{
                label: "Nome",
                value: table.get('name'),
                callback: result => actionsProvider.confirmName(table.get('uuid'), result)
            }}
        />;
    }

}