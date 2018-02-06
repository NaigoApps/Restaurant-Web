import React from 'react';
import IntegerEditor from "../../components/widgets/inputs/IntegerEditor";
import SelectEditor from "../../components/widgets/inputs/SelectEditor";
import BooleanEditor from "../../components/widgets/inputs/BooleanEditor";
import EntityEditor from "../../components/editors/EntityEditor";
import printersCreatorActions from "./PrintersCreatorActions";
import Column from "../../widgets/Column";
import Row from "../../widgets/Row";

export default class PrinterCreator extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let props = this.props.data;
        let name = props.get('printer').get('name') || "Nuova stampante";

        return <Row topSpaced>
            <Column>
                <EntityEditor
                    valid={!!props.get('printer').get('name')}
                    entity={props.get('printer')}
                    confirmMethod={printersCreatorActions.createPrinter}
                    render={() => name}>
                    <SelectEditor
                        label="Nome"
                        options={props.get('services')}
                        value={props.get('printer').get('name')}
                        commitAction={printersCreatorActions.updatePrinterName}
                    />
                    <BooleanEditor
                        label="Principale"
                        value={props.get('printer').get('main')}
                        commitAction={printersCreatorActions.updatePrinterMain}
                    />
                    <IntegerEditor
                        label="Lunghezza riga"
                        value={props.get('printer').get('lineCharacters')}
                        commitAction={printersCreatorActions.updatePrinterLineCharacters}
                    />
                </EntityEditor>
            </Column>
        </Row>;
    }

}