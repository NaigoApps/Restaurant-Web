import React from 'react';
import EntityEditor from "../../components/editors/EntityEditor";
import Column from "../../widgets/Column";
import Row from "../../widgets/Row";
import TextEditor from "../../components/widgets/inputs/TextEditor";
import {TablesPageActions} from "./TablesPageActions";

export default class TableCreator extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const data = this.props;
        const editor = data.editor;

        const components = TableCreator.buildComponents(data);

        return <Row key="editor" topSpaced grow>
            <Column>
                <Row>
                    <Column>
                        <h3 className="text-center">Creazione tavolo</h3>
                    </Column>
                </Row>
                <Row grow>
                    <Column>
                        <EntityEditor
                            valid={!!editor.table.name}
                            entity={editor.table}
                            abortMethod={() => TablesPageActions.selectTable(null)}
                            confirmMethod={table => TablesPageActions.createTable(table)}>
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
        components.push(TableCreator.buildNameEditor(data));
        return components.map((component, index) => <Column key={index}>{component}</Column>);
    }

    static buildNameEditor(data) {
        return <TextEditor
            options={{
                label: "Nome",
                value: data.editor.table.name,
                callback: result => TablesPageActions.setEditorName(result)
            }}
        />;
    }

}