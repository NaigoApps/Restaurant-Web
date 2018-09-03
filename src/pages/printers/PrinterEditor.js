import React from 'react';
import IntegerEditor from "../../components/widgets/inputs/IntegerEditor";
import SelectEditor from "../../components/widgets/inputs/SelectEditor";
import EntityEditor from "../../components/editors/EntityEditor";
import Column from "../../widgets/Column";
import Row from "../../widgets/Row";
import {PrintersPageActions} from "./PrintersPageActions";

export default class PrinterEditor extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const data = this.props.data;
        const editor = data.editor;

        const components = PrinterEditor.buildComponents(data);

        return <Row key="creator" topSpaced grow>
            <Column>
                <Row>
                    <Column>
                        <h3 className="text-center">Modifica stampante</h3>
                    </Column>
                </Row>
                <Row grow>
                    <Column>
                        <EntityEditor
                            valid={!!editor.printer.name}
                            entity={editor.printer}
                            deleteMessage="Eliminazione stampante"
                            deleteMethod={(printer) => PrintersPageActions.deletePrinter(printer)}>
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

    static buildComponents(data) {
        let actions = [];
        actions.push(PrinterEditor.buildNameEditor(data));
        actions.push(PrinterEditor.buildLineCharactersEditor(data));
        return actions.map((action, index) => {
            return <Row key={index} ofList={index > 0}>
                <Column>
                    {action}
                </Column>
            </Row>
        });
    }

    static buildNameEditor(data) {
        return <SelectEditor options={{
            label: "Nome",
            values: data.services,
            value: data.editor.printer.name,
            isValid: name => !!name,
            callback: name => PrintersPageActions.setPrinterName(data.editor.printer.uuid, name)
        }}/>;
    }

    static buildLineCharactersEditor(data) {
        return <IntegerEditor
            options={{
                label: "Lunghezza riga",
                value: data.editor.printer.lineCharacters,
                min: 1,
                callback: lcs => PrintersPageActions.setPrinterLineCharacters(data.editor.printer.uuid, lcs)
            }}
        />;
    }

}