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
import DiningTableEditor from "../../components/DiningTableEditor";
import Button from "../../widgets/Button";
import eveningSelectionFormActions from "../../actions/pages/EveningSelectionFormActions";
import FloatEditor from "../../components/widgets/inputs/FloatEditor";
import eveningEditorActions from "./EveningEditorActions";

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
                <div className="row top-sep">
                    <EntityEditor
                        entity={this.state.evening}
                        descriptor={this.getEveningDescriptor()}/>
                </div>
        } else {
            pageContent =
                <div className="jumbotron">
                    <h1>Selezionare una serata</h1>
                    <div className="row">
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
            navContent = <span>
                <form className="navbar-form navbar-left">
                    <FloatEditor
                        descriptor={this.getCoverChargeDescriptor()}
                        value={evening.coverCharge}
                        commitAction={eveningEditorActions.updateCoverCharge.bind(eveningEditorActions, evening.uuid)}/>
                </form>
                <form className="navbar-form navbar-left">
                    <button className="btn btn-default" onClick={eveningSelectionFormActions.deselectEvening}>
                        Cambia serata
                    </button>
                </form>
            </span>;
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

    renderDiningTable(dt) {
        const table = this.state.tables.find(t => t.uuid === dt.table);
        const tableName = table ? table.name : "";
        const waiter = this.state.waiters.find(w => w.uuid === dt.waiter);
        const waiterName = waiter ? waiter.name : "";
        const createTime = beautifyTime(dt.date);
        return createTime + " - " + tableName + " (" + waiterName + ")";
    }
}