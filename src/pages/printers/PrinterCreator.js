import React from 'react';
import IntegerEditor from "../../components/widgets/inputs/IntegerEditor";
import SelectEditor from "../../components/widgets/inputs/SelectEditor";
import EntityEditor from "../../components/editors/EntityEditor";
import Column from "../../widgets/Column";
import Row from "../../widgets/Row";
import {PrintersPageActions} from "./PrintersPageActions";

export default class PrinterCreator extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const data = this.props;
        const editor = data.editor;

        const components = PrinterCreator.buildComponents(data);

        return <Row key="creator" topSpaced grow>
            <Column>
                <Row>
                    <Column>
                        <h3 className="text-center">Creazione stampante</h3>
                    </Column>
                </Row>
                <Row grow>
                    <Column>
                        <EntityEditor
                            valid={!!editor.printer.name}
                            entity={editor.printer}
                            confirmMethod={(printer) => PrintersPageActions.createPrinter(printer)}
                            abortMethod={() => PrintersPageActions.selectPrinter(null)}>
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
        actions.push(PrinterCreator.buildNameEditor(data));
        actions.push(PrinterCreator.buildLineCharactersEditor(data));
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
            values: data.data.services,
            value: data.editor.printer.name,
            isValid: name => !!name,
            callback: name => PrintersPageActions.setEditorName(name)
        }}/>;
    }

    static buildLineCharactersEditor(data) {
        return <IntegerEditor
            options={{
                label: "Lunghezza riga",
                value: data.editor.printer.lineCharacters,
                min: 1,
                callback: result => PrintersPageActions.setEditorLCs(result)
            }}
        />;
    }

}