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
        let uuid = props.table.uuid;


        return <Row topSpaced>
            <Column>
                <EntityEditor
                    entity={props.table}
                    abortMethod={tablesEditorActions.deleteTable}
                    render={table => table.name}>
                    <TextEditor
                        label="Nome"
                        value={props.table.name}
                        commitAction={result => tablesEditorActions.updateTableName(uuid, result)}
                    />
                </EntityEditor>
            </Column>
        </Row>;
    }

}