import React, {Component} from 'react';
import EntitiesEditor from "../../components/editors/EntitiesEditor";
import {ACTIONS, TYPES} from "../../components/editors/EntityEditor";
import tablesEditorActions from "./TablesEditorActions";
import tablesActions from "../../generic/TablesActions";
import categoriesActions from "./CategoriesActions";
import menuPageActions from "./MenuPageActions";

export default class MenuEditor extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <EntitiesEditor descriptor={this.getCategoriesDescriptor()}/>
        )
    }

    getCategoriesDescriptor() {
        return {
            name: ["category", "categories"],
            label: ["Categoria", "Categorie"],
            pool: this.props.categories,
            selected: this.props.selected,
            crudActionsProvider: categoriesActions,
            editorActionsProvider: menuPageActions,
            creating: this.props.inCreation,
            actions: [ACTIONS.CREATE, ACTIONS.DELETE],
            entityRenderer: c => c.name,
            fields: [
                {
                    type: TYPES.STRING, name: "name", label: "Nome categoria"
                },
                {
                    type: TYPES.ENTITIES,
                    name: ["dish", "dishes"],
                    label: ["Piatto", "Piatti"],
                    actions: [ACTIONS.CREATE, ACTIONS.DELETE],
                    pool: this.state.dishes,
                    selected: this.state.selectedDish,
                    actionsProvider: dishesActions,
                    creating: this.state.inCreationDish,
                    entityRenderer: d => d.name,
                    customEditor: (descriptor) => <DishesEditor descriptor={descriptor}/>,
                    onlyImmediate: true,
                    fields: [
                        {type: TYPES.STRING, name: "name", label: "Nome piatto"},
                        {type: TYPES.STRING, name: "description", label: "Descrizione"},
                        {type: TYPES.FLOAT, name: "price", label: "Prezzo", unit: "€"},
                        {type: TYPES.ENTITY, name: "category", label: "Categoria", options: this.state.categories, renderer: c => c.name},
                        {type: TYPES.ENUM, name: "status", label: "Stato", options: this.state.dishesStatuses}
                    ]
                }
            ]
        };
    }
}