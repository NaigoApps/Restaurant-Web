import React, {Component} from 'react';
import Row from "../../widgets/Row";
import Button from "../../widgets/Button";
import Column from "../../widgets/Column";
import tablesEditorActions from "../tables/TablesEditorActions";
import tablesCreatorActions from "../tables/TablesCreatorActions";
import PaginatedList from "../../components/widgets/PaginatedList";

export default class TablesNavigator extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        const props = this.props.data;

        return [<Row key="list" topSpaced>
            <Column>
                <PaginatedList
                    id={table => table.get('uuid')}
                    rows={9}
                    cols={4}
                    entities={props.get('tables')}
                    renderer={table => table.get('name')}
                    selectMethod={tablesEditorActions.selectTable}
                    deselectMethod={tablesEditorActions.deselectTable}
                />
            </Column>
        </Row>,
            <Row key="new" topSpaced>
                <Column>
                    <Button
                            text="Nuovo tavolo"
                            type="info"
                            commitAction={tablesCreatorActions.beginTableCreation}
                    />
                </Column>
            </Row>];
    }

}