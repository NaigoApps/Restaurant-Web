import React, {Component} from 'react';
import EveningSelectionForm from "../../components/EveningSelectionForm";
import EntityEditor, {SHOWN, TYPES} from "../../components/editors/EntityEditor";
import eveningActions from "../../actions/pages/EveningActions";
import {beautifyDate, beautifyTime} from "../../components/widgets/inputs/DateInput";
import Wizard from "../../components/widgets/wizard/Wizard";
import EntitySelectionWizardPage from "../../components/widgets/wizard/EntitySelectionWizardPage";
import Page from "../Page";
import OrdinationCreator from "../../components/widgets/inputs/OrdinationCreator";
import eveningPageStore from "./EveningPageStore";
import eveningPageActions from "./EveningPageActions";
import diningTablesCreatorActions from "./DiningTablesCreatorActions";
import diningTablesEditorActions from "./DiningTablesEditorActions";
import ordinationsCreatorActions from "./OrdinationsCreatorActions";
import ordinationsEditorActions from "./OrdinationsEditorActions";
import ordersCreatorActions from "./OrdersCreatorActions";
import ordersEditorActions from "./OrdersEditorActions";
import {findByUuid} from "../../utils/Utils";

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
        return (
            <Page>
                <div className="row">
                    <EveningSelectionForm eveningDate={this.state.date}/>
                </div>
                <div className="row top-sep">
                    <EntityEditor
                        entity={this.state.evening}
                        descriptor={this.getEveningDescriptor()}/>
                </div>
            </Page>
        );
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
                {
                    type: TYPES.FLOAT,
                    name: "coverCharge",
                    label: "Coperto",
                    unit: "€"
                },
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
                list: this.state.diningTables,
                selected: this.state.selectedDiningTable,
                created: this.state.createdDiningTable
            },
            components: {
                creator: {
                    label: "Nuovo tavolo",
                    actionsProvider: diningTablesCreatorActions
                },
                editor: {
                    actionsProvider: diningTablesEditorActions
                }
            },
            renderer: {
                name: this.renderDiningTable.bind(this)
            },
            shown: [SHOWN.EDITOR],
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
                },
                this.getOrdinationsDescriptor.bind(this)()
            ]
        }
    }

    getOrdinationsDescriptor() {
        return {
            type: TYPES.ENTITIES,
            name: ["ordination", "ordinations"],
            label: ["Comanda", "Comande"],
            entities: {
                list: this.state.ordinations,
                selected: this.state.selectedOrdination,
                created: this.state.createdOrdination
            },
            components: {
                creator: {
                    label: "Nuova comanda",
                    component: (descriptor) => <OrdinationCreator
                        descriptor={descriptor}
                        table={this.state.selectedDiningTable}
                        categories={this.state.categories}
                        dishes={this.state.dishes}
                    />,
                    actionsProvider: ordinationsCreatorActions
                },
                editor: {
                    actionsProvider: ordinationsEditorActions
                }
            },
            renderer: {
                name: this.renderOrdination.bind(this)
            },
            creator: (descriptor) => <OrdinationCreator
                descriptor={descriptor}
                categories={this.state.categories}
                dishes={this.state.dishes}/>,
            shown: [SHOWN.EDITOR],
            fields: [
                this.getOrdersDescriptor.bind(this)()
            ]
        }
    }

    getOrdersDescriptor() {
        return {
            type: TYPES.ENTITIES,
            name: ["order", "orders"],
            label: ["Ordine", "Ordini"],
            entities: {
                list: this.state.orders.filter(o => o.ordination === this.state.selectedOrdination),
                selected: this.state.selectedOrder,
                created: this.state.createdOrder
            },
            components: {
                creator: {
                    label: "Nuovo ordine",
                    actionsProvider: ordersCreatorActions
                },
                editor: {
                    actionsProvider: ordersEditorActions
                }
            },
            renderer: {
                name: o => findByUuid(this.state.dishes, o.dish).name
            },
            fields: [
                // {
                //     type: TYPES.CUSTOM,
                //     name: "dish",
                //     label: "Piatto",
                //     customComponent: (descriptor) => this.dishSelectorWizard.bind(this)(descriptor),
                //     options: this.state.dishes,
                //     renderer: d => d.name
                // },
                {
                    type: TYPES.FLOAT,
                    size: 2,
                    name: "price",
                    label: "Prezzo",
                    unit: "€"
                },
                // {
                //     type: TYPES.ENTITY,
                //     size: 2,
                //     name: "phase",
                //     label: "Fase",
                //     options: this.state.phases,
                //     entityRenderer: p => p.name
                // },
                // {
                //     type: TYPES.STRING,
                //     size: 3,
                //     name: "test",
                //     label: "Aggiunte"
                // },
                {
                    type: TYPES.STRING,
                    size: 2,
                    name: "notes",
                    label: "Note"
                }
            ]
        }
    }

    dishSelectorWizard(descriptor) {
        let pages = [
            (wizardId, data) =>
                <EntitySelectionWizardPage
                    wizardId={wizardId}
                    wizardData={data}
                    title="Categoria"
                    options={data => this.state.categories}
                    label={cat => cat.name}
                />
            ,
            (wizardId, data) =>
                <EntitySelectionWizardPage
                    wizardId={wizardId}
                    wizardData={data}
                    title="Piatto"
                    options={data => this.findDishesByCategory(data[0])}
                    label={dish => dish.name}
                />

        ];
        return <Wizard
            key={descriptor.name}
            descriptor={descriptor}
            pages={pages}
            label={(data) => this.dishLabel(data)}
            renderer={o => o ? o.name : ""}
            makeData={(data) => {
                return data[1].uuid
            }}
        />
    }

    dishLabel(data) {
        if (data.length >= 2) {
            return data[1].name;
        }
        return "Scegli";
    }

    findDishesByCategory(cat) {
        return this.state.dishes.filter(d => d.category === cat.uuid);
    }

    printTest() {
        // eveningPageActions.printTest();
    }

    renderDiningTable(dt) {
        const tableName = dt.table ? this.state.tables.find(t => t.uuid === dt.table).name : "";
        const waiterName = dt.waiter ? this.state.waiters.find(w => w.uuid === dt.waiter).name : "";
        return tableName + " (" + waiterName + ")";
    }

    renderOrdination(o) {
        return "Comanda delle " + beautifyTime(o.creationTime);
    }
}