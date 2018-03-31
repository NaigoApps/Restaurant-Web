import React from 'react';
import additionsEditorActions from "./AdditionsEditorActions";
import EntityEditor from "../../components/editors/EntityEditor";
import Column from "../../widgets/Column";
import Row from "../../widgets/Row";
import TextEditor from "../../components/widgets/inputs/TextEditor";
import FloatEditor from "../../components/widgets/inputs/float/FloatEditor";
import BooleanEditor from "../../components/widgets/inputs/boolean/BooleanInput";

export default class AdditionEditor extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let props = this.props.data;
        let addition = props.get('addition');
        let uuid = addition.get('uuid');


        return <Row topSpaced>
            <Column>
                <EntityEditor
                    valid={addition.get('name')}
                    entity={addition}
                    deleteMethod={additionsEditorActions.deleteAddition}
                    render={addition => addition.get('name')}>
                    <TextEditor
                        label="Nome"
                        value={addition.get('name')}
                        commitAction={result => additionsEditorActions.updateAdditionName(uuid, result)}
                    />
                    <BooleanEditor
                        label="Generica"
                        value={addition.get('generic')}
                        commitAction={result => additionsEditorActions.updateAdditionGeneric(uuid, result)}
                    />
                    <FloatEditor
                        label="Prezzo"
                        value={addition.get('price')}
                        commitAction={result => additionsEditorActions.updateAdditionPrice(uuid, result)}
                    />
                </EntityEditor>
            </Column>
        </Row>;
    }

}