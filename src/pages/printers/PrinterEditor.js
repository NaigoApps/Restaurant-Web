import React from 'react';
import IntegerEditor from "../../components/widgets/inputs/IntegerEditor";
import printersEditorActions from "./PrintersEditorActions";
import SelectEditor from "../../components/widgets/inputs/SelectEditor";
import BooleanEditor from "../../components/widgets/inputs/BooleanEditor";
import EntityEditor from "../../components/editors/EntityEditor";
import Column from "../../widgets/Column";
import Row from "../../widgets/Row";

export default class PrinterEditor extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let props = this.props.data;
        let uuid = props.printer.uuid;

        return <Row key="editor" topSpaced>
            <Column>
                <EntityEditor
                    entity={props.printer}
                    abortMethod={printersEditorActions.deletePrinter}
                    render={printer => printer.name}>
                    <SelectEditor
                        label="Nome"
                        options={props.services}
                        value={props.printer.name}
                        commitAction={result => printersEditorActions.updatePrinterName(uuid, result)}
                    />
                    <BooleanEditor
                        label="Principale"
                        value={props.printer.main}
                        commitAction={result => printersEditorActions.updatePrinterMain(uuid, result)}
                    />
                    <IntegerEditor
                        label="Lunghezza riga"
                        value={props.printer.lineCharacters}
                        commitAction={result => printersEditorActions.updatePrinterLineCharacters(uuid, result)}
                    />
                </EntityEditor>
            </Column>
        </Row>
            ;
    }

}