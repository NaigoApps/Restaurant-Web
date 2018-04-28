import React from 'react';
import IntegerEditor from "../../components/widgets/inputs/IntegerEditor";
import printersEditorActions from "./PrintersEditorActions";
import SelectEditor from "../../components/widgets/inputs/SelectEditor";
import BooleanEditor from "../../components/widgets/inputs/boolean/BooleanEditor";
import EntityEditor from "../../components/editors/EntityEditor";
import Column from "../../widgets/Column";
import Row from "../../widgets/Row";
import {iGet} from "../../utils/Utils";

export default class PrinterEditor extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let editorData = this.props.data;
        let actionsProvider = this.props.actionsProvider;
        let printer = this.props.data.get('printer');

        let components = PrinterEditor.buildComponents(editorData, actionsProvider, printer);

        return <Row key="editor" topSpaced>
            <Column>
                <EntityEditor
                    valid={!!iGet(editorData, "editor.name.value")}
                    entity={printer}
                    confirmMethod={actionsProvider.onConfirm}
                    abortMethod={actionsProvider.onAbort}
                    deleteMethod={actionsProvider.onDelete}
                    render={p => p.get('name')}>
                    {components}
                </EntityEditor>
            </Column>
        </Row>;
    }

    static buildComponents(editorData, actionsProvider, printer) {
        let components = [];
        if (actionsProvider.onConfirmNameEditing && actionsProvider.onAbortNameEditing) {
            components.push(PrinterEditor.buildNameEditor(editorData, actionsProvider, printer));
        }
        if (actionsProvider.onConfirmMainEditing) {
            components.push(PrinterEditor.buildMainEditor(editorData, actionsProvider, printer));
        }
        if (actionsProvider.onConfirmLineCharactersEditing && actionsProvider.onAbortLineCharactersEditing) {
            components.push(PrinterEditor.buildLineCharactersEditor(editorData, actionsProvider, printer));
        }
        return components;
    }

    static buildNameEditor(editorData, actionsProvider, printer) {
        return <SelectEditor
            label="Nome"
            key="name"
            page={iGet(editorData, "editor.name.page")}
            visible={iGet(editorData, "editor.name.visible")}
            options={iGet(editorData, "services")}
            value={iGet(editorData, "editor.name.value")}
            isValid={!!iGet(editorData, "editor.name.value")}
            onSelect={value => printersEditorActions.onSelectName(value)}
            onDeselect={value => printersEditorActions.onSelectName(null)}
            onSelectPage={index => printersEditorActions.onSelectNamePage(index)}
            onShowModal={() => printersEditorActions.onStartNameEditing()}

            onAbort={actionsProvider.onAbortNameEditing}
            onConfirm={result => actionsProvider.onConfirmNameEditing(iGet(printer, "uuid"), result)}
        />;
    }

    static buildMainEditor(editorData, actionsProvider, printer){
        return <BooleanEditor
            key="main"
            label="Principale"
            value={iGet(editorData, "editor.main.value")}
            onConfirm={result => actionsProvider.onConfirmMainEditing(iGet(printer, "uuid"), result)}
        />;
    }

    static buildLineCharactersEditor(editorData, actionsProvider, printer){
        return <IntegerEditor
            key="lcs"
            options={{
                label: "Lunghezza riga",
                value: printer.get('lineCharacters'),
                min: 1,
                callback: result => actionsProvider.onConfirmLineCharactersEditing(printer.get('uuid'), result)
            }}
        />;
    }

}