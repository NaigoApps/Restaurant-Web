import React, {Component} from 'react';
import {COMPONENTS, TYPES} from "../../components/editors/EntityEditor";
import EntitiesEditor from "../../components/editors/EntitiesEditor";
import menuPageActions from "./MenuPageActions";
import menuPageStore from "./MenuPageStore";
import categoriesEditorActions from "./CategoriesEditorActions";
import categoriesCreatorActions from "./CategoriesCreatorActions";
import dishesEditorActions from "./DishesEditorActions";
import dishesCreatorActions from "./DishesCreatorActions";
import EntityEditor from "../../components/editors/EntityEditor";
import Page from "../Page";

export default class MenuPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            categories: [],
            selectedCategory: null,
            inCreationCategory: {},
            dishes: [],
            selectedDish: null,
            dishesStatuses: [],
            inCreationDish: {}
        };

        this.updateState = this.updateState.bind(this);
    }

    componentDidMount() {
        menuPageStore.addChangeListener(this.updateState);

        menuPageActions.initMenuPage();
    }

    componentWillUnmount() {
        menuPageStore.removeChangeListener(this.updateState);
    }

    updateState(state) {
        this.setState(state);
    }

    getCategoryDescriptor() {
        return {
            name: ["category", "categories"],
            label: ["Categoria", "Categorie"],
            renderer: {
                name: c => c.name
            },
            components: {
                creator: {
                    label: "Nuova categoria",
                    actionsProvider: categoriesCreatorActions,
                },
                editor: {
                    actionsProvider: categoriesEditorActions
                }
            },
            entities: {
                list: this.state.categories,
                selected: this.state.selectedCategory,
                created: this.state.inCreationCategory
            },
            fields: [
                {
                    type: TYPES.STRING, name: "name", label: "Nome categoria"
                },
                {
                    type: TYPES.ENTITY,
                    name: "location",
                    label: "Postazione",
                    options: this.state.locations,
                    shown: [COMPONENTS.EDITOR],
                    renderer: l => l.name
                },
                {
                    type: TYPES.ENTITIES,
                    name: ["dish", "dishes"],
                    label: ["Piatto", "Piatti"],
                    shown: [COMPONENTS.EDITOR],
                    components: {
                        creator: {
                            label: "Nuovo piatto",
                            actionsProvider: dishesCreatorActions
                        },
                        editor: {
                            actionsProvider: dishesEditorActions
                        }
                    },
                    renderer: {
                        name: d => d.name,
                        color: d => {
                            switch (d.status) {
                                case "ATTIVO":
                                    return "success";
                                case "SOSPESO":
                                    return "warning";
                                case "RIMOSSO":
                                    return "danger";
                            }
                            return "default";
                        }
                    },
                    entities: {
                        list: this.state.dishes,
                        selected: this.state.selectedDish,
                        created: this.state.inCreationDish
                    },
                    fields: [
                        {type: TYPES.STRING, name: "name", label: "Nome piatto"},
                        {type: TYPES.STRING, name: "description", label: "Descrizione"},
                        {type: TYPES.FLOAT, name: "price", label: "Prezzo", unit: "€"},
                        {
                            type: TYPES.ENTITY,
                            shown: [COMPONENTS.EDITOR],
                            name: "category",
                            label: "Categoria",
                            options: this.state.categories,
                            renderer: c => c.name
                        },
                        {
                            type: TYPES.SELECT,
                            name: "status",
                            optionsProvider: () => this.state.dishesStatuses,
                            label: "Stato"
                        }
                    ]
                }
            ]
        };
    }

    render() {
        // if(this.state.loading){
        //     return <div/>;
        // }
        // if(this.state.failedAction){
        //     return <Button type="warning" commitAction={failureActions.removeMessage}/>;
        // }
        return (
            <Page title="Menu">
                <EntitiesEditor
                    entities={this.state.categories}
                    selected={this.state.selectedCategory}
                    created={this.state.inCreationCategory}
                    descriptor={this.getCategoryDescriptor()}/>
            </Page>
        );
    }
}