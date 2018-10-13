import React from 'react';
import EntityEditor from "../../components/editors/EntityEditor";
import Column from "../../widgets/Column";
import Row from "../../widgets/Row";
import {iGet} from "../../utils/Utils";
import TextEditor from "../../components/widgets/inputs/TextEditor";
import BooleanEditor from "../../components/widgets/inputs/boolean/BooleanEditor";
import FloatEditor from "../../components/widgets/inputs/float/FloatEditor";
import AdditionsPageActions from "./AdditionsPageActions";

export default class AdditionEditor extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const data = this.props;

        const addition = data.editor.addition;
        const actions = AdditionEditor.buildActions(addition);

        return <Row topSpaced grow>
            <Column>
                <Row>
                    <Column>
                        <h3 className="text-center">{addition.name}</h3>
                    </Column>
                </Row>
                <Row grow>
                    <Column>
                        <EntityEditor
                            valid={!!addition.name}
                            entity={addition}
                            deleteMessage="Eliminazione variante"
                            deleteMethod={addition => AdditionsPageActions.deleteAddition(addition)}>
                            {actions}
                        </EntityEditor>
                    </Column>
                </Row>
            </Column>
        </Row>;
    }

    static buildActions(addition) {
        let actions = [];
        actions.push(AdditionEditor.buildNameEditor(addition));
        actions.push(AdditionEditor.buildGenericEditor(addition));
        actions.push(AdditionEditor.buildPriceEditor(addition));

        return actions.map((action, index) => {
            return <Row key={index} ofList={index > 0}>
                <Column>
                    {action}
                </Column>
            </Row>
        })
    }

    static buildNameEditor(addition) {
        return <TextEditor options={{
            label: "Nome",
            value: addition.name,
            callback: result => AdditionsPageActions.updateName(addition.uuid, result)
        }}/>;
    }

    static buildGenericEditor(addition) {
        return <BooleanEditor
            label="Generica"
            value={addition.generic}
            onConfirm={result => AdditionsPageActions.updateGeneric(addition.uuid, result)}
        />;
    }

    static buildPriceEditor(addition) {
        return <FloatEditor
            options={{
                label: "Prezzo",
                value: addition.price,
                min: 0,
                callback: result => AdditionsPageActions.updatePrice(addition.uuid, result)
            }}
        />;
    }
}