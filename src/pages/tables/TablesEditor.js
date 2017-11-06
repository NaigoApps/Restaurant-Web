import React, {Component} from 'react';
import EntitiesEditor from "../../components/editors/EntitiesEditor";
import {TYPES} from "../../components/editors/EntityEditor";
import tablesEditorActions from "./TablesEditorActions";
import tablesActions from "../../generic/TablesActions";
import tablesCreatorActions from "./TablesCreatorActions";

export default class TablesEditor extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <EntitiesEditor descriptor={this.getTablesDescriptor()}/>
        )
    }

    getTablesDescriptor() {
        return {
            name: ["table", "tables"],
            label: ["Tavolo", "Tavoli"],
            renderer: {
                name: t => t.name
            },
            entities: {
                list: this.props.tables,
                selected: this.props.selected,
                created: this.props.created
            },
            components: {
                creator: {
                    actionsProvider: tablesCreatorActions
                },
                editor: {
                    actionsProvider: tablesEditorActions
                }
            },
            crudActionsProvider: tablesActions,
            fields: [
                {type: TYPES.STRING, name: "name", label: "Nome"},
            ]
        };
    }
}