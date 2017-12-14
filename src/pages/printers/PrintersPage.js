import React, {Component} from 'react';
import Page from "../Page";
import EntitiesEditor from "../../components/editors/EntitiesEditor";
import printersCreatorActions from "./PrintersCreatorActions";
import printersEditorActions from "./PrintersEditorActions";
import printersActions from "../../generic/PrintersActions";
import {TYPES} from "../../components/editors/EntityEditor";
import printersPageStore from "./PrintersPageStore";
import printersPageActions from "./PrintersPageActions";

export default class PrintersPage extends Component {

    constructor(props) {
        super(props);
        this.state = printersPageStore.getState();

        this.updateState = this.updateState.bind(this);
    }

    componentDidMount() {
        printersPageStore.addChangeListener(this.updateState);

        printersPageActions.initPrintersPage();
    }

    updateState(state) {
        this.setState(state);
    }

    componentWillUnmount() {
        printersPageStore.removeChangeListener(this.updateState);
    }

    render() {
        return (
            <Page title="Stampanti">
                <EntitiesEditor descriptor={this.getPrintersDescriptor()}/>
            </Page>
        )
    }

    getPrintersDescriptor() {
        return {
            name: ["printer", "printers"],
            label: ["Stampante", "Stampanti"],
            renderer: {
                name: p => p.name,
                color: p => p.main ? "success" : "default"
            },
            entities: {
                list: this.state.printers,
                selected: this.state.selectedPrinter,
                created: this.state.createdPrinter
            },
            components: {
                creator: {
                    actionsProvider: printersCreatorActions
                },
                editor: {
                    actionsProvider: printersEditorActions
                }
            },
            fields: [
                {
                    type: TYPES.SELECT,
                    name: "name",
                    optionsProvider: () => this.state.services,
                    label: "Nome"
                },
                {
                    type: TYPES.BOOLEAN,
                    name: "main",
                    label: "Principale"
                },
                {
                    type: TYPES.INT,
                    name: "lineCharacters",
                    label: "Lunghezza riga"
                }
            ]
        };
    }

    // isAlreadyDefined(service){
    //     return this.state.printers
    //         .reduce((val, printer) => val | (printer.name === service), false);
    // }
}