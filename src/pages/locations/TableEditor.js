import React from 'react';
import EntityEditor from "../../components/editors/EntityEditor";
import Column from "../../widgets/Column";
import Row from "../../widgets/Row";
import TextEditor from "../../components/widgets/inputs/TextEditor";
import tablesEditorActions from "../tables/TablesEditorActions";

export default class TableEditor extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let props = this.props.data;
        let uuid = props.get('table').get('uuid');


        return <Row topSpaced>
            <Column>
                <EntityEditor
                    entity={props.get('table')}
                    valid={props.get('table').get('name')}
                    deleteMethod={tablesEditorActions.deleteTable}
                    render={table => table.get('name')}>
                    <TextEditor
                        label="Nome"
                        value={props.get('table').get('name')}
                        commitAction={result => tablesEditorActions.updateTableName(uuid, result)}
                    />
                </EntityEditor>
            </Column>
        </Row>;
    }

}