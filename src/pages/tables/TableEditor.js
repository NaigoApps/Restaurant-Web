import React from 'react';
import EntityEditor from "../../components/editors/EntityEditor";
import Column from "../../widgets/Column";
import Row from "../../widgets/Row";
import TextEditor from "../../components/widgets/inputs/TextEditor";
import {TablesPageActions} from "./TablesPageActions";

export default class TableEditor extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const data = this.props;
        const editor = data.editor;

        const components = TableEditor.buildComponents(data);

        return <Row key="editor" topSpaced grow>
            <Column>
                <Row>
                    <Column>
                        <h3 className="text-center">Modifica tavolo</h3>
                    </Column>
                </Row>
                <Row grow>
                    <Column>
                        <EntityEditor
                            valid={!!editor.table.name}
                            entity={editor.table}
                            deleteMessage="Eliminazione tavolo"
                            deleteMethod={(uuid) => TablesPageActions.deleteTable(uuid)}>
                            <Row grow>
                                {components}
                            </Row>
                        </EntityEditor>
                    </Column>
                </Row>
            </Column>
        </Row>;
    }

    static buildComponents(data) {
        let components = [];
        components.push(TableEditor.buildNameEditor(data));
        return components.map((component, index) => <Column key={index}>{component}</Column>);
    }

    static buildNameEditor(data) {
        return <TextEditor
            options={{
                label: "Nome",
                value: data.editor.table.name,
                callback: result => TablesPageActions.updateTableName(data.editor.table.uuid, result)
            }}
        />;
    }

}