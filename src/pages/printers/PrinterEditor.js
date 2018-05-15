import React from 'react';
import IntegerEditor from "../../components/widgets/inputs/IntegerEditor";
import SelectEditor from "../../components/widgets/inputs/SelectEditor";
import BooleanEditor from "../../components/widgets/inputs/boolean/BooleanEditor";
import EntityEditor from "../../components/editors/EntityEditor";
import Column from "../../widgets/Column";
import Row from "../../widgets/Row";
import {iGet} from "../../utils/Utils";
import {EditorStatus} from "../StoresUtils";

export default class PrinterEditor extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const editorData = this.props.data;
        const actionsProvider = this.props.actionsProvider;

        const printer = editorData.get('printer');
        const editorStatus = editorData.get('status');

        const components = PrinterEditor.buildComponents(editorData, actionsProvider, printer);

        return <Row key="editor" topSpaced grow>
            <Column>
                <Row>
                    <Column>
                        <h3 className="text-center">{editorStatus === EditorStatus.CREATING ?
                            "Creazione stampante" : "Modifica stampante"}</h3>
                    </Column>
                </Row>
                <Row grow>
                    <Column>
                        <EntityEditor
                            valid={!!printer.get('name')}
                            entity={printer}
                            confirmMethod={actionsProvider.onConfirm}
                            abortMethod={actionsProvider.onAbort}
                            deleteMessage="Eliminazione stampante"
                            deleteMethod={actionsProvider.onDelete}>
                            <Row align="center">
                                <Column>
                                    {components}
                                </Column>
                            </Row>
                        </EntityEditor>
                    </Column>
                </Row>
            </Column>
        </Row>;
    }

    static buildComponents(editorData, actionsProvider, printer) {
        let actions = [];
        if (actionsProvider.confirmName) {
            actions.push(PrinterEditor.buildNameEditor(editorData, actionsProvider, printer));
        }
        if (actionsProvider.confirmLineCharacters) {
            actions.push(PrinterEditor.buildLineCharactersEditor(editorData, actionsProvider, printer));
        }
        if (actionsProvider.confirmMain) {
            actions.push(PrinterEditor.buildMainEditor(editorData, actionsProvider, printer));
        }
        return actions.map((action, index) => {
            return <Row key={index} ofList={index > 0}>
                <Column>
                    {action}
                </Column>
            </Row>
        });
    }

    static buildNameEditor(editorData, actionsProvider, printer) {
        return <SelectEditor options={{
            label: "Nome",
            values: editorData.get('services'),
            value: iGet(editorData, 'printer.name'),
            isValid: name => !!name,
            callback: name => actionsProvider.confirmName(printer.get('uuid'), name)
        }}/>;
    }

    static buildMainEditor(editorData, actionsProvider, printer) {
        return <BooleanEditor
            label="Principale"
            value={printer.get('main')}
            onConfirm={result => actionsProvider.confirmMain(iGet(printer, "uuid"), result)}
        />;
    }

    static buildLineCharactersEditor(editorData, actionsProvider, printer) {
        return <IntegerEditor
            options={{
                label: "Lunghezza riga",
                value: printer.get('lineCharacters'),
                min: 1,
                callback: result => actionsProvider.confirmLineCharacters(printer.get('uuid'), result)
            }}
        />;
    }

}