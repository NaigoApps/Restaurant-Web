import React from 'react';
import EntityEditor from "../../components/editors/EntityEditor";
import Column from "../../widgets/Column";
import Row from "../../widgets/Row";
import TextEditor from "../../components/widgets/inputs/TextEditor";
import tablesCreatorActions from "../tables/TablesCreatorActions";

export default class TableCreator extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let props = this.props.data;
        let table = props.get('table');
        let name = table.get('name') || "Nuovo tavolo";

        return <Row topSpaced>
            <Column>
                <EntityEditor
                    entity={table}
                    valid={table.get('name')}
                    confirmMethod={tablesCreatorActions.createTable}
                    render={() => name}>
                    <TextEditor
                        label="Nome"
                        value={table.get('name')}
                        commitAction={tablesCreatorActions.updateTableName}
                    />
                </EntityEditor>
            </Column>
        </Row>;
    }

}