import React, {Component} from 'react';
import EntitiesEditor from "../../components/editors/EntitiesEditor";
import {ACTIONS, TYPES} from "../../components/editors/EntityEditor";
import tablesEditorActions from "./TablesEditorActions";
import tablesActions from "../../generic/TablesActions";
import categoriesActions from "./CategoriesActions";
import menuPageActions from "./MenuPageActions";
import dishesActions from "./DishesActions";

export default class DishesEditor extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <EntitiesEditor descriptor={this.getDishesDescriptor()}/>
        )
    }

    getDishesDescriptor() {
        return {
            name: ["dish", "dishes"],
            label: ["Piatto", "Piatti"],
            actions: [ACTIONS.CREATE, ACTIONS.DELETE],
            pool: this.props.dishes,
            selected: this.props.selected,
            crudActionsProvider: dishesActions,
            editorActionsProvider: dishesEditorActions,
            creating: this.props.inCreation,
            entityRenderer: d => d.name,
            onlyImmediate: true,
            fields: [
                {type: TYPES.STRING, name: "name", label: "Nome piatto"},
                {type: TYPES.STRING, name: "description", label: "Descrizione"},
                {type: TYPES.FLOAT, name: "price", label: "Prezzo", unit: "€"},
                {
                    type: TYPES.ENTITY,
                    name: "category",
                    label: "Categoria",
                    options: this.state.categories,
                    renderer: c => c.name
                },
                {type: TYPES.ENUM, name: "status", label: "Stato", options: this.state.dishesStatuses}
            ]
        };
    }
}