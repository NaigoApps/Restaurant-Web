import React, {Component} from 'react';
import Row from "../../widgets/Row";
import Button from "../../widgets/Button";
import Column from "../../widgets/Column";
import additionsEditorActions from "./AdditionsEditorActions";
import additionsCreatorActions from "./AdditionsCreatorActions";
import PaginatedList from "../../components/widgets/PaginatedList";

export default class AdditionsNavigator extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        const props = this.props.data;

        return [<Row key="list" topSpaced>
            <Column>
                <PaginatedList
                    id={addition => addition.get('uuid')}
                    rows={9}
                    cols={3}
                    entities={props.get('additions')}
                    renderer={addition => addition.get('name')}
                    selectMethod={additionsEditorActions.selectAddition}
                    deselectMethod={additionsEditorActions.deselectAddition}
                />
            </Column>
        </Row>,
            <Row key="new" topSpaced>
                <Column>
                    <Button
                        text="Nuova variante"
                        type="info"
                        commitAction={additionsCreatorActions.beginAdditionCreation}
                    />
                </Column>
            </Row>];
    }

}