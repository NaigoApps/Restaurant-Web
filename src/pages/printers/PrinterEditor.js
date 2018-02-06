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
        let printer = props.get('printer');
        let uuid = printer.get('uuid');

        return <Row key="editor" topSpaced>
            <Column>
                <EntityEditor
                    valid={!!props.get('printer').get('name')}
                    entity={printer}
                    deleteMethod={printersEditorActions.deletePrinter}
                    render={p => p.get('name')}>
                    <SelectEditor
                        label="Nome"
                        options={props.get('services')}
                        value={printer ? printer.get('name') : "?"}
                        commitAction={result => printersEditorActions.updatePrinterName(uuid, result)}
                    />
                    <BooleanEditor
                        label="Principale"
                        value={printer.get('main')}
                        commitAction={result => printersEditorActions.updatePrinterMain(uuid, result)}
                    />
                    <IntegerEditor
                        label="Lunghezza riga"
                        value={printer.get('lineCharacters')}
                        commitAction={result => printersEditorActions.updatePrinterLineCharacters(uuid, result)}
                    />
                </EntityEditor>
            </Column>
        </Row>;
    }

}