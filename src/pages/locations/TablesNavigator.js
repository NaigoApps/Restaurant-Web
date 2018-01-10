import React, {Component} from 'react';
import PaginatedEntitiesList from "../../components/widgets/PaginatedEntitiesList";
import Row from "../../widgets/Row";
import Button from "../../widgets/Button";
import Column from "../../widgets/Column";
import tablesEditorActions from "../tables/TablesEditorActions";
import tablesCreatorActions from "../tables/TablesCreatorActions";

export default class TablesNavigator extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        const props = this.props.data;

        return [<Row key="list" topSpaced>
            <Column>
                <PaginatedEntitiesList
                    entities={props.tables}
                    renderer={table => table.name}
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