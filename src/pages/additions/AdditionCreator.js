import React from 'react';
import EntityEditor from "../../components/editors/EntityEditor";
import Column from "../../widgets/Column";
import Row from "../../widgets/Row";
import TextEditor from "../../components/widgets/inputs/TextEditor";
import BooleanEditor from "../../components/widgets/inputs/boolean/BooleanEditor";
import FloatEditor from "../../components/widgets/inputs/float/FloatEditor";
import AdditionsPageActions from "./AdditionsPageActions";

export default class AdditionCreator extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const data = this.props;

        const addition = data.editor.addition;
        const actions = AdditionCreator.buildActions(addition);

        return <Row topSpaced grow>
            <Column>
                <Row>
                    <Column>
                        <h3 className="text-center">Creazione variante</h3>
                    </Column>
                </Row>
                <Row grow>
                    <Column>
                        <EntityEditor
                            valid={!!addition.name}
                            entity={addition}
                            confirmMethod={addition => AdditionsPageActions.createAddition(addition)}
                            abortMethod={() => AdditionsPageActions.selectAddition(null)}>
                            {actions}
                        </EntityEditor>
                    </Column>
                </Row>
            </Column>
        </Row>;
    }

    static buildActions(addition) {
        let actions = [];
        actions.push(AdditionCreator.buildNameEditor(addition));
        actions.push(AdditionCreator.buildGenericEditor(addition));
        actions.push(AdditionCreator.buildPriceEditor(addition));

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
            callback: name => AdditionsPageActions.setEditorName(name)
        }}/>;
    }

    static buildGenericEditor(addition) {
        return <BooleanEditor
            label="Generica"
            value={addition.generic}
            onConfirm={generic => AdditionsPageActions.setEditorGeneric(generic)}
        />;
    }

    static buildPriceEditor(addition) {
        return <FloatEditor
            options={{
                label: "Prezzo",
                value: addition.price,
                min: 0,
                callback: price => AdditionsPageActions.setEditorPrice(price)
            }}
        />;
    }
}