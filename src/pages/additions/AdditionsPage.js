import React, {Component} from 'react';
import Page from "../Page";
import EntitiesEditor from "../../components/editors/EntitiesEditor";
import additionsPageStore from "./AdditionsPageStore";
import additionsPageActions from "./AdditionsPageActions";
import additionsCreatorActions from "./AdditionsCreatorActions";
import additionsEditorActions from "./AdditionsEditorActions";
import {TYPES} from "../../components/editors/EntityEditor";

export default class AdditionsPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            additions: [],
            selectedAddition: null,
            inCreationAddition: null
        };

        this.updateState = this.updateState.bind(this);
    }

    componentDidMount() {
        additionsPageStore.addChangeListener(this.updateState);

        additionsPageActions.initAdditionsPage();
    }

    updateState(state) {
        this.setState(state);
    }

    componentWillUnmount() {
        additionsPageStore.removeChangeListener(this.updateState);
    }

    getAdditionsDescriptor() {
        return {
            name: ["addition", "additions"],
            label: ["Variante", "Varianti"],
            renderer: {
                name: a => a.name
            },
            entities: {
                list: this.state.additions,
                selected: this.state.selectedAddition,
                created: this.state.inCreationAddition
            },
            components: {
                creator: {
                    label: "Nuova variante",
                    actionsProvider: additionsCreatorActions
                },
                editor: {
                    actionsProvider: additionsEditorActions
                }
            },
            fields: [
                {
                    type: TYPES.STRING,
                    name: "name",
                    label: "Nome"
                },
                {
                    type: TYPES.FLOAT,
                    name: "price",
                    label: "Prezzo",
                    unit: "€"
                },
                {
                    type: TYPES.BOOLEAN,
                    name: "generic",
                    label: "Generica"
                }
            ]
        }
    }


    render() {
        return (
            <Page>
                <EntitiesEditor descriptor={this.getAdditionsDescriptor()}/>
            </Page>
        )
    }
}