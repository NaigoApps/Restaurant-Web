import React from 'react';
import additionsEditorActions from "./AdditionsEditorActions";
import EntityEditor from "../../components/editors/EntityEditor";
import Column from "../../widgets/Column";
import Row from "../../widgets/Row";
import TextEditor from "../../components/widgets/inputs/TextEditor";
import FloatEditor from "../../components/widgets/inputs/FloatEditor";
import BooleanEditor from "../../components/widgets/inputs/BooleanEditor";

export default class AdditionEditor extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let props = this.props.data;
        let uuid = props.addition.uuid;


        return <Row topSpaced>
            <Column>
                <EntityEditor
                    entity={props.addition}
                    abortMethod={additionsEditorActions.deleteAddition}
                    render={addition => addition.name}>
                    <TextEditor
                        label="Nome"
                        value={props.addition.name}
                        commitAction={result => additionsEditorActions.updateAdditionName(uuid, result)}
                    />
                    <BooleanEditor
                        label="Principale"
                        value={props.addition.generic}
                        commitAction={result => additionsEditorActions.updateAdditionGeneric(uuid, result)}
                    />
                    <FloatEditor
                        label="Prezzo"
                        value={props.addition.price}
                        commitAction={result => additionsEditorActions.updateAdditionPrice(uuid, result)}
                    />
                </EntityEditor>
            </Column>
        </Row>;
    }

}