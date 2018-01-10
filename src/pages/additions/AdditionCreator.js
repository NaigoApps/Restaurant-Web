import React from 'react';
import EntityEditor from "../../components/editors/EntityEditor";
import Column from "../../widgets/Column";
import Row from "../../widgets/Row";
import additionsCreatorActions from "./AdditionsCreatorActions";
import TextEditor from "../../components/widgets/inputs/TextEditor";
import BooleanEditor from "../../components/widgets/inputs/BooleanEditor";
import FloatEditor from "../../components/widgets/inputs/FloatEditor";

export default class AdditionCreator extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let props = this.props.data;
        let name = props.addition.name || "Nuova variante";

        return <Row topSpaced>
            <Column>
                <EntityEditor
                    entity={props.addition}
                    confirmMethod={additionsCreatorActions.createAddition}
                    render={() => name}>
                    <TextEditor
                        label="Nome"
                        value={props.addition.name}
                        commitAction={additionsCreatorActions.updateAdditionName}
                    />
                    <BooleanEditor
                        label="Principale"
                        value={props.addition.generic}
                        commitAction={additionsCreatorActions.updateAdditionGeneric}
                    />
                    <FloatEditor
                        label="Prezzo aggiuntivo"
                        value={props.addition.price}
                        commitAction={additionsCreatorActions.updateAdditionPrice}
                    />
                </EntityEditor>
            </Column>
        </Row>;
    }

}