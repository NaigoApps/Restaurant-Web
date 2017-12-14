import React, {Component} from 'react';
import EveningSelectionForm from "../../components/EveningSelectionForm";
import EntityEditor, {COMPONENTS, TYPES} from "../../components/editors/EntityEditor";
import eveningActions from "../../actions/pages/EveningActions";
import {beautifyDate, beautifyTime} from "../../components/widgets/inputs/DateInput";
import Page from "../Page";
import OrdinationCreator from "../../components/widgets/inputs/OrdinationCreator";
import eveningPageStore from "./EveningPageStore";
import eveningPageActions from "./EveningPageActions";
import diningTablesCreatorActions from "./DiningTablesCreatorActions";
import diningTablesEditorActions from "./DiningTablesEditorActions";
import ordinationsCreatorActions from "./OrdinationsCreatorActions";
import ordinationsEditorActions from "./OrdinationsEditorActions";
import DiningTableEditor from "./DiningTableEditor";
import Button from "../../widgets/Button";
import eveningSelectionFormActions from "../../actions/pages/EveningSelectionFormActions";
import FloatEditor from "../../components/widgets/inputs/FloatEditor";
import eveningEditorActions from "./EveningEditorActions";
import PaginatedEntitiesList from "../../components/widgets/PaginatedEntitiesList";
import EveningEditor from "./EveningEditor";

export default class EveningPage extends Component {
    constructor(props) {
        super(props);

        this.state = eveningPageStore.getState();

        this.updateState = this.updateState.bind(this);
    }

    componentDidMount() {
        eveningPageStore.addChangeListener(this.updateState);

        eveningPageActions.initEveningPage();
    }

    updateState(state) {
        this.setState(state);
    }

    componentWillUnmount() {
        eveningPageStore.removeChangeListener(this.updateState);
    }


    render() {
        let evening = this.state.evening;
        let pageContent;
        if (evening) {
            pageContent =
                <EveningEditor
                    tables={this.state.tables}
                    waiters={this.state.waiters}
                    ordinations={this.state.ordinations}
                    categories={this.state.categories}
                    dishes={this.state.dishes}
                    phases={this.state.phases}
                    additions={this.state.additions}
                    diningTables={this.state.diningTables}
                    selectedDiningTable={this.state.selectedDiningTable}
                    createdDiningTable={this.state.createdDiningTable}
                    selectedOrdination={this.state.selectedOrdination}
                    editingOrdination={this.state.editingOrdination}
                    createdOrdination={this.state.createdOrdination}
                />
        } else {
            pageContent =
                <div className="card">
                        <div className="card-body">
                            <h4 className="card-title">Selezionare una serata</h4>
                            <EveningSelectionForm eveningDate={this.state.date}/>
                        </div>
                </div>
        }
        let title;
        if (evening) {
            title = "Gestione serata " + beautifyDate(evening.day)
        } else {
            title = "Gestione serate";
        }
        let navContent;
        if (evening) {
            navContent = <div className="form-inline">
                <FloatEditor
                    descriptor={this.getCoverChargeDescriptor()}
                    value={evening.coverCharge}
                    commitAction={eveningEditorActions.updateCoverCharge.bind(eveningEditorActions, evening.uuid)}/>
                <div className="form-group">
                    <Button text="Cambia serata" commitAction={eveningSelectionFormActions.deselectEvening}/>
                </div>
            </div>;
        }


        return (
            <Page title={title} navContent={navContent}>
                {pageContent}
            </Page>
        );
    }

    getCoverChargeDescriptor() {
        return {
            name: "coverCharge",
            label: "Coperto",
            unit: "€",
            isForNav: true
        }
    }

    getEveningDescriptor() {
        return {
            type: TYPES.ENTITY,
            name: "evening",
            renderer: {
                name: e => beautifyDate(e.day)
            },
            actionsProvider: eveningActions,
            undeletable: true,
            immediate: true,
            fields: [
                this.getDiningTablesDescriptor.bind(this)()
            ]
        };
    }


    getDiningTablesDescriptor() {
        let diningTableRenderer = {
            name: this.renderDiningTable.bind(this)
        };
        return <PaginatedEntitiesList
            entities={this.state.diningTables}
            renderer={diningTableRenderer}
        />;
        return {
            type: TYPES.ENTITIES,
            name: ["diningTable", "diningTables"],
            label: ["Tavolo", "Tavoli"],
            entities: {
                list: this.state.diningTables
                    .sort((d1, d2) => d1.date.localeCompare(d2.date)),
                selected: this.state.selectedDiningTable,
                created: this.state.createdDiningTable
            },
            components: {
                creator: {
                    label: "Nuovo tavolo",
                    actionsProvider: diningTablesCreatorActions
                },
                editor: {
                    component: entity => <DiningTableEditor
                        tables={this.state.tables}
                        waiters={this.state.waiters}
                        ordinations={this.state.ordinations.filter(ord => ord.table === entity.uuid)}
                        categories={this.state.categories}
                        dishes={this.state.dishes}
                        phases={this.state.phases}
                        additions={this.state.additions}
                        diningTable={entity}
                        selectedOrdination={this.state.selectedOrdination}
                        editingOrdination={this.state.editingOrdination}
                        createdOrdination={this.state.createdOrdination}/>,
                    actionsProvider: diningTablesEditorActions
                }
            },
            renderer: {
                name: this.renderDiningTable.bind(this)
            },
            shown: [COMPONENTS.EDITOR],
            fields: [
                {type: TYPES.INT, name: "coverCharges", label: "Coperti"},
                {
                    type: TYPES.ENTITY,
                    name: "waiter",
                    label: "Cameriere",
                    options: this.state.waiters,
                    renderer: w => w.name
                },
                {
                    type: TYPES.ENTITY,
                    name: "table",
                    label: "Tavolo",
                    options: this.state.tables,
                    renderer: t => t.name
                }
            ]
        }
    }

}