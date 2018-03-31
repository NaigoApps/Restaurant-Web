import React from 'react';
import EntityEditor from "../../components/editors/EntityEditor";
import Column from "../../widgets/Column";
import Row from "../../widgets/Row";
import additionsCreatorActions from "./AdditionsCreatorActions";
import TextEditor from "../../components/widgets/inputs/TextEditor";
import BooleanEditor from "../../components/widgets/inputs/boolean/BooleanInput";
import FloatEditor from "../../components/widgets/inputs/float/FloatEditor";

export default class AdditionCreator extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let props = this.props.data;
        let addition = props.get('addition');
        let name = addition.get('name') || "Nuova variante";

        return <Row topSpaced>
            <Column>
                <EntityEditor
                    entity={addition}
                    valid={addition.get('name')}
                    confirmMethod={additionsCreatorActions.createAddition}
                    render={() => name}>
                    <TextEditor
                        label="Nome"
                        value={addition.get('name')}
                        commitAction={additionsCreatorActions.updateAdditionName}
                    />
                    <BooleanEditor
                        label="Generica"
                        value={addition.get('generic')}
                        commitAction={additionsCreatorActions.updateAdditionGeneric}
                    />
                    <FloatEditor
                        label="Prezzo aggiuntivo"
                        value={addition.get('price')}
                        commitAction={additionsCreatorActions.updateAdditionPrice}
                    />
                </EntityEditor>
            </Column>
        </Row>;
    }

}